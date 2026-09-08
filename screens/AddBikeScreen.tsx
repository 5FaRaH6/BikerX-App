import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';

import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { API_URL } from '../services/api';
import { getToken } from '../services/authSession';
import { styles } from '../styles/AddBikeStyles';

type Bike3DModel = {
  model3DId: string;
  brand: string;
  model: string;
  year: number;
  modelUrl: string;
};

export default function AddBikeScreen() {
  const [models, setModels] = useState<Bike3DModel[]>([]);
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadModels();
  }, []);

  async function loadModels() {
    try {
      const token = await getToken();

      if (!token) {
        router.replace('/login');
        return;
      }

      const response = await fetch(
        `${API_URL}/Bikes/models`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.log('MODELS ERROR:', response.status);
        return;
      }

      const data: Bike3DModel[] = await response.json();

      setModels(data);
    } catch (error) {
      console.log('MODELS ERROR:', error);
    } finally {
      setLoading(false);
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

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="chevron-back"
            size={26}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Add Bike
        </Text>

        <View style={{ width: 26 }} />
      </View>

      <Text style={styles.title}>
        Choose your bike
      </Text>

      <Text style={styles.description}>
        Select the 3D model that matches your motorcycle.
      </Text>

      <FlatList
        data={models}
        keyExtractor={item => item.model3DId}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const selected =
            selectedModelId === item.model3DId;

          return (
            <TouchableOpacity
              style={[
                styles.modelCard,
                selected && styles.selectedCard,
              ]}
              onPress={() =>
                setSelectedModelId(item.model3DId)
              }
            >
              <View>
                <Text style={styles.brand}>
                  {item.brand}
                </Text>

                <Text style={styles.model}>
                  {item.model}
                </Text>

                <Text style={styles.year}>
                  {item.year}
                </Text>
              </View>

              {selected && (
                <Ionicons
                  name="checkmark-circle"
                  size={26}
                  color="#39FF14"
                />
              )}
            </TouchableOpacity>
          );
        }}
      />

      <TouchableOpacity
  style={[
    styles.continueButton,
    !selectedModelId &&
      styles.disabledButton,
  ]}
  disabled={!selectedModelId}
  onPress={() =>
    router.push(
      `/bike-details-form?model3DId=${selectedModelId}` as any
    )
  }
>
        <Text style={styles.continueText}>
          CONTINUE
        </Text>
      </TouchableOpacity>

    </View>
  );
}