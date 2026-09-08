import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';

import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { API_URL } from '../services/api';
import { getToken } from '../services/authSession';
import { styles } from '../styles/EditBikeStyle';

type Bike = {
  nickname?: string;
  color: string;
};

export default function EditBikeScreen() {
  const [nickname, setNickname] = useState('');
  const [color, setColor] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadBike();
    }, [])
  );

  async function loadBike() {
    try {
      const token = await getToken();

      if (!token) {
        router.replace('/login');
        return;
      }

      const response = await fetch(
        `${API_URL}/Bikes/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        return;
      }

      const data: Bike =
        await response.json();

      setNickname(data.nickname || '');
      setColor(data.color);

    } catch (error) {
      console.log('EDIT BIKE ERROR:', error);
    } finally {
      setLoading(false);
    }
  }

  async function saveBike() {
    if (!color || saving) {
      return;
    }

    try {
      setSaving(true);

      const token = await getToken();

      if (!token) {
        router.replace('/login');
        return;
      }

      const formData = new FormData();

      formData.append('Nickname', nickname);
      formData.append('Color', color);

      const response = await fetch(
        `${API_URL}/Bikes/me`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const text = await response.text();

      let data: any = {};

      if (text) {
        try {
          data = JSON.parse(text);
        } catch {}
      }

      if (!response.ok) {
        Alert.alert(
          'Error',
          data.message ||
            'Could not update bike'
        );
        return;
      }

      router.back();

    } catch (error) {
      console.log('EDIT BIKE ERROR:', error);

      Alert.alert(
        'Error',
        'Could not update bike'
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator
          size="large"
          color="#39FF14"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.scrollContent
        }
      >

        <View style={styles.header}>

          <TouchableOpacity
            onPress={() => router.back()}
          >
            <Ionicons
              name="chevron-back"
              size={26}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Edit Bike
          </Text>

          <View style={{ width: 26 }} />

        </View>

        <Text style={styles.title}>
          Update your bike
        </Text>

        <Text style={styles.description}>
          Change the basic details of your bike.
        </Text>

        <Text style={styles.label}>
          Nickname
        </Text>

        <TextInput
          style={styles.input}
          value={nickname}
          onChangeText={setNickname}
          placeholder="Optional"
          placeholderTextColor="#555555"
        />

        <Text style={styles.label}>
          Color
        </Text>

        <TextInput
          style={styles.input}
          value={color}
          onChangeText={setColor}
          placeholder="Black, Red, Blue..."
          placeholderTextColor="#555555"
        />

        <TouchableOpacity
          style={[
            styles.saveButton,
            (!color || saving) &&
              styles.disabledButton,
          ]}
          disabled={!color || saving}
          onPress={saveBike}
        >
          {saving ? (
            <ActivityIndicator
              size="small"
              color="#050505"
            />
          ) : (
            <Text style={styles.saveButtonText}>
              SAVE CHANGES
            </Text>
          )}
        </TouchableOpacity>

      </ScrollView>

    </View>
  );
}