import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Bike3DViewer from "../components/Bike3DViewer";
import { API_URL } from "../services/api";
import { getToken } from "../services/authSession";
import { styles } from "../styles/GarageStyles";

type Bike = {
  bikeId: string;
  userId: string;
  model3DId: string;
  brand: string;
  model: string;
  year: number;
  modelUrl: string;
  nickname?: string;
  color: string;
};

export default function GarageScreen() {
  const [bike, setBike] = useState<Bike | null>(null);
  const [loading, setLoading] = useState(true);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadBike();
    }, []),
  );

  async function loadBike() {
    try {
      setLoading(true);

      const token = await getToken();

      if (!token) {
        router.replace("/login");
        return;
      }

      const response = await fetch(`${API_URL}/Bikes/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 404) {
        setBike(null);
        return;
      }

      if (!response.ok) {
        console.log("GARAGE ERROR:", response.status);
        return;
      }

      const data = await response.json();

      setBike(data);
    } catch (error) {
      console.log("GARAGE ERROR:", error);
    } finally {
      setLoading(false);
    }
  }
  async function deleteBike() {
    try {
      const token = await getToken();

      if (!token) {
        router.replace("/login");
        return;
      }

      Alert.alert("Delete Bike", "Are you sure you want to delete your bike?", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const response = await fetch(`${API_URL}/Bikes/me`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if (!response.ok) {
              Alert.alert("Error", "Could not delete bike");
              return;
            }

            setBike(null);
          },
        },
      ]);
    } catch (error) {
      console.log("DELETE BIKE ERROR:", error);

      Alert.alert("Error", "Could not delete bike");
    }
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#39FF14" />
      </View>
    );
  }

  if (!bike) {
    return (
      <View style={styles.container}>
        <Text style={styles.headerTitle}>My Garage</Text>

        <View style={styles.emptyContainer}>
          <Ionicons name="speedometer-outline" size={60} color="#39FF14" />

          <Text style={styles.emptyTitle}>Your garage is empty</Text>

          <Text style={styles.emptyDescription}>
            Choose a bike model and add it to your garage.
          </Text>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push("/add-bike" as any)}
          >
            <Ionicons name="add" size={22} color="#000000" />

            <Text style={styles.addButtonText}>ADD YOUR BIKE</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        scrollEnabled={scrollEnabled}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Garage</Text>

          <TouchableOpacity
            onPress={() => {
              Alert.alert("Bike Options", "Choose an action", [
                {
                  text: "Delete Bike",
                  style: "destructive",
                  onPress: deleteBike,
                },
                {
                  text: "Cancel",
                  style: "cancel",
                },
              ]);
            }}
          >
            <Ionicons name="ellipsis-horizontal" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.heroCard}>
          <Bike3DViewer
            modelUrl={bike.modelUrl}
            onTouchStart={() => setScrollEnabled(false)}
            onTouchEnd={() => setScrollEnabled(true)}
          />

          <Text style={styles.brand}>{bike.brand}</Text>

          <Text style={styles.model}>{bike.model}</Text>

          <Text style={styles.year}>{bike.year}</Text>

          {bike.nickname ? (
            <Text style={styles.nickname}>{bike.nickname}</Text>
          ) : null}
        </View>

        <View style={styles.detailsCard}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Color</Text>

            <Text style={styles.detailValue}>{bike.color}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => router.push("/edit-bike" as any)}
        >
          <Ionicons name="create-outline" size={19} color="#39FF14" />

          <Text style={styles.editButtonText}>EDIT BIKE</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
