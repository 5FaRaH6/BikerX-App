import { Ionicons } from '@expo/vector-icons';
import {
  router,
  useFocusEffect,
  useLocalSearchParams,
} from 'expo-router';

import {
  useCallback,
  useState,
} from 'react';

import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { API_URL } from '../services/api';
import { getToken } from '../services/authSession';
import { styles } from '../styles/UserProfileStyles';

type UserProfile = {
  userId: string;
  fullName: string;
  username: string;
  age: number;
  photo?: string;
  bio?: string;
  hasBike: boolean;
  followersCount: number;
  followingCount: number;
  isFollowing: boolean;
};

type Post = {
  postId: string;
  userId: string;
  about: string;
  description?: string;
  imageUrl?: string;
  postLikes: number;
  postComments: number;
  allowComments: boolean;
};

type Meetup = {
  meetupId: string;
  userId: string;
  title: string;
  about: string;
  coverImage?: string;
  address: string;
  date: string;
  meetupLikes: number;
  meetupComments: number;
  allowComments: boolean;
  status: string;
};

export default function UserProfileScreen() {
  const { userId } =
    useLocalSearchParams<{
      userId: string;
    }>();

  const [profile, setProfile] =
    useState<UserProfile | null>(null);

  const [currentUserId, setCurrentUserId] =
    useState<string | null>(null);

  const [posts, setPosts] =
    useState<Post[]>([]);

  const [meetups, setMeetups] =
    useState<Meetup[]>([]);

  const [activeTab, setActiveTab] =
    useState<'feed' | 'meetups'>('feed');

  const [loading, setLoading] =
    useState(true);

  const [followLoading, setFollowLoading] =
    useState(false);

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [userId])
  );

  async function loadProfile() {
    if (!userId) {
      return;
    }

    try {
      setLoading(true);

      const token = await getToken();

      if (!token) {
        router.replace('/login');
        return;
      }

      const [
        profileResponse,
        meResponse,
        postsResponse,
        meetupsResponse,
      ] = await Promise.all([
        fetch(
          `${API_URL}/Users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),

        fetch(
          `${API_URL}/Users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),

        fetch(
          `${API_URL}/Posts`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),

        fetch(
          `${API_URL}/Meetups`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),
      ]);

      if (!profileResponse.ok) {
        Alert.alert(
          'Error',
          'Could not load user profile'
        );
        return;
      }

      const profileData =
        await profileResponse.json();

      setProfile(profileData);

      if (meResponse.ok) {
        const meData =
          await meResponse.json();

        setCurrentUserId(
          meData.userId
        );
      }

      if (postsResponse.ok) {
        const postsData: Post[] =
          await postsResponse.json();

        setPosts(
          postsData.filter(
            post =>
              post.userId === userId
          )
        );
      }

      if (meetupsResponse.ok) {
        const meetupsData: Meetup[] =
          await meetupsResponse.json();

        setMeetups(
          meetupsData.filter(
            meetup =>
              meetup.userId === userId
          )
        );
      }
    } catch (error) {
      console.log(
        'USER PROFILE ERROR:',
        error
      );
    } finally {
      setLoading(false);
    }
  }

  async function changeFollow() {
    if (
      !profile ||
      followLoading ||
      currentUserId === profile.userId
    ) {
      return;
    }

    try {
      setFollowLoading(true);

      const token =
        await getToken();

      if (!token) {
        router.replace('/login');
        return;
      }

      const method =
        profile.isFollowing
          ? 'DELETE'
          : 'POST';

      const response =
        await fetch(
          `${API_URL}/Users/${profile.userId}/follow`,
          {
            method,
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      let data: any = {};

      const text =
        await response.text();

      if (text) {
        try {
          data = JSON.parse(text);
        } catch {}
      }

      if (!response.ok) {
        Alert.alert(
          'Error',
          data.message ||
            'Could not update follow'
        );

        return;
      }

      setProfile(current => {
        if (!current) {
          return current;
        }

        const wasFollowing =
          current.isFollowing;

        return {
          ...current,

          isFollowing:
            !wasFollowing,

          followersCount:
            wasFollowing
              ? Math.max(
                  0,
                  current.followersCount - 1
                )
              : current.followersCount + 1,
        };
      });
    } catch (error) {
      console.log(
        'FOLLOW ERROR:',
        error
      );

      Alert.alert(
        'Error',
        'Could not update follow'
      );
    } finally {
      setFollowLoading(false);
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

  if (!profile) {
    return (
      <View style={styles.loading}>
        <Text style={styles.emptyText}>
          User not found
        </Text>
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
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons
              name="chevron-back"
              size={27}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Profile
          </Text>

          <View style={styles.headerSpace} />

        </View>

        {profile.photo ? (
          <Image
            source={{
              uri: profile.photo,
            }}
            style={styles.profilePhoto}
          />
        ) : (
          <View
            style={styles.defaultPhoto}
          >
            <Ionicons
              name="person"
              size={44}
              color="#FFFFFF"
            />
          </View>
        )}

        <Text style={styles.fullName}>
          {profile.fullName}
        </Text>

        <Text style={styles.username}>
          @{profile.username}
        </Text>

        {profile.bio ? (
          <Text style={styles.bio}>
            {profile.bio}
          </Text>
        ) : null}

        <View style={styles.stats}>

          <TouchableOpacity
            style={styles.statItem}
            onPress={() =>
              router.push(
                `/followers?userId=${profile.userId}` as any
              )
            }
          >
            <Text style={styles.statNumber}>
              {profile.followersCount}
            </Text>

            <Text style={styles.statLabel}>
              Followers
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.statItem}
            onPress={() =>
              router.push(
                `/following?userId=${profile.userId}` as any
              )
            }
          >
            <Text style={styles.statNumber}>
              {profile.followingCount}
            </Text>

            <Text style={styles.statLabel}>
              Following
            </Text>
          </TouchableOpacity>

        </View>

        {/* show follow only for another user */}
        {currentUserId !== profile.userId && (
          <TouchableOpacity
            style={[
              styles.followButton,
              profile.isFollowing &&
                styles.followingButton,
            ]}
            onPress={changeFollow}
            disabled={followLoading}
          >

            {followLoading ? (
              <ActivityIndicator
                size="small"
                color={
                  profile.isFollowing
                    ? '#FFFFFF'
                    : '#050505'
                }
              />
            ) : (
              <Text
                style={[
                  styles.followText,
                  profile.isFollowing &&
                    styles.followingText,
                ]}
              >
                {profile.isFollowing
                  ? 'Following'
                  : 'Follow'}
              </Text>
            )}

          </TouchableOpacity>
        )}

        <View style={styles.tabs}>

          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'feed' &&
                styles.activeTab,
            ]}
            onPress={() =>
              setActiveTab('feed')
            }
          >
            <Ionicons
              name="grid-outline"
              size={18}
              color={
                activeTab === 'feed'
                  ? '#39FF14'
                  : '#777777'
              }
            />

            <Text
              style={[
                styles.tabText,
                activeTab === 'feed' &&
                  styles.activeTabText,
              ]}
            >
              Feed
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'meetups' &&
                styles.activeTab,
            ]}
            onPress={() =>
              setActiveTab('meetups')
            }
          >
            <Ionicons
              name="people-outline"
              size={18}
              color={
                activeTab === 'meetups'
                  ? '#39FF14'
                  : '#777777'
              }
            />

            <Text
              style={[
                styles.tabText,
                activeTab === 'meetups' &&
                  styles.activeTabText,
              ]}
            >
              Meetups
            </Text>
          </TouchableOpacity>

        </View>

        {activeTab === 'feed' ? (
          <View style={styles.list}>

            {posts.length === 0 ? (
              <Text style={styles.emptyText}>
                No posts yet
              </Text>
            ) : (
              posts.map(post => (
                <TouchableOpacity
                  key={post.postId}
                  style={styles.card}
                  onPress={() =>
                    router.push(
                      `/post-details?postId=${post.postId}` as any
                    )
                  }
                >

                  <Text style={styles.cardTitle}>
                    {post.about}
                  </Text>

                  {post.description ? (
                    <Text
                      style={styles.cardText}
                    >
                      {post.description}
                    </Text>
                  ) : null}

                  {post.imageUrl ? (
                    <Image
                      source={{
                        uri: post.imageUrl,
                      }}
                      style={styles.postImage}
                    />
                  ) : null}

                  <View style={styles.actions}>

                    <View style={styles.action}>
                      <Ionicons
                        name="heart-outline"
                        size={17}
                        color="#AAAAAA"
                      />

                      <Text style={styles.actionText}>
                        {post.postLikes}
                      </Text>
                    </View>

                    {post.allowComments && (
                      <View style={styles.action}>
                        <Ionicons
                          name="chatbubble-outline"
                          size={16}
                          color="#AAAAAA"
                        />

                        <Text style={styles.actionText}>
                          {post.postComments}
                        </Text>
                      </View>
                    )}

                  </View>

                </TouchableOpacity>
              ))
            )}

          </View>
        ) : (
          <View style={styles.list}>

            {meetups.length === 0 ? (
              <Text style={styles.emptyText}>
                No meetups yet
              </Text>
            ) : (
              meetups.map(meetup => (
                <TouchableOpacity
                  key={meetup.meetupId}
                  style={styles.card}
                  onPress={() =>
                    router.push(
                      `/meetup-details?meetupId=${meetup.meetupId}` as any
                    )
                  }
                >

                  {meetup.coverImage ? (
                    <Image
                      source={{
                        uri: meetup.coverImage,
                      }}
                      style={styles.meetupImage}
                    />
                  ) : null}

                  <View style={styles.meetupHeader}>

                    <Text style={styles.cardTitle}>
                      {meetup.title}
                    </Text>

                    <Text style={styles.status}>
                      {meetup.status}
                    </Text>

                  </View>

                  <Text style={styles.cardText}>
                    {meetup.about}
                  </Text>

                  <View style={styles.detailRow}>
                    <Ionicons
                      name="location-outline"
                      size={15}
                      color="#39FF14"
                    />

                    <Text style={styles.detailText}>
                      {meetup.address}
                    </Text>
                  </View>

                </TouchableOpacity>
              ))
            )}

          </View>
        )}

      </ScrollView>

    </View>
  );
}