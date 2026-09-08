import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';

import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { API_URL } from '../services/api';
import { getToken } from '../services/authSession';
import { styles } from '../styles/FollowStyles';

type FollowUser = {
  userId: string;
  username: string;
  photo?: string;
};

type Props = {
  userId: string;
  type: 'followers' | 'following';
};

export default function FollowListScreen({
  userId,
  type,
}: Props) {
  const [users, setUsers] = useState<FollowUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, [userId, type]);

  async function loadUsers() {
    try {
      setLoading(true);

      const token = await getToken();

      if (!token) {
        router.replace('/login');
        return;
      }

      const response = await fetch(
        `${API_URL}/Users/${userId}/${type}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.log(
          'FOLLOW LIST ERROR:',
          response.status
        );
        return;
      }

      const data = await response.json();

      setUsers(data);
    } catch (error) {
      console.log(
        'FOLLOW LIST ERROR:',
        error
      );
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

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons
            name="chevron-back"
            size={27}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        <Text style={styles.title}>
          {type === 'followers'
            ? 'Followers'
            : 'Following'}
        </Text>

        <View style={styles.headerSpace} />

      </View>

      {users.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="people-outline"
            size={40}
            color="#555555"
          />

          <Text style={styles.emptyText}>
            {type === 'followers'
              ? 'No followers yet'
              : 'Not following anyone yet'}
          </Text>
        </View>
      ) : (
        <View style={styles.list}>
          {users.map(user => (
            <TouchableOpacity
              key={user.userId}
              style={styles.userCard}
              onPress={() =>
                router.push(
                  `/user-profile?userId=${user.userId}` as any
                )
              }
            >

              {user.photo ? (
                <Image
                  source={{
                    uri: user.photo,
                  }}
                  style={styles.photo}
                />
              ) : (
                <View
                  style={styles.defaultPhoto}
                >
                  <Ionicons
                    name="person"
                    size={24}
                    color="#FFFFFF"
                  />
                </View>
              )}

              <Text
                style={styles.username}
              >
                @{user.username}
              </Text>

              <Ionicons
                name="chevron-forward"
                size={20}
                color="#666666"
              />

            </TouchableOpacity>
          ))}
        </View>
      )}

    </View>
  );
}