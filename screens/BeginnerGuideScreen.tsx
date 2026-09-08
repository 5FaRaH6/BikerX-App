import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function BeginnerGuideScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#050505',
      }}
    >
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 55,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 25,
          }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              width: 40,
              height: 40,
              justifyContent: 'center',
            }}
          >
            <Ionicons
              name="chevron-back"
              size={26}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 24,
              fontWeight: '800',
            }}
          >
            Beginner Guide
          </Text>
        </View>

        <Text
          style={{
            color: '#888888',
            fontSize: 14,
            lineHeight: 20,
            marginBottom: 25,
          }}
        >
          A simple guide for new riders to help them get started safely.
        </Text>

        <GuideCard
          icon="speedometer-outline"
          title="Basic Bike Controls"
          text="Learn the main controls before riding: throttle, front and rear brakes, clutch, gears and indicators."
        />

        <GuideCard
          icon="shield-checkmark-outline"
          title="Safety Before Riding"
          text="Check your tires, brakes, lights and fuel before every ride. Always make sure the bike feels normal before starting."
        />

        <GuideCard
          icon="shirt-outline"
          title="Essential Gear"
          text="Always wear a certified helmet, gloves, riding jacket, long pants and proper riding shoes."
        />

        <GuideCard
          icon="bicycle-outline"
          title="First Ride Tips"
          text="Start slowly, practice in a safe area, keep a safe distance and avoid riding beyond your current skill level."
        />
      </ScrollView>
    </View>
  );
}

function GuideCard({
  icon,
  title,
  text,
}: {
  icon: any;
  title: string;
  text: string;
}) {
  return (
    <View
      style={{
        backgroundColor: '#101010',
        borderWidth: 1,
        borderColor: '#252525',
        borderRadius: 16,
        padding: 18,
        marginBottom: 14,
      }}
    >
      <Ionicons
        name={icon}
        size={24}
        color="#39FF14"
      />

      <Text
        style={{
          color: '#FFFFFF',
          fontSize: 17,
          fontWeight: '700',
          marginTop: 12,
          marginBottom: 8,
        }}
      >
        {title}
      </Text>

      <Text
        style={{
          color: '#A0A0A0',
          fontSize: 14,
          lineHeight: 21,
        }}
      >
        {text}
      </Text>
    </View>
  );
}