import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { WebView } from "react-native-webview";

import { API_URL } from "../services/api";
import { getToken } from "../services/authSession";
import { styles } from "../styles/CreateMeetupStyles";

export default function CreateMeetupScreen() {
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [address, setAddress] = useState("");
  const [maxRiders, setMaxRiders] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [allowComments, setAllowComments] = useState(true);

  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);

  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [error, setError] = useState("");

  // choose cover image
  async function chooseImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission", "Gallery permission is required.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  // get address from coordinates
  async function getAddress(lat: number, lng: number) {
    try {
      const result = await Location.reverseGeocodeAsync({
        latitude: lat,
        longitude: lng,
      });

      if (result.length > 0) {
        const place = result[0];

        const parts = [
          place.name,
          place.street,
          place.city,
          place.region,
        ].filter(Boolean);

        setAddress(parts.join(", "));
      }
    } catch (error) {
      console.log(error);
    }
  }

  // use current location
  async function useCurrentLocation() {
    try {
      setLocationLoading(true);

      const servicesEnabled = await Location.hasServicesEnabledAsync();

      if (!servicesEnabled) {
        Alert.alert(
          "Location is Off",
          "Please turn on Location from your phone settings, then try again.",
        );

        return;
      }

      const permission = await Location.requestForegroundPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Location Permission",
          "Please allow BikerX to access your location.",
        );

        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const lat = location.coords.latitude;
      const lng = location.coords.longitude;

      setLatitude(lat);
      setLongitude(lng);

      await getAddress(lat, lng);

      setShowMap(true);
    } catch (error) {
      console.log(error);

      Alert.alert("Location", "Could not get your location. Please try again.");
    } finally {
      setLocationLoading(false);
    }
  }

  // choose location from map
  async function chooseMapLocation(event: any) {
    try {
      const data = JSON.parse(event.nativeEvent.data);

      const lat = data.latitude;
      const lng = data.longitude;

      setLatitude(lat);
      setLongitude(lng);

      await getAddress(lat, lng);
    } catch (error) {
      console.log(error);
    }
  }

  // create meetup
  async function createMeetup() {
    setError("");

    if (
      !title.trim() ||
      !about.trim() ||
      !date ||
      !time ||
      !address.trim() ||
      latitude === null ||
      longitude === null ||
      !maxRiders.trim()
    ) {
      setError("Please fill all required fields.");
      return;
    }

    const maxRidersNumber = Number(maxRiders);

    if (isNaN(maxRidersNumber) || maxRidersNumber <= 0) {
      setError("Max riders must be greater than 0.");
      return;
    }

    try {
      setLoading(true);

      const token = await getToken();

      if (!token) {
        router.replace("/login");
        return;
      }

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      const hour = String(time.getHours()).padStart(2, "0");
      const minute = String(time.getMinutes()).padStart(2, "0");

      const dateValue = `${year}-${month}-${day}`;

      const formData = new FormData();

      formData.append("Title", title.trim());
      formData.append("About", about.trim());

      formData.append("Date", `${dateValue}T00:00:00`);

      formData.append("Time", `${dateValue}T${hour}:${minute}:00`);

      formData.append("Address", address.trim());
      formData.append("Latitude", String(latitude));
      formData.append("Longitude", String(longitude));
      formData.append("MaxRiders", String(maxRidersNumber));
      formData.append("AllowComments", String(allowComments));

      if (image) {
        const fileName = image.split("/").pop() || "meetup.jpg";

        formData.append("Photo", {
          uri: image,
          name: fileName,
          type: "image/jpeg",
        } as any);
      }

      const response = await fetch(`${API_URL}/Meetups`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Could not create meetup.");
        return;
      }

      Alert.alert("Meetup", "Meetup created successfully.");

      router.replace("/home");
    } catch (error) {
      console.log(error);
      setError("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  const mapLatitude = latitude ?? 32.0853;
  const mapLongitude = longitude ?? 34.7818;

  const mapHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
      />

      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />

      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

      <style>
        html, body, #map {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          background: #111111;
        }
      </style>
    </head>

    <body>
      <div id="map"></div>

      <script>
        const map = L.map('map').setView(
          [${mapLatitude}, ${mapLongitude}],
          ${latitude !== null ? 15 : 8}
        );

        L.tileLayer(
          'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            maxZoom: 19,
            attribution: '© OpenStreetMap contributors'
          }
        ).addTo(map);

        let marker;

        ${
          latitude !== null && longitude !== null
            ? `
              marker = L.marker([
                ${mapLatitude},
                ${mapLongitude}
              ]).addTo(map);
            `
            : ""
        }

        map.on('click', function(event) {
          const lat = event.latlng.lat;
          const lng = event.latlng.lng;

          if (marker) {
            marker.setLatLng([lat, lng]);
          }
          else {
            marker = L.marker([lat, lng]).addTo(map);
          }

          window.ReactNativeWebView.postMessage(
            JSON.stringify({
              latitude: lat,
              longitude: lng
            })
          );
        });
      </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={27} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Create Meetup</Text>

        <View style={styles.headerSpace} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.label}>Cover Image</Text>

        <TouchableOpacity style={styles.imageButton} onPress={chooseImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <>
              <Ionicons name="image-outline" size={36} color="#39FF14" />

              <Text style={styles.imageButtonText}>Choose Cover Image</Text>
            </>
          )}
        </TouchableOpacity>

        {image && (
          <TouchableOpacity
            style={styles.removeImage}
            onPress={() => setImage(null)}
          >
            <Text style={styles.removeImageText}>Remove Image</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.label}>Title</Text>

        <TextInput
          style={styles.input}
          placeholder="Meetup title"
          placeholderTextColor="#737373"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>About</Text>

        <TextInput
          style={[styles.input, styles.aboutInput]}
          placeholder="Tell riders about the meetup..."
          placeholderTextColor="#737373"
          value={about}
          onChangeText={setAbout}
          multiline
        />

        <Text style={styles.label}>Date</Text>

        <TouchableOpacity
          style={styles.pickerButton}
          onPress={() => setShowDate(true)}
        >
          <Ionicons name="calendar-outline" size={20} color="#39FF14" />

          <Text style={[styles.pickerText, !date && styles.placeholderText]}>
            {date ? date.toLocaleDateString() : "Choose date"}
          </Text>

          <Ionicons name="chevron-down" size={18} color="#777777" />
        </TouchableOpacity>

        {showDate && (
          <DateTimePicker
            value={date || new Date()}
            mode="date"
            minimumDate={new Date()}
            onChange={(event, selectedDate) => {
              setShowDate(false);

              if (selectedDate) {
                setDate(selectedDate);
              }
            }}
          />
        )}

        <Text style={styles.label}>Time</Text>

        <TouchableOpacity
          style={styles.pickerButton}
          onPress={() => setShowTime(true)}
        >
          <Ionicons name="time-outline" size={20} color="#39FF14" />

          <Text style={[styles.pickerText, !time && styles.placeholderText]}>
            {time
              ? time.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Choose time"}
          </Text>

          <Ionicons name="chevron-down" size={18} color="#777777" />
        </TouchableOpacity>

        {showTime && (
          <DateTimePicker
            value={time || new Date()}
            mode="time"
            onChange={(event, selectedTime) => {
              setShowTime(false);

              if (selectedTime) {
                setTime(selectedTime);
              }
            }}
          />
        )}

        <Text style={styles.label}>Location</Text>

        <View style={styles.locationInput}>
          <Ionicons name="location-outline" size={20} color="#39FF14" />

          <TextInput
            style={styles.locationTextInput}
            placeholder="Write location"
            placeholderTextColor="#737373"
            value={address}
            onChangeText={setAddress}
          />
        </View>

        <View style={styles.locationButtons}>
          <TouchableOpacity
            style={styles.locationButton}
            onPress={useCurrentLocation}
          >
            {locationLoading ? (
              <ActivityIndicator size="small" color="#39FF14" />
            ) : (
              <Ionicons name="locate-outline" size={19} color="#39FF14" />
            )}

            <Text style={styles.locationButtonText}>My Location</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.locationButton}
            onPress={() => setShowMap(!showMap)}
          >
            <Ionicons name="map-outline" size={19} color="#39FF14" />

            <Text style={styles.locationButtonText}>Choose on Map</Text>
          </TouchableOpacity>
        </View>

        {showMap && (
          <View style={styles.mapContainer}>
            <WebView
              key={`${mapLatitude}-${mapLongitude}`}
              source={{ html: mapHtml }}
              style={styles.map}
              javaScriptEnabled
              domStorageEnabled
              onMessage={chooseMapLocation}
            />

            <Text style={styles.mapHelp}>
              Tap anywhere on the map to choose the meetup location
            </Text>

            {latitude !== null && longitude !== null && (
              <View style={styles.selectedLocation}>
                <Ionicons name="checkmark-circle" size={18} color="#39FF14" />

                <Text style={styles.selectedLocationText}>
                  Location selected
                </Text>
              </View>
            )}
          </View>
        )}

        <Text style={styles.label}>Max Riders</Text>

        <View style={styles.locationInput}>
          <Ionicons name="people-outline" size={20} color="#39FF14" />

          <TextInput
            style={styles.locationTextInput}
            placeholder="20"
            placeholderTextColor="#737373"
            keyboardType="number-pad"
            value={maxRiders}
            onChangeText={setMaxRiders}
          />
        </View>

        <TouchableOpacity
          style={styles.commentsRow}
          onPress={() => setAllowComments(!allowComments)}
        >
          <View>
            <Text style={styles.commentsTitle}>Allow Comments</Text>

            <Text style={styles.commentsText}>
              Let riders comment on this meetup
            </Text>
          </View>

          <Ionicons
            name={allowComments ? "toggle" : "toggle-outline"}
            size={38}
            color={allowComments ? "#39FF14" : "#777777"}
          />
        </TouchableOpacity>

        {error !== "" && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity
          style={styles.createButton}
          onPress={createMeetup}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#050505" />
          ) : (
            <Text style={styles.createButtonText}>Create Meetup</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
