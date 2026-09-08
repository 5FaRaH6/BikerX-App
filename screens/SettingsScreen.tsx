import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { logout } from "../services/authSession";
import { styles } from "../styles/SettingsStyles";

export default function SettingsScreen() {
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

        <TouchableOpacity
          style={styles.item}
          onPress={() => router.push("/notification-settings" as any)}
        >
          <View style={styles.itemLeft}>
            <Ionicons name="notifications-outline" size={21} color="#39FF14" />

            <Text style={styles.itemText}>Notifications</Text>
          </View>

          <Ionicons name="chevron-forward" size={20} color="#666666" />
        </TouchableOpacity>

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
          onPress={() => router.push("/change-password" as any)}
        >
          <View style={styles.itemLeft}>
            <Ionicons name="key-outline" size={21} color="#39FF14" />

            <Text style={styles.itemText}>Change Password</Text>
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
