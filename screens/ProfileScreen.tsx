import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";

import { useCallback, useState } from "react";

import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Bike3DViewer from "../components/Bike3DViewer";
import { API_URL } from "../services/api";
import { getToken } from "../services/authSession";
import { styles } from "../styles/ProfileStyles";

type Tab = "feed" | "meetups";

type UserProfile = {
  userId: string;
  fullName: string;
  username: string;
  age: number;
  email?: string;
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
  username: string;
  createdAt: string;
  imageUrl?: string;
  about: string;
  description?: string;
  address?: string;
  allowComments: boolean;
  postLikes: number;
  postComments: number;
};

type Meetup = {
  meetupId: string;
  userId: string;
  username: string;
  title: string;
  about: string;
  coverImage?: string;
  date: string;
  address: string;
  maxRiders: number;
  meetupParticipants: number;
  meetupLikes: number;
  meetupComments: number;
  allowComments: boolean;
  status: string;
};

type Bike = {
  bikeId: string;
  userId: string;
  model3DId: string;
  brand: string;
  model: string;
  year: number;
  modelUrl: string;
  nickname?: string;
  photo?: string;
  color: string;
  wheels?: string;
  exhaust?: string;
  windshield?: string;
};

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<Tab>("feed");

  const [profile, setProfile] = useState<UserProfile | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);

  const [meetups, setMeetups] = useState<Meetup[]>([]);

  const [bike, setBike] = useState<Bike | null>(null);

  const [loading, setLoading] = useState(true);

  const [scrollEnabled, setScrollEnabled] = useState(true);

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

      const profileResponse = await fetch(`${API_URL}/Users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const postsResponse = await fetch(`${API_URL}/Posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const meetupsResponse = await fetch(`${API_URL}/Meetups`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const bikeResponse = await fetch(`${API_URL}/Bikes/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!profileResponse.ok || !postsResponse.ok || !meetupsResponse.ok) {
        console.log("Could not load profile");
        return;
      }

      const profileData = await profileResponse.json();

      const postsData: Post[] = await postsResponse.json();

      const meetupsData: Meetup[] = await meetupsResponse.json();

      setProfile(profileData);

      setPosts(postsData.filter((post) => post.userId === profileData.userId));

      setMeetups(
        meetupsData.filter((meetup) => meetup.userId === profileData.userId),
      );

      if (bikeResponse.ok) {
        const bikeData: Bike = await bikeResponse.json();

        setBike(bikeData);
      } else if (bikeResponse.status === 404) {
        setBike(null);
      }
    } catch (error) {
      console.log("PROFILE ERROR:", error);
    } finally {
      setLoading(false);
    }
  }

  function openPost(postId: string) {
    router.push(`/post-details?postId=${postId}` as any);
  }

  function openMeetup(meetupId: string) {
    router.push(`/meetup-details?meetupId=${meetupId}` as any);
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#39FF14" />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.emptyText}>Could not load profile.</Text>
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 22,
          }}
        >
          <View style={{ width: 40 }} />

          <Text style={styles.title}>Profile</Text>

          <TouchableOpacity
            onPress={() => router.push("/settings" as any)}
            style={{
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="settings-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {profile.photo ? (
          <Image
            source={{
              uri: profile.photo,
            }}
            style={styles.profilePhoto}
          />
        ) : (
          <View style={styles.profileImage}>
            <Ionicons name="person" size={38} color="#FFFFFF" />
          </View>
        )}

        <Text style={styles.username}>@{profile.username}</Text>

        {profile.bio ? <Text style={styles.bio}>{profile.bio}</Text> : null}

        <View style={styles.statsContainer}>
          <TouchableOpacity
            style={styles.statItem}
            onPress={() =>
              router.push(`/followers?userId=${profile.userId}` as any)
            }
          >
            <Text style={styles.statNumber}>{profile.followersCount}</Text>

            <Text style={styles.statLabel}>Followers</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.statItem}
            onPress={() =>
              router.push(`/following?userId=${profile.userId}` as any)
            }
          >
            <Text style={styles.statNumber}>{profile.followingCount}</Text>

            <Text style={styles.statLabel}>Following</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => router.push("/edit-profile")}
        >
          <Ionicons name="create-outline" size={16} color="#39FF14" />

          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>

        <View style={styles.sectionHeader}>
          <View style={styles.sectionLine} />

          <Text style={styles.sectionTitle}>My Bike</Text>

          <View style={styles.sectionLine} />
        </View>

        {bike ? (
          <View style={styles.bikeCard}>
            <Bike3DViewer
              modelUrl={bike.modelUrl}
              onTouchStart={() => setScrollEnabled(false)}
              onTouchEnd={() => setScrollEnabled(true)}
            />

            <Text style={styles.bikeName}>
              {bike.brand} {bike.model}
            </Text>

            <Text style={styles.bikeYear}>{bike.year}</Text>

            {bike.nickname ? (
              <Text style={styles.bikeNickname}>{bike.nickname}</Text>
            ) : null}

            <TouchableOpacity
              style={styles.viewGarageButton}
              onPress={() => router.push("/garage")}
            >
              <Text style={styles.viewGarageText}>VIEW GARAGE</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.bikeCard}
            onPress={() => router.push("/garage")}
          >
            <Ionicons name="bicycle-outline" size={32} color="#666666" />

            <Text style={styles.bikePlaceholderText}>No bike added yet</Text>
          </TouchableOpacity>
        )}

        <View style={styles.contentSection}>
          <View style={styles.divider} />

          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === "feed" && styles.activeTabButton,
              ]}
              onPress={() => setActiveTab("feed")}
            >
              <Ionicons
                name="grid-outline"
                size={18}
                color={activeTab === "feed" ? "#39FF14" : "#888888"}
              />

              <Text
                style={[
                  styles.tabText,
                  activeTab === "feed" && styles.activeTabText,
                ]}
              >
                Feed
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === "meetups" && styles.activeTabButton,
              ]}
              onPress={() => setActiveTab("meetups")}
            >
              <Ionicons
                name="people-outline"
                size={18}
                color={activeTab === "meetups" ? "#39FF14" : "#888888"}
              />

              <Text
                style={[
                  styles.tabText,
                  activeTab === "meetups" && styles.activeTabText,
                ]}
              >
                Meetups
              </Text>
            </TouchableOpacity>
          </View>

          {activeTab === "feed" && (
            <View style={styles.listContainer}>
              {posts.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <Ionicons name="images-outline" size={30} color="#555555" />

                  <Text style={styles.emptyText}>No posts yet</Text>
                </View>
              ) : (
                posts.map((post) => (
                  <TouchableOpacity
                    key={post.postId}
                    style={styles.postCard}
                    onPress={() => openPost(post.postId)}
                  >
                    <Text style={styles.postText}>{post.about}</Text>

                    {post.description && (
                      <Text style={styles.postDescription}>
                        {post.description}
                      </Text>
                    )}

                    {post.imageUrl && (
                      <Image
                        source={{
                          uri: post.imageUrl,
                        }}
                        style={styles.postImage}
                      />
                    )}

                    {post.address && (
                      <View style={styles.detailRow}>
                        <Ionicons
                          name="location-outline"
                          size={15}
                          color="#39FF14"
                        />

                        <Text style={styles.detailText}>{post.address}</Text>
                      </View>
                    )}

                    <View style={styles.actionsRow}>
                      <View style={styles.actionItem}>
                        <Ionicons
                          name="heart-outline"
                          size={18}
                          color="#AAAAAA"
                        />

                        <Text style={styles.actionText}>{post.postLikes}</Text>
                      </View>

                      {post.allowComments && (
                        <View style={styles.actionItem}>
                          <Ionicons
                            name="chatbubble-outline"
                            size={17}
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
          )}

          {activeTab === "meetups" && (
            <View style={styles.listContainer}>
              {meetups.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <Ionicons name="calendar-outline" size={30} color="#555555" />

                  <Text style={styles.emptyText}>No meetups yet</Text>
                </View>
              ) : (
                meetups.map((meetup) => (
                  <TouchableOpacity
                    key={meetup.meetupId}
                    style={styles.meetupCard}
                    onPress={() => openMeetup(meetup.meetupId)}
                  >
                    {meetup.coverImage && (
                      <Image
                        source={{
                          uri: meetup.coverImage,
                        }}
                        style={styles.meetupImage}
                      />
                    )}

                    <View style={styles.meetupHeader}>
                      <Text style={styles.meetupTitle}>{meetup.title}</Text>

                      <Text style={styles.meetupStatus}>{meetup.status}</Text>
                    </View>

                    <Text style={styles.meetupAbout}>{meetup.about}</Text>

                    <View style={styles.detailRow}>
                      <Ionicons
                        name="location-outline"
                        size={15}
                        color="#39FF14"
                      />

                      <Text style={styles.detailText}>{meetup.address}</Text>
                    </View>

                    <View style={styles.detailRow}>
                      <Ionicons
                        name="calendar-outline"
                        size={15}
                        color="#AAAAAA"
                      />

                      <Text style={styles.detailText}>
                        {new Date(meetup.date).toLocaleDateString()}
                      </Text>
                    </View>

                    <View style={styles.actionsRow}>
                      <View style={styles.actionItem}>
                        <Ionicons
                          name="heart-outline"
                          size={18}
                          color="#AAAAAA"
                        />

                        <Text style={styles.actionText}>
                          {meetup.meetupLikes}
                        </Text>
                      </View>

                      {meetup.allowComments && (
                        <View style={styles.actionItem}>
                          <Ionicons
                            name="chatbubble-outline"
                            size={17}
                            color="#AAAAAA"
                          />

                          <Text style={styles.actionText}>
                            {meetup.meetupComments}
                          </Text>
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                ))
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
