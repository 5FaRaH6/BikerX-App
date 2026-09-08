import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

import { API_URL } from '../services/api';
import { getToken, logout } from '../services/authSession';
import { styles } from '../styles/MeetupDetailsStyles';

type Meetup = {
  meetupId: string;
  userId: string;
  username: string;
  userPhoto?: string;
  createdAt: string;
  coverImage?: string;
  title: string;
  about: string;
  date: string;
  time: string;
  address: string;
  maxRiders: number;
  meetupParticipants: number;
  meetupLikes: number;
  meetupComments: number;
  allowComments: boolean;
  isLiked: boolean;
  isJoined: boolean;
  canReport: boolean;
  status: string;
  
};

export default function MeetupDetailsScreen() {
  const params = useLocalSearchParams();
  const meetupId = String(params.meetupId || '');

  const [meetup, setMeetup] = useState<Meetup | null>(null);
  const [loading, setLoading] = useState(true);

  const [reportOpen, setReportOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    getMeetup();
  }, []);

  // get meetup details
  async function getMeetup() {
    try {
      const token = await getToken();

      if (!token) {
        router.replace('/login');
        return;
      }

      const response = await fetch(
        `${API_URL}/Meetups/${meetupId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        await logout();
        router.replace('/login');
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        Alert.alert(
          'Error',
          data.message || 'Could not load meetup.'
        );
        return;
      }

      setMeetup(data);
    }
    catch (error) {
      console.log(error);
      Alert.alert('Error', 'Could not connect to the server.');
    }
    finally {
      setLoading(false);
    }
  }

  // change like
  async function changeLike() {
    if (!meetup) return;

    try {
      const token = await getToken();

      if (!token) return;

      const response = await fetch(
        `${API_URL}/Meetups/${meetup.meetupId}/like`,
        {
          method: meetup.isLiked ? 'DELETE' : 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) return;

      setMeetup({
        ...meetup,
        isLiked: !meetup.isLiked,
        meetupLikes: meetup.isLiked
          ? meetup.meetupLikes - 1
          : meetup.meetupLikes + 1,
      });
    }
    catch (error) {
      console.log(error);
    }
  }

  // join or leave meetup
  async function changeJoin() {
    if (!meetup) return;

    try {
      const token = await getToken();

      if (!token) return;

      const response = await fetch(
        `${API_URL}/Meetups/${meetup.meetupId}/join`,
        {
          method: meetup.isJoined ? 'DELETE' : 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert(
          'Meetup',
          data.message || 'Could not update meetup.'
        );
        return;
      }

      setMeetup({
        ...meetup,
        isJoined: !meetup.isJoined,
        meetupParticipants: meetup.isJoined
          ? meetup.meetupParticipants - 1
          : meetup.meetupParticipants + 1,
      });
    }
    catch (error) {
      console.log(error);
      Alert.alert('Error', 'Could not connect to the server.');
    }
  }

  // report meetup
  async function reportMeetup() {
    if (!reason.trim()) {
      Alert.alert('Report', 'Please enter a reason.');
      return;
    }

    try {
      const token = await getToken();

      if (!token) return;

      const response = await fetch(
        `${API_URL}/Meetups/${meetupId}/report`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            reason: reason.trim(),
            description: description.trim() || null,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert(
          'Report',
          data.message || 'Could not report meetup.'
        );
        return;
      }

      setReportOpen(false);
      setReason('');
      setDescription('');

      Alert.alert(
        'Report',
        'Meetup reported successfully.'
      );
    }
    catch (error) {
      console.log(error);
      Alert.alert('Error', 'Could not connect to the server.');
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

  if (!meetup) {
    return (
      <View style={styles.loading}>
        <Text style={styles.errorText}>
          Meetup not found.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            size={25}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Meetup Details
        </Text>

        {meetup.canReport ? (
          <TouchableOpacity
            onPress={() => setReportOpen(true)}
          >
            <Ionicons
              name="ellipsis-horizontal"
              size={25}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.headerSpace} />
        )}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >

        {meetup.coverImage && (
          <Image
            source={{ uri: meetup.coverImage }}
            style={styles.coverImage}
          />
        )}

        <Text style={styles.title}>
          {meetup.title}
        </Text>

        <TouchableOpacity
  style={styles.userRow}
  activeOpacity={0.7}
  onPress={() =>
    router.push(
      `/user-profile?userId=${meetup.userId}` as any
    )
  }
>
          {meetup.userPhoto ? (
            <Image
              source={{ uri: meetup.userPhoto }}
              style={styles.userPhoto}
            />
          ) : (
            <View style={styles.defaultPhoto}>
              <Text style={styles.defaultPhotoText}>
                {meetup.username.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}

          <Text style={styles.username}>
            @{meetup.username}
          </Text>
        </TouchableOpacity>

        <View style={styles.infoRow}>
          <Ionicons
            name="calendar-outline"
            size={20}
            color="#39FF14"
          />

          <Text style={styles.infoText}>
            {new Date(meetup.date).toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons
            name="time-outline"
            size={20}
            color="#39FF14"
          />

          <Text style={styles.infoText}>
            {new Date(meetup.time).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons
            name="location-outline"
            size={20}
            color="#39FF14"
          />

          <Text style={styles.infoText}>
            {meetup.address}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>
          About
        </Text>

        <Text style={styles.about}>
          {meetup.about}
        </Text>

        <View style={styles.ridersRow}>
          <Ionicons
            name="people-outline"
            size={21}
            color="#FFFFFF"
          />

          <Text style={styles.ridersText}>
            {meetup.meetupParticipants} / {meetup.maxRiders} riders
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.joinButton,
            meetup.isJoined && styles.joinedButton,
          ]}
          onPress={changeJoin}
        >
          <Text
            style={[
              styles.joinButtonText,
              meetup.isJoined && styles.joinedButtonText,
            ]}
          >
            {meetup.isJoined ? 'Leave Ride' : 'Join Ride'}
          </Text>
        </TouchableOpacity>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.action}
            onPress={changeLike}
          >
            <Ionicons
              name={meetup.isLiked ? 'heart' : 'heart-outline'}
              size={23}
              color={meetup.isLiked ? '#39FF14' : '#AAAAAA'}
            />

            <Text style={styles.actionText}>
              {meetup.meetupLikes}
            </Text>
          </TouchableOpacity>

          {meetup.allowComments && (
            <View style={styles.action}>
              <Ionicons
                name="chatbubble-outline"
                size={21}
                color="#AAAAAA"
              />

              <Text style={styles.actionText}>
                {meetup.meetupComments}
              </Text>
            </View>
          )}
        </View>

        {meetup.canReport && (
          <TouchableOpacity
            style={styles.reportLink}
            onPress={() => setReportOpen(true)}
          >
            <Ionicons
              name="flag-outline"
              size={18}
              color="#FF5A5A"
            />

            <Text style={styles.reportText}>
              Report Meetup
            </Text>
          </TouchableOpacity>
        )}

      </ScrollView>

      <Modal
        visible={reportOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setReportOpen(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modal}>

            <Text style={styles.modalTitle}>
              Report Meetup
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Reason"
              placeholderTextColor="#737373"
              value={reason}
              onChangeText={setReason}
            />

            <TextInput
              style={[styles.input, styles.descriptionInput]}
              placeholder="Description (optional)"
              placeholderTextColor="#737373"
              value={description}
              onChangeText={setDescription}
              multiline
            />

            <TouchableOpacity
              style={styles.reportButton}
              onPress={reportMeetup}
            >
              <Text style={styles.reportButtonText}>
                Report
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setReportOpen(false)}
            >
              <Text style={styles.cancelText}>
                Cancel
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

    </View>
  );
}