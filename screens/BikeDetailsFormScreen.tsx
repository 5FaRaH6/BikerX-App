import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";

import {
    ActivityIndicator,
    Alert,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { API_URL } from "../services/api";
import { getToken } from "../services/authSession";
import { styles } from "../styles/BikeDetailsFormStyles";

export default function BikeDetailsFormScreen() {
  const { model3DId } = useLocalSearchParams<{
    model3DId: string;
  }>();

  const [nickname, setNickname] = useState("");
  const [color, setColor] = useState("");
  const [wheels, setWheels] = useState("");
  const [exhaust, setExhaust] = useState("");
  const [windshield, setWindshield] = useState("");
  const [saving, setSaving] = useState(false);

  async function addBike() {
    if (!model3DId || !color || saving) {
      return;
    }

    try {
      setSaving(true);

      const token = await getToken();

      if (!token) {
        router.replace("/login");
        return;
      }

      const formData = new FormData();

      formData.append("Model3DId", model3DId);
      formData.append("Color", color);
      formData.append("Nickname", nickname);
      formData.append("Wheels", wheels);
      formData.append("Exhaust", exhaust);
      formData.append("Windshield", windshield);

      const response = await fetch(`${API_URL}/Bikes`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const text = await response.text();

      let data: any = {};

      if (text) {
        try {
          data = JSON.parse(text);
        } catch {}
      }

      if (!response.ok) {
        Alert.alert("Error", data.message || "Could not add bike");

        return;
      }

      router.back();
      router.back();
    } catch (error) {
      console.log("ADD BIKE ERROR:", error);

      Alert.alert("Error", "Could not add bike");
    } finally {
      setSaving(false);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={26} color="#FFFFFF" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Bike Details</Text>

          <View style={{ width: 26 }} />
        </View>

        <Text style={styles.title}>Tell us about your bike</Text>

        <Text style={styles.description}>
          Add a few details to make your garage personal.
        </Text>

        <Text style={styles.label}>Nickname</Text>

        <TextInput
          style={styles.input}
          value={nickname}
          onChangeText={setNickname}
          placeholder="Optional"
          placeholderTextColor="#555"
        />

        <Text style={styles.label}>Color</Text>

        <TextInput
          style={styles.input}
          value={color}
          onChangeText={setColor}
          placeholder="Black, Red, Blue..."
          placeholderTextColor="#555"
        />

        <Text style={styles.label}>Wheels</Text>

        <TextInput
          style={styles.input}
          value={wheels}
          onChangeText={setWheels}
          placeholder="Optional"
          placeholderTextColor="#555"
        />

        <Text style={styles.label}>Exhaust</Text>

        <TextInput
          style={styles.input}
          value={exhaust}
          onChangeText={setExhaust}
          placeholder="Optional"
          placeholderTextColor="#555"
        />

        <Text style={styles.label}>Windshield</Text>

        <TextInput
          style={styles.input}
          value={windshield}
          onChangeText={setWindshield}
          placeholder="Optional"
          placeholderTextColor="#555"
        />

        <TouchableOpacity
          style={[
            styles.saveButton,
            (!color || saving) && styles.disabledButton,
          ]}
          disabled={!color || saving}
          onPress={addBike}
        >
          {saving ? (
            <ActivityIndicator size="small" color="#050505" />
          ) : (
            <Text style={styles.saveButtonText}>ADD TO GARAGE</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
