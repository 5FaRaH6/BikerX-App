import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { styles } from "../styles/AboutStyles";

export default function AboutScreen() {
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
            <Text style={styles.headerTitle}>About</Text>

            <Text style={styles.headerSubtitle}>Learn more about BikerX</Text>
          </View>
        </View>

        <View style={styles.logoCard}>
          <View style={styles.logoIcon}>
            <Ionicons name="bicycle" size={38} color="#39FF14" />
          </View>

          <Text style={styles.logoText}>
            Biker
            <Text style={styles.logoX}>X</Text>
          </Text>

          <Text style={styles.tagline}>Smart Riding Platform</Text>

          <View style={styles.versionBadge}>
            <Text style={styles.versionText}>Version 1.0.0</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>ABOUT BIKERX</Text>

        <View style={styles.card}>
          <View style={styles.infoRow}>
            <View style={styles.iconBox}>
              <Ionicons
                name="information-circle-outline"
                size={21}
                color="#39FF14"
              />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.itemTitle}>What is BikerX?</Text>

              <Text style={styles.itemDescription}>
                BikerX is a smart platform designed for bikers before, during,
                and after their rides.
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.iconBox}>
              <Ionicons
                name="shield-checkmark-outline"
                size={21}
                color="#39FF14"
              />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.itemTitle}>Safer Riding</Text>

              <Text style={styles.itemDescription}>
                Ride Mode includes safety tools, emergency features, location
                tracking, and distraction control.
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.iconBox}>
              <Ionicons name="people-outline" size={21} color="#39FF14" />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.itemTitle}>Biker Community</Text>

              <Text style={styles.itemDescription}>
                Share posts, follow other bikers, discover meetups, and connect
                with the riding community.
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>PLATFORM</Text>

        <View style={styles.card}>
          <View style={styles.smallRow}>
            <Ionicons name="phone-portrait-outline" size={20} color="#39FF14" />

            <View style={styles.smallTextContainer}>
              <Text style={styles.smallTitle}>Mobile Application</Text>

              <Text style={styles.smallDescription}>React Native</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.smallRow}>
            <Ionicons name="server-outline" size={20} color="#39FF14" />

            <View style={styles.smallTextContainer}>
              <Text style={styles.smallTitle}>Backend</Text>

              <Text style={styles.smallDescription}>ASP.NET Core</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.smallRow}>
            <Ionicons name="layers-outline" size={20} color="#39FF14" />

            <View style={styles.smallTextContainer}>
              <Text style={styles.smallTitle}>Database</Text>

              <Text style={styles.smallDescription}>MongoDB</Text>
            </View>
          </View>
        </View>

        <Text style={styles.footer}>
          Ride smarter. Ride safer. Ride together.
        </Text>
      </ScrollView>
    </View>
  );
}
