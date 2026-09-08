import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {ActivityIndicator,Animated,Image,Modal,NativeScrollEvent,NativeSyntheticEvent,Text,TextInput,TouchableOpacity,View}from 'react-native';

import { API_URL } from '../services/api';
import { getToken, logout } from '../services/authSession';
import { styles } from '../styles/HomeStyle';

type Post = {
  postId: string;
  userId: string;
  username: string;
  userPhoto?: string;
  createdAt: string;
  imageUrl?: string;
  about: string;
  description?: string;
  address?: string;
  allowComments: boolean;
  postLikes: number;
  postComments: number;
  isLiked: boolean;
};

type Meetup = {
  meetupId: string;
  userId: string;
  username: string;
  userPhoto?: string;
  title: string;
  about: string;
  coverImage?: string;
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
  status: string;
};

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<'feed' | 'meetups'>('feed');
  const [posts, setPosts] = useState<Post[]>([]);
  const [meetups, setMeetups] = useState<Meetup[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [createOpen, setCreateOpen] = useState(false);

  const headerY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  const headerHidden = useRef(false);

  useEffect(() => {
    loadHome();
  }, []);

  // load home data
  async function loadHome() {
    setError('');
    setLoading(true);

    try {
      const token = await getToken();

      if (!token) {
        router.replace('/login');
        return;
      }

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

      if (
        postsResponse.status === 401 ||
        meetupsResponse.status === 401
      ) {
        await logout();
        router.replace('/login');
        return;
      }

      const postsData = await postsResponse.json();
      const meetupsData = await meetupsResponse.json();

      if (!postsResponse.ok || !meetupsResponse.ok) {
        setError('Could not load home.');
        return;
      }

      setPosts(postsData);
      setMeetups(meetupsData);
    }
    catch (error) {
      console.log(error);
      setError('Could not connect to the server.');
    }
    finally {
      setLoading(false);
    }
  }

  // hide header
  function hideHeader() {
    if (headerHidden.current) return;

    headerHidden.current = true;

    Animated.timing(headerY, {
      toValue: -175,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }

  // show header
  function showHeader() {
    if (!headerHidden.current) return;

    headerHidden.current = false;

    Animated.timing(headerY, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }

  // handle scroll
  function handleScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const currentY = event.nativeEvent.contentOffset.y;

    if (
      currentY > lastScrollY.current + 8 &&
      currentY > 40
    ) {
      hideHeader();
    }

    if (currentY < lastScrollY.current - 8) {
      showHeader();
    }

    if (currentY <= 0) {
      showHeader();
    }

    lastScrollY.current = currentY;
  }

// open post
function openPost(postId: string) {
  router.push(`/post-details?postId=${postId}` as any);
}

// open meetup
function openMeetup(meetupId: string) {
  router.push(`/meetup-details?meetupId=${meetupId}` as any);
}

  // change post like
  async function changePostLike(post: Post) {
    try {
      const token = await getToken();

      if (!token) return;

      const response = await fetch(
        `${API_URL}/Posts/${post.postId}/like`,
        {
          method: post.isLiked ? 'DELETE' : 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) return;

      setPosts(
        posts.map(item =>
          item.postId === post.postId
            ? {
                ...item,
                isLiked: !item.isLiked,
                postLikes: item.isLiked
                  ? item.postLikes - 1
                  : item.postLikes + 1,
              }
            : item
        )
      );
    }
    catch (error) {
      console.log(error);
    }
  }

  // change meetup like
  async function changeMeetupLike(meetup: Meetup) {
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

      setMeetups(
        meetups.map(item =>
          item.meetupId === meetup.meetupId
            ? {
                ...item,
                isLiked: !item.isLiked,
                meetupLikes: item.isLiked
                  ? item.meetupLikes - 1
                  : item.meetupLikes + 1,
              }
            : item
        )
      );
    }
    catch (error) {
      console.log(error);
    }
  }

  // join or leave meetup
  async function changeJoin(meetup: Meetup) {
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

      if (!response.ok) return;

      setMeetups(
        meetups.map(item =>
          item.meetupId === meetup.meetupId
            ? {
                ...item,
                isJoined: !item.isJoined,
                meetupParticipants: item.isJoined
                  ? item.meetupParticipants - 1
                  : item.meetupParticipants + 1,
              }
            : item
        )
      );
    }
    catch (error) {
      console.log(error);
    }
  }

  const filteredPosts = posts.filter(post => {
    const value = search.toLowerCase();

    return (
      post.username?.toLowerCase().includes(value) ||
      post.about?.toLowerCase().includes(value) ||
      post.description?.toLowerCase().includes(value) ||
      post.address?.toLowerCase().includes(value)
    );
  });

  const filteredMeetups = meetups.filter(meetup => {
    const value = search.toLowerCase();

    return (
      meetup.title?.toLowerCase().includes(value) ||
      meetup.about?.toLowerCase().includes(value) ||
      meetup.address?.toLowerCase().includes(value)
    );
  });

  // render post
  function renderPost({ item }: { item: Post }) {
    return (
      <View style={styles.card}>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => openPost(item.postId)}
        >
          <View style={styles.userRow}>
            {item.userPhoto ? (
              <Image
                source={{ uri: item.userPhoto }}
                style={styles.userPhoto}
              />
            ) : (
              <View style={styles.defaultPhoto}>
                <Text style={styles.defaultPhotoText}>
                  {item.username?.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}

            <View>
              <Text style={styles.username}>
                @{item.username}
              </Text>

              <Text style={styles.smallText}>
                {new Date(item.createdAt).toLocaleDateString()}
              </Text>
            </View>
          </View>

          <Text style={styles.cardTitle}>
            {item.about}
          </Text>

          {item.description && (
            <Text style={styles.description}>
              {item.description}
            </Text>
          )}

          {item.imageUrl && (
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.postImage}
            />
          )}

          {item.address && (
            <View style={styles.locationRow}>
              <Ionicons
                name="location-outline"
                size={17}
                color="#39FF14"
              />

              <Text style={styles.location}>
                {item.address}
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.action}
            onPress={() => changePostLike(item)}
          >
            <Ionicons
              name={item.isLiked ? 'heart' : 'heart-outline'}
              size={22}
              color={item.isLiked ? '#39FF14' : '#AAAAAA'}
            />

            <Text style={styles.actionText}>
              {item.postLikes}
            </Text>
          </TouchableOpacity>

          {item.allowComments && (
            <View style={styles.action}>
              <Ionicons
                name="chatbubble-outline"
                size={20}
                color="#AAAAAA"
              />

              <Text style={styles.actionText}>
                {item.postComments}
              </Text>
            </View>
          )}
        </View>

      </View>
    );
  }

  // render meetup
  function renderMeetup({ item }: { item: Meetup }) {
    return (
      <View style={styles.card}>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => openMeetup(item.meetupId)}
        >
          {item.coverImage && (
            <Image
              source={{ uri: item.coverImage }}
              style={styles.meetupImage}
            />
          )}

          <Text style={styles.cardTitle}>
            {item.title}
          </Text>

          <Text style={styles.description}>
            {item.about}
          </Text>

          <View style={styles.locationRow}>
            <Ionicons
              name="location-outline"
              size={17}
              color="#39FF14"
            />

            <Text style={styles.location}>
              {item.address}
            </Text>
          </View>

          <View style={styles.meetupRow}>
            <Ionicons
              name="calendar-outline"
              size={17}
              color="#AAAAAA"
            />

            <Text style={styles.meetupInfo}>
              {new Date(item.date).toLocaleDateString()}
            </Text>
          </View>

          <View style={styles.meetupRow}>
            <Ionicons
              name="people-outline"
              size={18}
              color="#AAAAAA"
            />

            <Text style={styles.meetupInfo}>
              {item.meetupParticipants} / {item.maxRiders}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.action}
            onPress={() => changeMeetupLike(item)}
          >
            <Ionicons
              name={item.isLiked ? 'heart' : 'heart-outline'}
              size={22}
              color={item.isLiked ? '#39FF14' : '#AAAAAA'}
            />

            <Text style={styles.actionText}>
              {item.meetupLikes}
            </Text>
          </TouchableOpacity>

          {item.allowComments && (
            <View style={styles.action}>
              <Ionicons
                name="chatbubble-outline"
                size={20}
                color="#AAAAAA"
              />

              <Text style={styles.actionText}>
                {item.meetupComments}
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={[
              styles.joinButton,
              item.isJoined && styles.joinedButton,
            ]}
            onPress={() => changeJoin(item)}
          >
            <Text
              style={[
                styles.joinText,
                item.isJoined && styles.joinedText,
              ]}
            >
              {item.isJoined ? 'Joined' : 'Join'}
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    );
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

      <Animated.View
        style={[
          styles.header,
          {
            transform: [{ translateY: headerY }],
          },
        ]}
      >
        <View style={styles.topRow}>
          <Text style={styles.logo}>
            Biker<Text style={styles.logoGreen}>X</Text>
          </Text>

          <TouchableOpacity>
            <Ionicons
              name="notifications-outline"
              size={25}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={19}
            color="#777777"
          />

          <TextInput
            style={styles.search}
            placeholder={
              activeTab === 'feed'
                ? 'Search posts or bikers...'
                : 'Search meetups...'
            }
            placeholderTextColor="#777777"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <View style={styles.tabs}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'feed' && styles.activeTab,
            ]}
            onPress={() => {
              setActiveTab('feed');
              setSearch('');
            }}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'feed' && styles.activeTabText,
              ]}
            >
              Feed
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'meetups' && styles.activeTab,
            ]}
            onPress={() => {
              setActiveTab('meetups');
              setSearch('');
            }}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'meetups' && styles.activeTabText,
              ]}
            >
              Meetups
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {error !== '' && (
        <Text style={styles.error}>
          {error}
        </Text>
      )}

      {activeTab === 'feed' ? (
        <Animated.FlatList
          data={filteredPosts}
          renderItem={renderPost}
          keyExtractor={item => item.postId}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          onRefresh={loadHome}
          refreshing={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No posts yet.
            </Text>
          }
        />
      ) : (
        <Animated.FlatList
          data={filteredMeetups}
          renderItem={renderMeetup}
          keyExtractor={item => item.meetupId}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          onRefresh={loadHome}
          refreshing={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No meetups yet.
            </Text>
          }
        />
      )}

      <View style={styles.bottomNav}>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons
            name="home"
            size={23}
            color="#39FF14"
          />

          <Text style={styles.navActiveText}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/ride-mode')}
        >
          <Ionicons
            name="navigate-outline"
            size={23}
            color="#777777"
          />

          <Text style={styles.navText}>
            Ride
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setCreateOpen(true)}
        >
          <Ionicons
            name="add"
            size={31}
            color="#050505"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/garage')}
        >
          <Ionicons
            name="construct-outline"
            size={23}
            color="#777777"
          />

          <Text style={styles.navText}>
            Garage
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/profile')}
        >
          <Ionicons
            name="person-outline"
            size={23}
            color="#777777"
          />

          <Text style={styles.navText}>
            Profile
          </Text>
        </TouchableOpacity>

      </View>

      <Modal
        visible={createOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setCreateOpen(false)}
      >
        <View style={styles.createModalBackground}>

          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setCreateOpen(false)}
          />

          <View style={styles.createModal}>

            <View style={styles.modalLine} />

            <Text style={styles.createTitle}>
              Create
            </Text>

            <TouchableOpacity
              style={styles.createOption}
              onPress={() => {
                setCreateOpen(false);
                router.push('/create-post');
              }}
            >
              <View style={styles.createIcon}>
                <Ionicons
                  name="image-outline"
                  size={24}
                  color="#39FF14"
                />
              </View>

              <View>
                <Text style={styles.createOptionTitle}>
                  Create Post
                </Text>

                <Text style={styles.createOptionText}>
                  Share a photo or update
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.createOption}
              onPress={() => {
                setCreateOpen(false);
                router.push('../create-meetup');
              }}
            >
              <View style={styles.createIcon}>
                <Ionicons
                  name="people-outline"
                  size={24}
                  color="#39FF14"
                />
              </View>

              <View>
                <Text style={styles.createOptionTitle}>
                  Create Meetup
                </Text>

                <Text style={styles.createOptionText}>
                  Plan a ride with other bikers
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelCreate}
              onPress={() => setCreateOpen(false)}
            >
              <Text style={styles.cancelCreateText}>
                Cancel
              </Text>
            </TouchableOpacity>

          </View>

        </View>
      </Modal>

    </View>
  );
}