import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { useEffect, useState } from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";

import { API_URL } from "../services/api";
import { getToken, logout } from "../services/authSession";
import { styles } from "../styles/SettingsStyles";

type RideModeSettings = {
  rideModeSettingsId?: string;
  userId?: string;
  reduceNotifications: boolean;
  allowPriorityCalls: boolean;
  trackLocationDuringRide: boolean;
  shareLocationInEmergency: boolean;
  fallDetection: boolean;
  emergencyCountdown: number;
  flashScreenInEmergency: boolean;
  enableMusicDuringRide: boolean;
  voiceCommands: boolean;
  voiceConfirmation: boolean;
};

export default function SettingsScreen() {
  const [rideSettings, setRideSettings] = useState<RideModeSettings | null>(
    null,
  );

  const [savingFall, setSavingFall] = useState(false);

  useEffect(() => {
    getRideSettings();
  }, []);

  async function getRideSettings() {
    try {
      const token = await getToken();

      if (!token) return;

      const response = await fetch(`${API_URL}/Rides/settings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) return;

      const data = await response.json();

      setRideSettings(data);
    } catch (error) {
      console.log("RIDE SETTINGS ERROR:", error);
    }
  }

  async function changeFallDetection(value: boolean) {
    if (!rideSettings || savingFall) return;

    const oldSettings = rideSettings;

    const updatedSettings = {
      ...rideSettings,
      fallDetection: value,
    };

    setRideSettings(updatedSettings);
    setSavingFall(true);

    try {
      const token = await getToken();

      if (!token) return;

      const response = await fetch(`${API_URL}/Rides/settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedSettings),
      });

      if (!response.ok) {
        setRideSettings(oldSettings);
      }
    } catch (error) {
      console.log("FALL DETECTION ERROR:", error);
      setRideSettings(oldSettings);
    } finally {
      setSavingFall(false);
    }
  }

  async function handleLogout() {
    await logout();
    router.replace("/login");
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>Settings</Text>

        <Text style={styles.sectionTitle}>Account</Text>

        <TouchableOpacity
          style={styles.item}
          onPress={() => router.push("/edit-profile")}
        >
          <View style={styles.itemLeft}>
            <Ionicons name="person-outline" size={21} color="#39FF14" />

            <Text style={styles.itemText}>Edit Profile</Text>
          </View>

          <Ionicons name="chevron-forward" size={20} color="#666666" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => router.push("/beginner-guide" as any)}
        >
          <View style={styles.itemLeft}>
            <Ionicons name="book-outline" size={21} color="#39FF14" />

            <Text style={styles.itemText}>Beginner Guide</Text>
          </View>

          <Ionicons name="chevron-forward" size={20} color="#666666" />
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Safety & Ride</Text>

        <TouchableOpacity
          style={styles.item}
          onPress={() => router.push("/emergency-contact")}
        >
          <View style={styles.itemLeft}>
            <Ionicons name="call-outline" size={21} color="#39FF14" />

            <Text style={styles.itemText}>Emergency Contact</Text>
          </View>

          <Ionicons name="chevron-forward" size={20} color="#666666" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => router.push("/ride-settings" as any)}
        >
          <View style={styles.itemLeft}>
            <Ionicons name="bicycle-outline" size={21} color="#39FF14" />

            <Text style={styles.itemText}>Ride Mode Settings</Text>
          </View>

          <Ionicons name="chevron-forward" size={20} color="#666666" />
        </TouchableOpacity>
        <View style={styles.item}>
          <View style={styles.itemLeft}>
            <Ionicons name="warning-outline" size={21} color="#39FF14" />

            <Text style={styles.itemText}>Fall Detection</Text>
          </View>

          <Switch
            value={rideSettings?.fallDetection ?? false}
            onValueChange={changeFallDetection}
            disabled={!rideSettings || savingFall}
            trackColor={{
              false: "#333333",
              true: "#39FF14",
            }}
            thumbColor="#FFFFFF"
          />
        </View>

        <TouchableOpacity
          style={styles.item}
          onPress={() => router.push("/privacy-settings" as any)}
        >
          <View style={styles.itemLeft}>
            <Ionicons name="lock-closed-outline" size={21} color="#39FF14" />

            <Text style={styles.itemText}>Privacy</Text>
          </View>

          <Ionicons name="chevron-forward" size={20} color="#666666" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => router.push("/about" as any)}
        >
          <View style={styles.itemLeft}>
            <Ionicons
              name="information-circle-outline"
              size={21}
              color="#39FF14"
            />

            <Text style={styles.itemText}>About BikerX</Text>
          </View>

          <Ionicons name="chevron-forward" size={20} color="#666666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#FF5C5C" />

          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
