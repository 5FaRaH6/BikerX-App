import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { API_URL } from "../services/api";
import { getToken } from "../services/authSession";
import { styles } from "../styles/RideSettingsStyles";

type RideModeSettings = {
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

export default function RideSettingsScreen() {
  const [settings, setSettings] = useState<RideModeSettings | null>(null);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getSettings();
  }, []);

  async function getSettings() {
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
      setSettings(data);
    } catch (error) {
      console.log("RIDE SETTINGS ERROR:", error);
    }
  }

  async function updateSetting(
    key: keyof RideModeSettings,
    value: boolean | number,
  ) {
    if (!settings || saving) {
      return;
    }

    const oldSettings = settings;

    const updatedSettings = {
      ...settings,
      [key]: value,
    };

    setSettings(updatedSettings);
    setSaving(true);

    try {
      const token = await getToken();

      if (!token) {
        setSettings(oldSettings);
        return;
      }

      const response = await fetch(`${API_URL}/Rides/settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedSettings),
      });

      if (!response.ok) {
        setSettings(oldSettings);
      }
    } catch (error) {
      console.log("UPDATE RIDE SETTINGS ERROR:", error);

      setSettings(oldSettings);
    } finally {
      setSaving(false);
    }
  }

  function SettingSwitch({
    icon,
    title,
    description,
    value,
    settingKey,
    disabled = false,
  }: {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    description: string;
    value: boolean;
    settingKey: keyof RideModeSettings;
    disabled?: boolean;
  }) {
    return (
      <View style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <View style={styles.iconBox}>
            <Ionicons name={icon} size={20} color="#39FF14" />
          </View>

          <View style={styles.settingTextContainer}>
            <Text style={styles.settingTitle}>{title}</Text>

            <Text style={styles.settingDescription}>{description}</Text>
          </View>
        </View>

        <Switch
          value={value}
          onValueChange={(newValue) => updateSetting(settingKey, newValue)}
          disabled={saving || disabled}
          trackColor={{
            false: "#303030",
            true: "#39FF14",
          }}
          thumbColor="#FFFFFF"
        />
      </View>
    );
  }

  if (!settings) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#39FF14" />
      </View>
    );
  }

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
            <Text style={styles.headerTitle}>Ride Mode</Text>

            <Text style={styles.headerSubtitle}>
              Customize your riding experience
            </Text>
          </View>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroIcon}>
            <Ionicons name="bicycle" size={27} color="#39FF14" />
          </View>

          <View style={styles.heroTextContainer}>
            <Text style={styles.heroTitle}>Ride Mode Settings</Text>

            <Text style={styles.heroDescription}>
              Choose how BikerX behaves while you are riding.
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>LOCATION & SAFETY</Text>

        <View style={styles.sectionCard}>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={styles.iconBox}>
                <Ionicons name="timer-outline" size={20} color="#39FF14" />
              </View>

              <View style={styles.settingTextContainer}>
                <Text style={styles.settingTitle}>Emergency Countdown</Text>

                <Text style={styles.settingDescription}>
                  Time to cancel an emergency action after a fall.
                </Text>
              </View>
            </View>

            <View style={styles.countdownContainer}>
              <TouchableOpacity
                style={[
                  styles.countButton,
                  settings.emergencyCountdown <= 5 &&
                    styles.countButtonDisabled,
                ]}
                disabled={saving || settings.emergencyCountdown <= 5}
                onPress={() =>
                  updateSetting(
                    "emergencyCountdown",
                    settings.emergencyCountdown - 5,
                  )
                }
              >
                <Ionicons name="remove" size={18} color="#FFFFFF" />
              </TouchableOpacity>

              <View style={styles.countValue}>
                <Text style={styles.countNumber}>
                  {settings.emergencyCountdown}
                </Text>

                <Text style={styles.countSeconds}>sec</Text>
              </View>

              <TouchableOpacity
                style={[
                  styles.countButton,
                  settings.emergencyCountdown >= 60 &&
                    styles.countButtonDisabled,
                ]}
                disabled={saving || settings.emergencyCountdown >= 60}
                onPress={() =>
                  updateSetting(
                    "emergencyCountdown",
                    settings.emergencyCountdown + 5,
                  )
                }
              >
                <Ionicons name="add" size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.divider} />

          <SettingSwitch
            icon="flash-outline"
            title="Emergency Flash"
            description="Flash the screen during an emergency warning."
            value={settings.flashScreenInEmergency}
            settingKey="flashScreenInEmergency"
          />
        </View>

        <Text style={styles.sectionTitle}>VOICE CONTROL</Text>

        <View style={styles.sectionCard}>
          <SettingSwitch
            icon="mic-outline"
            title="Voice Commands"
            description="Control Ride Mode using supported voice commands."
            value={settings.voiceCommands}
            settingKey="voiceCommands"
          />

          <View style={styles.divider} />

          <SettingSwitch
            icon="volume-high-outline"
            title="Voice Confirmation"
            description="Hear a confirmation after a voice command."
            value={settings.voiceConfirmation}
            settingKey="voiceConfirmation"
            disabled={!settings.voiceCommands}
          />
        </View>

        <View style={styles.infoCard}>
          <Ionicons
            name="information-circle-outline"
            size={20}
            color="#39FF14"
          />

          <Text style={styles.infoText}>
            These settings are used automatically when Ride Mode starts.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
