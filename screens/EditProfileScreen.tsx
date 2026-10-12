import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

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

import { API_URL } from "../services/api";
import { getToken } from "../services/authSession";
import { styles } from "../styles/EditProfileStyles";

type Profile = {
  fullName: string;
  username: string;
  age: number;
  email: string;
  photo?: string;
  bio?: string;
  hasBike: boolean;
};

export default function EditProfileScreen() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");

  const [currentPhoto, setCurrentPhoto] = useState<string | null>(null);

  const [newPhoto, setNewPhoto] = useState<string | null>(null);

  const [hasBike, setHasBike] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, []),
  );

  async function loadProfile() {
    try {
      setLoading(true);

      const token = await getToken();

      if (!token) {
        router.replace("/login");
        return;
      }

      const response = await fetch(`${API_URL}/Users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        Alert.alert("Error", "Could not load profile");

        return;
      }

      const data: Profile = await response.json();

      setFullName(data.fullName || "");
      setUsername(data.username || "");
      setAge(data.age?.toString() || "");
      setBio(data.bio || "");
      setCurrentPhoto(data.photo || null);
      setHasBike(data.hasBike);
    } catch (error) {
      console.log("LOAD EDIT PROFILE ERROR:", error);

      Alert.alert("Error", "Could not load profile");
    } finally {
      setLoading(false);
    }
  }

  async function choosePhoto() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission", "Gallery permission is required.");

      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setNewPhoto(result.assets[0].uri);
    }
  }

  async function uploadPhoto(token: string): Promise<string | null> {
    if (!newPhoto) {
      return currentPhoto;
    }

    const formData = new FormData();

    formData.append("photo", {
      uri: newPhoto,
      name: "profile.jpg",
      type: "image/jpeg",
    } as any);

    const response = await fetch(`${API_URL}/Users/me/photo`, {
      method: "POST",

      headers: {
        Authorization: `Bearer ${token}`,
      },

      body: formData,
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(data?.message || "Could not upload photo");
    }

    return data.photo;
  }

  async function saveProfile() {
    if (saving) {
      return;
    }

    if (!fullName.trim()) {
      Alert.alert("Full Name", "Please enter your full name.");

      return;
    }

    if (!username.trim()) {
      Alert.alert("Username", "Please enter a username.");

      return;
    }

    const ageNumber = Number(age);

    if (!age || isNaN(ageNumber) || ageNumber < 18) {
      Alert.alert("Age", "You must be at least 18 years old.");

      return;
    }

    try {
      setSaving(true);

      const token = await getToken();

      if (!token) {
        router.replace("/login");
        return;
      }

      const photoUrl = await uploadPhoto(token);

      const response = await fetch(`${API_URL}/Users/me`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          fullName: fullName.trim(),
          username: username.trim(),
          age: ageNumber,
          photo: photoUrl,
          bio: bio.trim(),
          hasBike: hasBike,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        Alert.alert("Error", data?.message || "Could not update profile");

        return;
      }

      Alert.alert("Profile Updated", "Your profile was updated successfully.", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } catch (error: any) {
      console.log("UPDATE PROFILE ERROR:", error);

      Alert.alert("Error", error?.message || "Could not update profile");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#39FF14" />
      </View>
    );
  }

  const photoToShow = newPhoto || currentPhoto;

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
            <Ionicons name="chevron-back" size={26} color="#FFFFFF" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Edit Profile</Text>

          <View style={styles.headerSpace} />
        </View>

        <View style={styles.photoSection}>
          <TouchableOpacity onPress={choosePhoto} activeOpacity={0.8}>
            {photoToShow ? (
              <Image
                source={{
                  uri: photoToShow,
                }}
                style={styles.profilePhoto}
              />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Ionicons name="person" size={48} color="#777777" />
              </View>
            )}

            <View style={styles.cameraButton}>
              <Ionicons name="camera" size={17} color="#050505" />
            </View>
          </TouchableOpacity>

          <Text style={styles.changePhotoText}>Change profile photo</Text>
        </View>

        <Text style={styles.label}>Full Name</Text>

        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Full name"
          placeholderTextColor="#555555"
        />

        <Text style={styles.label}>Username</Text>

        <View style={styles.usernameInput}>
          <Text style={styles.atText}>@</Text>

          <TextInput
            style={styles.usernameTextInput}
            value={username}
            onChangeText={setUsername}
            placeholder="username"
            placeholderTextColor="#555555"
            autoCapitalize="none"
          />
        </View>

        <Text style={styles.label}>Age</Text>

        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          placeholder="Age"
          placeholderTextColor="#555555"
          keyboardType="number-pad"
          maxLength={3}
        />

        <View style={styles.bioHeader}>
          <Text style={styles.label}>Bio</Text>

          <Text style={styles.bioCount}>{bio.length}/150</Text>
        </View>

        <TextInput
          style={[styles.input, styles.bioInput]}
          value={bio}
          onChangeText={setBio}
          placeholder="Tell bikers something about you..."
          placeholderTextColor="#555555"
          multiline
          maxLength={150}
          textAlignVertical="top"
        />

        <TouchableOpacity
          style={[styles.saveButton, saving && styles.disabledButton]}
          disabled={saving}
          onPress={saveProfile}
        >
          {saving ? (
            <ActivityIndicator size="small" color="#050505" />
          ) : (
            <>
              <Ionicons name="checkmark" size={20} color="#050505" />

              <Text style={styles.saveButtonText}>SAVE CHANGES</Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
