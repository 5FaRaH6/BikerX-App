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
import { styles } from "../styles/PrivacySettingsStyles";

type PrivacySettings = {
  profileVisibility: string;
  commentsVisibility: boolean;
  showFollowers: boolean;
  showPosts: boolean;
  showMeetups: boolean;
  allowFollow: boolean;
  allowComments: boolean;
};

export default function PrivacySettingsScreen() {
  const [settings, setSettings] = useState<PrivacySettings | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getSettings();
  }, []);

  async function getSettings() {
    try {
      const token = await getToken();

      if (!token) return;

      const response = await fetch(`${API_URL}/PrivacySettings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) return;

      const data = await response.json();

      setSettings(data);
    } catch (error) {
      console.log("PRIVACY SETTINGS ERROR:", error);
    }
  }

  async function updateSetting(
    key: keyof PrivacySettings,
    value: string | boolean,
  ) {
    if (!settings || saving) return;

    const oldSettings = settings;

    const updatedSettings = {
      ...settings,
      [key]: value,
    };

    setSettings(updatedSettings);
    setSaving(true);

    try {
      const token = await getToken();

      if (!token) return;

      const response = await fetch(`${API_URL}/PrivacySettings`, {
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
      console.log("UPDATE PRIVACY ERROR:", error);
      setSettings(oldSettings);
    } finally {
      setSaving(false);
    }
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
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <Text style={styles.title}>Privacy</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemText}>Show Followers</Text>

          <Switch
            value={settings.showFollowers}
            onValueChange={(value) => updateSetting("showFollowers", value)}
            disabled={saving}
          />
        </View>

        <View style={styles.item}>
          <Text style={styles.itemText}>Show Posts</Text>

          <Switch
            value={settings.showPosts}
            onValueChange={(value) => updateSetting("showPosts", value)}
            disabled={saving}
          />
        </View>

        <View style={styles.item}>
          <Text style={styles.itemText}>Show Meetups</Text>

          <Switch
            value={settings.showMeetups}
            onValueChange={(value) => updateSetting("showMeetups", value)}
            disabled={saving}
          />
        </View>

        <View style={styles.item}>
          <Text style={styles.itemText}>Allow Follow</Text>

          <Switch
            value={settings.allowFollow}
            onValueChange={(value) => updateSetting("allowFollow", value)}
            disabled={saving}
          />
        </View>

        <View style={styles.item}>
          <Text style={styles.itemText}>Allow Comments</Text>

          <Switch
            value={settings.allowComments}
            onValueChange={(value) => updateSetting("allowComments", value)}
            disabled={saving}
          />
        </View>
      </ScrollView>
    </View>
  );
}
