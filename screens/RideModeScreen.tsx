import { Ionicons } from "@expo/vector-icons";

import { Camera, Map, Marker } from "@maplibre/maplibre-react-native";

import * as IntentLauncher from "expo-intent-launcher";

import * as Location from "expo-location";

import * as Speech from "expo-speech";

import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";

import { router } from "expo-router";

import { Accelerometer } from "expo-sensors";

import { useEffect, useRef, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  Linking,
  Modal,
  PermissionsAndroid,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { API_URL } from "../services/api";

import { getToken } from "../services/authSession";

import { styles } from "../styles/RideModeStyles";

type Coordinates = {
  latitude: number;

  longitude: number;
};

type RideModeInfo = {
  isLocationEnabled: boolean;

  emergencyContactName?: string | null;

  emergencyContactPhone?: string | null;

  fallDetection: boolean;
};

type RideSettings = {
  emergencyCountdown: number;

  flashScreenInEmergency: boolean;

  voiceCommands: boolean;

  voiceConfirmation: boolean;
};

type ActiveRide = {
  userId: string;

  latitude: number;

  longitude: number;

  rideTime: string;

  distanceKm: number;

  isLocationActive: boolean;

  isFallDetectionActive: boolean;

  isEmergencyContactReady: boolean;
};

type EmergencyResult = {
  latitude: number;

  longitude: number;

  phoneNumber: string;

  emergencyContactName: string;
};

export default function RideModeScreen() {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

  const [rideInfo, setRideInfo] = useState<RideModeInfo | null>(null);

  const [rideSettings, setRideSettings] = useState<RideSettings | null>(null);

  const [activeRide, setActiveRide] = useState<ActiveRide | null>(null);

  const [loading, setLoading] = useState(true);

  const [startingRide, setStartingRide] = useState(false);

  const [endingRide, setEndingRide] = useState(false);

  const [emergencyLoading, setEmergencyLoading] = useState(false);

  const [error, setError] = useState("");

  const [rideSeconds, setRideSeconds] = useState(0);

  const [fallCountdown, setFallCountdown] = useState<number | null>(null);

  const [emergencyFlashOn, setEmergencyFlashOn] = useState(false);

  const [voiceListening, setVoiceListening] = useState(false);

  const locationSubscription = useRef<Location.LocationSubscription | null>(
    null,
  );

  const fallSubscription = useRef<any>(null);

  const countdownInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const emergencyFlashInterval = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );

  const fallDetectedRef = useRef(false);

  const freeFallDetectedRef = useRef(false);

  const freeFallSamplesRef = useRef(0);

  const freeFallTimeRef = useRef(0);

  const impactDetectedRef = useRef(false);

  const impactTimeRef = useRef(0);

  const stillSamplesRef = useRef(0);

  const activeRideRef = useRef<ActiveRide | null>(null);

  const fallCountdownRef = useRef<number | null>(null);

  const rideSettingsRef = useRef<RideSettings | null>(null);

  const voiceListeningRef = useRef(false);

  const voiceShouldListenRef = useRef(false);

  const voiceSpeakingRef = useRef(false);

  const handlingVoiceCommandRef = useRef(false);

  const voiceRestartTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const lastVoiceCommandRef = useRef({ text: "", time: 0 });

  useEffect(() => {
    initializeRideMode();

    return () => {
      stopLocationTracking();

      stopFallDetection();

      stopCountdown();

      stopVoiceListening();

      Speech.stop();
    };
  }, []);

  useEffect(() => {
    if (!activeRide) {
      return;
    }

    const timer = setInterval(() => {
      setRideSeconds((current) => current + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [activeRide]);

  useEffect(() => {
    if (activeRide) {
      startLocationTracking();
    }

    return () => {
      stopLocationTracking();
    };
  }, [activeRide?.userId]);

  useEffect(() => {
    if (
      activeRide &&
      activeRide.isFallDetectionActive &&
      fallCountdown === null
    ) {
      startFallDetection();
    }

    return () => {
      stopFallDetection();
    };
  }, [activeRide?.isFallDetectionActive, activeRide?.userId]);

  useEffect(() => {
    activeRideRef.current = activeRide;
  }, [activeRide]);

  useEffect(() => {
    fallCountdownRef.current = fallCountdown;
  }, [fallCountdown]);

  useEffect(() => {
    rideSettingsRef.current = rideSettings;

    voiceShouldListenRef.current = !!rideSettings?.voiceCommands;

    if (rideSettings?.voiceCommands) {
      scheduleVoiceRestart(300);
    } else {
      stopVoiceListening();
    }
  }, [rideSettings?.voiceCommands]);

  useSpeechRecognitionEvent("start", () => {
    voiceListeningRef.current = true;

    setVoiceListening(true);
  });

  useSpeechRecognitionEvent("end", () => {
    voiceListeningRef.current = false;

    setVoiceListening(false);

    if (
      voiceShouldListenRef.current &&
      !voiceSpeakingRef.current &&
      !handlingVoiceCommandRef.current
    ) {
      scheduleVoiceRestart(500);
    }
  });

  useSpeechRecognitionEvent("error", (event) => {
    if (event.error !== "aborted" && event.error !== "no-speech") {
      console.log("VOICE ERROR:", event.error, event.message);
    }
  });

  useSpeechRecognitionEvent("result", (event) => {
    const transcript = event.results[0]?.transcript ?? "";

    if (transcript.trim() !== "") {
      console.log("VOICE HEARD:", transcript);

      handleVoiceCommand(transcript);
    }
  });

  async function initializeRideMode() {
    try {
      setLoading(true);

      await loadLocation();

      await loadRideInfo();

      await loadRideSettings();

      await loadActiveRide();
    } finally {
      setLoading(false);
    }
  }

  async function loadLocation() {
    try {
      setError("");

      const permission = await Location.requestForegroundPermissionsAsync();

      if (!permission.granted) {
        setError("Location permission is required for Ride Mode.");

        return;
      }

      const servicesEnabled = await Location.hasServicesEnabledAsync();

      if (!servicesEnabled && Platform.OS === "android") {
        try {
          await Location.enableNetworkProviderAsync();
        } catch {
          setError("Location must be enabled to use Ride Mode.");

          return;
        }
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,

        mayShowUserSettingsDialog: true,
      });

      setCoordinates({
        latitude: location.coords.latitude,

        longitude: location.coords.longitude,
      });
    } catch (error) {
      console.log("LOCATION ERROR:", error);

      setError("Could not get your location.");
    }
  }

  async function loadRideInfo() {
    try {
      const token = await getToken();

      if (!token) {
        return;
      }

      const response = await fetch(`${API_URL}/Rides/mode`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        return;
      }

      const data = await response.json();

      setRideInfo(data);
    } catch (error) {
      console.log("RIDE INFO ERROR:", error);
    }
  }

  async function loadRideSettings() {
    try {
      const token = await getToken();

      if (!token) {
        return;
      }

      const response = await fetch(`${API_URL}/Rides/settings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        return;
      }

      const data = await response.json();

      setRideSettings(data);
    } catch (error) {
      console.log("RIDE SETTINGS ERROR:", error);
    }
  }

  async function loadActiveRide() {
    try {
      const token = await getToken();

      if (!token) {
        return;
      }

      const response = await fetch(`${API_URL}/Rides/active`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setActiveRide(null);

        return;
      }

      const data = await response.json();

      if (!data) {
        setActiveRide(null);

        return;
      }

      setActiveRide(data);

      setRideSeconds(convertRideTimeToSeconds(data.rideTime));

      if (
        typeof data.latitude === "number" &&
        typeof data.longitude === "number"
      ) {
        setCoordinates({
          latitude: data.latitude,

          longitude: data.longitude,
        });
      }
    } catch (error) {
      console.log("ACTIVE RIDE ERROR:", error);
    }
  }

  function convertRideTimeToSeconds(rideTime: string) {
    if (!rideTime) {
      return 0;
    }

    const cleanTime = rideTime.split(".")[0];

    const parts = cleanTime.split(":");

    if (parts.length !== 3) {
      return 0;
    }

    const hours = Number(parts[0]);

    const minutes = Number(parts[1]);

    const seconds = Number(parts[2]);

    return hours * 3600 + minutes * 60 + seconds;
  }

  function formatTime(seconds: number) {
    const hours = Math.floor(seconds / 3600);

    const minutes = Math.floor((seconds % 3600) / 60);

    const remainingSeconds = seconds % 60;

    return (
      String(hours).padStart(2, "0") +
      ":" +
      String(minutes).padStart(2, "0") +
      ":" +
      String(remainingSeconds).padStart(2, "0")
    );
  }

  function clearVoiceRestartTimer() {
    if (voiceRestartTimer.current) {
      clearTimeout(voiceRestartTimer.current);

      voiceRestartTimer.current = null;
    }
  }

  function scheduleVoiceRestart(delay = 500) {
    clearVoiceRestartTimer();

    if (
      !voiceShouldListenRef.current ||
      voiceListeningRef.current ||
      voiceSpeakingRef.current ||
      handlingVoiceCommandRef.current
    ) {
      return;
    }

    voiceRestartTimer.current = setTimeout(() => {
      startVoiceListening();
    }, delay);
  }

  async function startVoiceListening() {
    if (
      !voiceShouldListenRef.current ||
      voiceListeningRef.current ||
      voiceSpeakingRef.current ||
      handlingVoiceCommandRef.current
    ) {
      return;
    }

    try {
      if (!ExpoSpeechRecognitionModule.isRecognitionAvailable()) {
        console.log("Speech recognition is not available on this device.");

        return;
      }

      let permission = await ExpoSpeechRecognitionModule.getPermissionsAsync();

      if (!permission.granted) {
        permission =
          await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      }

      if (!permission.granted) {
        Alert.alert(
          "Microphone Permission",
          "Microphone permission is required for Voice Commands.",
        );

        voiceShouldListenRef.current = false;

        return;
      }

      ExpoSpeechRecognitionModule.start({
        lang: "en-US",

        interimResults: true,

        maxAlternatives: 3,

        continuous: true,

        contextualStrings: [
          "start ride",
          "stop ride",
          "end ride",
          "I'm okay",
          "I am okay",
        ],
      });
    } catch (error) {
      console.log("START VOICE ERROR:", error);
    }
  }

  function stopVoiceListening() {
    clearVoiceRestartTimer();

    voiceShouldListenRef.current = false;

    voiceListeningRef.current = false;

    setVoiceListening(false);

    try {
      ExpoSpeechRecognitionModule.abort();
    } catch {}
  }
  function speakVoiceConfirmation(message: string) {
    if (!rideSettingsRef.current?.voiceConfirmation) {
      scheduleVoiceRestart(350);
      return;
    }

    voiceSpeakingRef.current = true;

    clearVoiceRestartTimer();

    try {
      ExpoSpeechRecognitionModule.abort();
    } catch {}

    const finishSpeaking = () => {
      voiceSpeakingRef.current = false;
      scheduleVoiceRestart(400);
    };

    Speech.speak(message, {
      language: "en-US",
      rate: 0.95,
      onDone: finishSpeaking,
      onStopped: finishSpeaking,
      onError: finishSpeaking,
    });
  }

  function speakFallWarning() {
    voiceSpeakingRef.current = true;

    clearVoiceRestartTimer();

    try {
      ExpoSpeechRecognitionModule.abort();
    } catch {}

    const finishSpeaking = () => {
      voiceSpeakingRef.current = false;

      if (rideSettingsRef.current?.voiceCommands) {
        voiceShouldListenRef.current = true;
        scheduleVoiceRestart(250);
      }
    };

    Speech.speak("Possible fall detected. Please respond now.", {
      language: "en-US",
      rate: 0.9,
      volume: 1.0,
      onDone: finishSpeaking,
      onStopped: finishSpeaking,
      onError: finishSpeaking,
    });
  }

  function normalizeVoiceCommand(text: string) {
    return text
      .toLowerCase()
      .replace(/[’']/g, "")
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  async function handleVoiceCommand(text: string) {
    if (!rideSettingsRef.current?.voiceCommands) {
      return;
    }

    const command = normalizeVoiceCommand(text);

    const now = Date.now();

    if (
      lastVoiceCommandRef.current.text === command &&
      now - lastVoiceCommandRef.current.time < 2500
    ) {
      return;
    }

    lastVoiceCommandRef.current = {
      text: command,

      time: now,
    };

    const isStartCommand =
      command.includes("start ride") ||
      command.includes("start the ride") ||
      command.includes("begin ride") ||
      command.includes("begin the ride") ||
      command.includes("start right");

    const isStopCommand =
      command.includes("stop ride") ||
      command.includes("stop the ride") ||
      command.includes("end ride") ||
      command.includes("end the ride") ||
      command.includes("stop right") ||
      command.includes("end right");

    const isOkayCommand =
      command.includes("im okay") ||
      command.includes("i am okay") ||
      command.includes("im ok") ||
      command.includes("i am ok") ||
      command.includes("i m okay") ||
      command.includes("i m ok");

    handlingVoiceCommandRef.current = true;

    try {
      if (isOkayCommand && fallCountdownRef.current !== null) {
        userIsOkay();

        speakVoiceConfirmation("Emergency cancelled.");

        return;
      }

      if (isStartCommand) {
        if (activeRideRef.current) {
          speakVoiceConfirmation("Ride is already active.");

          return;
        }

        const started = await startRide();

        if (started) {
          speakVoiceConfirmation("Ride started.");
        }

        return;
      }

      if (isStopCommand) {
        if (!activeRideRef.current) {
          speakVoiceConfirmation("No active ride.");

          return;
        }

        const ended = await confirmEndRide(false);

        if (ended) {
          speakVoiceConfirmation("Ride ended.");
        }

        return;
      }
    } finally {
      handlingVoiceCommandRef.current = false;

      if (!voiceSpeakingRef.current) {
        scheduleVoiceRestart(350);
      }
    }
  }

  async function requestCallPermission() {
    if (Platform.OS !== "android") {
      return true;
    }

    const alreadyGranted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CALL_PHONE,
    );

    if (alreadyGranted) {
      return true;
    }

    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CALL_PHONE,

      {
        title: "Emergency Call Permission",

        message:
          "BikerX needs permission to call your emergency contact if you do not respond after a detected fall.",

        buttonPositive: "Allow",

        buttonNegative: "Cancel",
      },
    );

    return result === PermissionsAndroid.RESULTS.GRANTED;
  }

  async function startRide(): Promise<boolean> {
    if (!coordinates || startingRide) {
      return false;
    }

    try {
      setStartingRide(true);

      const token = await getToken();

      if (!token) {
        Alert.alert("Ride Mode", "Please login again.");

        return false;
      }

      await requestCallPermission();

      const response = await fetch(`${API_URL}/Rides/start`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          latitude: coordinates.latitude,

          longitude: coordinates.longitude,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        Alert.alert("Ride Mode", data?.message ?? "Could not start the ride.");

        return false;
      }

      setRideSeconds(0);

      await loadRideSettings();

      await loadActiveRide();

      return true;
    } catch (error) {
      console.log("START RIDE ERROR:", error);
      Alert.alert("Ride Mode", "Could not start the ride.");

      return false;
    } finally {
      setStartingRide(false);
    }
  }

  async function startLocationTracking() {
    if (locationSubscription.current) {
      return;
    }

    try {
      locationSubscription.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,

          timeInterval: 3000,

          distanceInterval: 5,
        },

        async (location) => {
          const newCoordinates = {
            latitude: location.coords.latitude,

            longitude: location.coords.longitude,
          };

          setCoordinates(newCoordinates);

          await updateRideLocation(newCoordinates);
        },
      );
    } catch (error) {
      console.log("TRACK LOCATION ERROR:", error);
    }
  }

  function stopLocationTracking() {
    if (locationSubscription.current) {
      locationSubscription.current.remove();

      locationSubscription.current = null;
    }
  }

  async function updateRideLocation(newCoordinates: Coordinates) {
    try {
      const token = await getToken();

      if (!token) {
        return;
      }

      const response = await fetch(`${API_URL}/Rides/location`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          latitude: newCoordinates.latitude,

          longitude: newCoordinates.longitude,
        }),
      });

      if (response.ok) {
        await refreshRideDetails();
      }
    } catch (error) {
      console.log("UPDATE LOCATION ERROR:", error);
    }
  }

  async function refreshRideDetails() {
    try {
      const token = await getToken();

      if (!token) {
        return;
      }

      const response = await fetch(`${API_URL}/Rides/active`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        return;
      }

      const data = await response.json();

      if (data) {
        setActiveRide(data);
      }
    } catch (error) {
      console.log("REFRESH RIDE ERROR:", error);
    }
  }

  async function startFallDetection() {
    if (fallSubscription.current) {
      return;
    }

    const available = await Accelerometer.isAvailableAsync();

    if (!available) {
      console.log("Accelerometer is not available");

      return;
    }

    Accelerometer.setUpdateInterval(150);

    fallSubscription.current = Accelerometer.addListener(({ x, y, z }) => {
      const force = Math.sqrt(x * x + y * y + z * z);

      const now = Date.now();

      // Step 1: possible free fall

      if (
        force < 0.8 &&
        !impactDetectedRef.current &&
        !fallDetectedRef.current
      ) {
        freeFallSamplesRef.current += 1;

        if (freeFallSamplesRef.current >= 1) {
          freeFallDetectedRef.current = true;

          freeFallTimeRef.current = now;
        }
      } else if (!freeFallDetectedRef.current) {
        freeFallSamplesRef.current = 0;
      }

      // Step 2: strong impact

      if (
        freeFallDetectedRef.current &&
        force > 2.3 &&
        !impactDetectedRef.current
      ) {
        const timeSinceFreeFall = now - freeFallTimeRef.current;

        if (timeSinceFreeFall <= 1500) {
          impactDetectedRef.current = true;

          impactTimeRef.current = now;

          stillSamplesRef.current = 0;
        }

        freeFallDetectedRef.current = false;

        freeFallSamplesRef.current = 0;
      }

      // cancel old free fall

      if (freeFallDetectedRef.current && now - freeFallTimeRef.current > 1200) {
        freeFallDetectedRef.current = false;

        freeFallSamplesRef.current = 0;
      }

      // Step 3: stillness

      if (impactDetectedRef.current) {
        const timeAfterImpact = now - impactTimeRef.current;

        if (timeAfterImpact < 500) {
          return;
        }

        if (force > 0.8 && force < 1.2) {
          stillSamplesRef.current += 1;
        } else {
          stillSamplesRef.current = 0;
        }

        if (stillSamplesRef.current >= 2 && timeAfterImpact <= 2000) {
          impactDetectedRef.current = false;

          stillSamplesRef.current = 0;

          fallDetectedRef.current = true;

          possibleFallDetected();

          return;
        }

        if (timeAfterImpact > 2500) {
          impactDetectedRef.current = false;

          stillSamplesRef.current = 0;
        }
      }
    });
  }

  function stopFallDetection() {
    if (fallSubscription.current) {
      fallSubscription.current.remove();

      fallSubscription.current = null;
    }
  }

  function resetFallDetection() {
    fallDetectedRef.current = false;

    freeFallDetectedRef.current = false;

    freeFallSamplesRef.current = 0;

    impactDetectedRef.current = false;

    stillSamplesRef.current = 0;
  }

  async function possibleFallDetected() {
    stopFallDetection();

    const seconds = rideSettingsRef.current?.emergencyCountdown ?? 10;

    startCountdown(seconds);

    speakFallWarning();

    await markFallDetected();
  }

  async function markFallDetected() {
    try {
      const token = await getToken();

      if (!token) {
        return;
      }

      await fetch(`${API_URL}/Rides/fall-detected`, {
        method: "POST",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log("FALL DETECTED ERROR:", error);
    }
  }

  function startEmergencyFlash() {
    stopEmergencyFlash();

    if (!rideSettings?.flashScreenInEmergency) {
      return;
    }

    setEmergencyFlashOn(true);

    emergencyFlashInterval.current = setInterval(() => {
      setEmergencyFlashOn((current) => !current);
    }, 450);
  }

  function stopEmergencyFlash() {
    if (emergencyFlashInterval.current) {
      clearInterval(emergencyFlashInterval.current);

      emergencyFlashInterval.current = null;
    }

    setEmergencyFlashOn(false);
  }

  function startCountdown(seconds: number) {
    stopCountdown();

    let remaining = Math.max(seconds, 5);

    setFallCountdown(remaining);

    startEmergencyFlash();

    countdownInterval.current = setInterval(() => {
      remaining -= 1;

      setFallCountdown(remaining);

      if (remaining <= 0) {
        stopCountdown();

        setFallCountdown(null);

        triggerEmergency();
      }
    }, 1000);
  }

  function stopCountdown() {
    if (countdownInterval.current) {
      clearInterval(countdownInterval.current);

      countdownInterval.current = null;
    }

    stopEmergencyFlash();
  }

  function userIsOkay() {
    stopCountdown();

    setFallCountdown(null);

    resetFallDetection();

    startFallDetection();
  }

  async function callEmergencyContact(phoneNumber: string) {
    if (Platform.OS !== "android") {
      await Linking.openURL(`tel:${phoneNumber}`);

      return;
    }

    const alreadyGranted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CALL_PHONE,
    );

    if (!alreadyGranted) {
      const permission = await requestCallPermission();

      if (!permission) {
        Alert.alert(
          "Permission Required",

          "BikerX could not call the emergency contact because call permission was not allowed.",
        );

        return;
      }
    }

    await IntentLauncher.startActivityAsync("android.intent.action.CALL", {
      data: `tel:${phoneNumber}`,
    });
  }

  async function triggerEmergency() {
    if (!coordinates) {
      Alert.alert("Emergency", "Location is not available.");

      resetFallDetection();

      startFallDetection();

      return;
    }

    try {
      setEmergencyLoading(true);

      const token = await getToken();

      if (!token) {
        return;
      }

      const response = await fetch(`${API_URL}/Rides/emergency`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          latitude: coordinates.latitude,

          longitude: coordinates.longitude,

          phoneNumber: "emergency",
        }),
      });

      const data = await response.json().catch(() => null);

      console.log("EMERGENCY RESPONSE:", response.status, data);

      if (!response.ok) {
        Alert.alert(
          "Emergency Error",

          data?.message ?? `Emergency failed. Status: ${response.status}`,
        );

        resetFallDetection();

        startFallDetection();

        return;
      }

      if (!data?.phoneNumber) {
        Alert.alert(
          "Emergency Error",

          "Emergency mode started, but no phone number was returned.",
        );

        return;
      }

      try {
        await callEmergencyContact(data.phoneNumber);
      } catch (callError) {
        console.log("AUTOMATIC CALL ERROR:", callError);

        Alert.alert(
          "Call Error",

          "Emergency mode worked, but the automatic call failed.",
        );

        return;
      }

      Alert.alert(
        "Emergency Mode Activated",

        data?.emergencyContactName
          ? `Calling ${data.emergencyContactName}`
          : "Calling your emergency contact.",
      );
    } catch (error) {
      console.log("EMERGENCY REQUEST ERROR:", error);

      Alert.alert(
        "Emergency Error",

        "Could not connect to the emergency service.",
      );

      resetFallDetection();

      startFallDetection();
    } finally {
      setEmergencyLoading(false);
    }
  }

  function endRide() {
    if (endingRide || !coordinates) {
      return;
    }

    Alert.alert("End Ride", "Are you sure you want to end your ride?", [
      {
        text: "Cancel",

        style: "cancel",
      },

      {
        text: "End Ride",

        style: "destructive",

        onPress: () => {
          confirmEndRide(true);
        },
      },
    ]);
  }

  async function confirmEndRide(showCompletedAlert = true): Promise<boolean> {
    if (!coordinates) {
      return false;
    }

    try {
      setEndingRide(true);

      const token = await getToken();

      if (!token) {
        return false;
      }

      const response = await fetch(`${API_URL}/Rides/end`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          latitude: coordinates.latitude,

          longitude: coordinates.longitude,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        Alert.alert("Ride Mode", data?.message ?? "Could not end the ride.");

        return false;
      }

      stopLocationTracking();

      stopFallDetection();

      stopCountdown();
      resetFallDetection();

      setFallCountdown(null);

      setActiveRide(null);

      setRideSeconds(0);

      await loadRideInfo();

      if (showCompletedAlert) {
        Alert.alert("Ride Completed", "Your ride has ended successfully.");
      }

      return true;
    } catch (error) {
      console.log("END RIDE ERROR:", error);

      Alert.alert("Ride Mode", "Could not end the ride.");

      return false;
    } finally {
      setEndingRide(false);
    }
  }

  function StatusCard({
    icon,

    title,

    description,

    active,
  }: {
    icon: keyof typeof Ionicons.glyphMap;

    title: string;

    description: string;

    active: boolean;
  }) {
    return (
      <View style={styles.statusCard}>
        <View style={styles.statusIcon}>
          <Ionicons name={icon} size={21} color="#39FF14" />
        </View>

        <View style={styles.statusTextContainer}>
          <Text style={styles.statusTitle}>{title}</Text>

          <Text style={styles.statusDescription}>{description}</Text>
        </View>

        <View style={[styles.statusBadge, active && styles.statusBadgeActive]}>
          <Text
            style={[
              styles.statusBadgeText,

              active && styles.statusBadgeTextActive,
            ]}
          >
            {active ? "ON" : "OFF"}
          </Text>
        </View>
      </View>
    );
  }

  function SafetyItem({ text, active }: { text: string; active: boolean }) {
    return (
      <View style={styles.safetyItem}>
        <Ionicons
          name={active ? "checkmark-circle" : "close-circle"}
          size={18}
          color={active ? "#39FF14" : "#666666"}
        />

        <Text style={[styles.safetyText, !active && styles.safetyTextOff]}>
          {text}
        </Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#39FF14" />

        <Text style={styles.loadingText}>Preparing Ride Mode...</Text>
      </View>
    );
  }

  if (error !== "") {
    return (
      <View style={styles.center}>
        <Ionicons name="location-outline" size={45} color="#39FF14" />

        <Text style={styles.errorTitle}>Location Required</Text>

        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!coordinates || !rideInfo) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#39FF14" />
      </View>
    );
  }

  if (activeRide) {
    return (
      <View style={styles.container}>
        <Map
          style={styles.map}
          mapStyle="https://tiles.openfreemap.org/styles/liberty"
        >
          <Camera
            center={[coordinates.longitude, coordinates.latitude]}
            zoom={16}
          />

          <Marker lngLat={[coordinates.longitude, coordinates.latitude]}>
            <View style={styles.locationMarker} />
          </Marker>
        </Map>

        <View style={styles.activeHeader}>
          <View>
            <Text style={styles.activeLabel}>ACTIVE RIDE</Text>

            <Text style={styles.activeTitle}>Ride in progress</Text>
          </View>

          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />

            <Text style={styles.liveText}>LIVE</Text>
          </View>
        </View>

        <View style={styles.ridePanel}>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Ionicons name="time-outline" size={20} color="#39FF14" />

              <Text style={styles.statValue}>{formatTime(rideSeconds)}</Text>

              <Text style={styles.statLabel}>Ride Time</Text>
            </View>

            <View style={styles.statBox}>
              <Ionicons name="navigate-outline" size={20} color="#39FF14" />

              <Text style={styles.statValue}>
                {activeRide.distanceKm.toFixed(2)} km
              </Text>

              <Text style={styles.statLabel}>Distance</Text>
            </View>
          </View>

          <Text style={styles.safetyTitle}>SAFETY STATUS</Text>

          <View style={styles.safetyBox}>
            <SafetyItem text="Location Tracking" active={!!coordinates} />

            <SafetyItem
              text="Fall Detection"
              active={activeRide.isFallDetectionActive}
            />

            <SafetyItem
              text="Emergency Contact"
              active={activeRide.isEmergencyContactReady}
            />

            <SafetyItem
              text="Voice Commands"
              active={!!rideSettings?.voiceCommands && voiceListening}
            />
          </View>

          <TouchableOpacity
            onPress={endRide}
            disabled={endingRide}
            style={styles.endButton}
          >
            {endingRide ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <>
                <Ionicons
                  name="stop-circle-outline"
                  size={20}
                  color="#FFFFFF"
                />

                <Text style={styles.endButtonText}>END RIDE</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        <Modal
          visible={fallCountdown !== null}
          transparent
          animationType="fade"
          statusBarTranslucent
        >
          <View
            style={{
              flex: 1,

              backgroundColor:
                rideSettings?.flashScreenInEmergency && emergencyFlashOn
                  ? "rgba(255,40,40,0.96)"
                  : "rgba(0,0,0,0.88)",

              justifyContent: "center",

              alignItems: "center",

              paddingHorizontal: 24,
            }}
          >
            <View
              style={{
                width: "100%",

                backgroundColor: "#0D0D0D",

                borderRadius: 25,

                borderWidth: 1,

                borderColor: "#532020",

                padding: 25,

                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 65,

                  height: 65,

                  borderRadius: 33,

                  backgroundColor: "#301010",

                  justifyContent: "center",

                  alignItems: "center",
                }}
              >
                <Ionicons name="warning" size={32} color="#FF4545" />
              </View>

              <Text
                style={{
                  color: "#FFFFFF",

                  fontSize: 22,

                  fontWeight: "900",

                  marginTop: 18,
                }}
              >
                Possible Fall Detected
              </Text>

              <Text
                style={{
                  color: "#999999",

                  fontSize: 13,

                  textAlign: "center",

                  lineHeight: 20,

                  marginTop: 8,
                }}
              >
                Emergency mode will start automatically unless you confirm that
                you are okay.
              </Text>

              <Text
                style={{
                  color: "#FF4545",

                  fontSize: 54,

                  fontWeight: "900",

                  marginVertical: 20,
                }}
              >
                {fallCountdown}
              </Text>

              <TouchableOpacity
                onPress={userIsOkay}
                style={{
                  width: "100%",

                  height: 55,

                  backgroundColor: "#39FF14",

                  borderRadius: 16,

                  justifyContent: "center",

                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#050505",

                    fontSize: 14,

                    fontWeight: "900",
                  }}
                >
                  I'M OK
                </Text>
              </TouchableOpacity>

              {emergencyLoading && (
                <ActivityIndicator
                  color="#39FF14"
                  style={{
                    marginTop: 15,
                  }}
                />
              )}
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  const emergencyReady =
    !!rideInfo.emergencyContactName && !!rideInfo.emergencyContactPhone;

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={25} color="#FFFFFF" />
          </TouchableOpacity>

          <View>
            <Text style={styles.title}>Ride Mode</Text>

            <Text style={styles.subtitle}>Ready to ride?</Text>
          </View>
        </View>

        <View style={styles.readyCard}>
          <View style={styles.readyIcon}>
            <Ionicons name="bicycle" size={27} color="#39FF14" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.readyTitle}>Ride systems ready</Text>

            <Text style={styles.readyDescription}>
              Check your safety setup before starting your ride.
            </Text>
          </View>
        </View>

        <StatusCard
          icon="location-outline"
          title="Location Status"
          description={
            coordinates
              ? "Location is ready for your ride."
              : "Location is not available."
          }
          active={!!coordinates}
        />

        <View style={styles.statusCard}>
          <View style={styles.statusIcon}>
            <Ionicons name="call-outline" size={21} color="#39FF14" />
          </View>

          <View style={styles.statusTextContainer}>
            <Text style={styles.statusTitle}>Emergency Contact</Text>

            <Text style={styles.statusDescription}>
              {emergencyReady
                ? `${rideInfo.emergencyContactName} • ${rideInfo.emergencyContactPhone}`
                : "No emergency contact configured"}
            </Text>
          </View>

          <Ionicons
            name={emergencyReady ? "checkmark-circle" : "alert-circle-outline"}
            size={22}
            color={emergencyReady ? "#39FF14" : "#777777"}
          />
        </View>

        <StatusCard
          icon="warning-outline"
          title="Fall Detection"
          description={
            rideInfo.fallDetection
              ? "Fall detection is ready."
              : "Fall detection is disabled."
          }
          active={rideInfo.fallDetection}
        />

        <StatusCard
          icon="mic-outline"
          title="Voice Control"
          description={
            rideSettings?.voiceCommands
              ? voiceListening
                ? 'Listening for "Start ride", "Stop ride", and "I\'m okay".'
                : "Voice commands are enabled."
              : "Voice commands are disabled."
          }
          active={!!rideSettings?.voiceCommands && voiceListening}
        />

        <TouchableOpacity
          onPress={startRide}
          disabled={startingRide}
          style={styles.startButton}
        >
          {startingRide ? (
            <ActivityIndicator color="#050505" />
          ) : (
            <>
              <Ionicons name="play" size={18} color="#050505" />

              <Text style={styles.startButtonText}>START RIDE</Text>
            </>
          )}
        </TouchableOpacity>

        <Text style={styles.footer}>Ride safe. Stay focused.</Text>
      </ScrollView>
    </View>
  );
}
