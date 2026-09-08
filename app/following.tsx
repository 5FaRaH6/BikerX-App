import { useLocalSearchParams } from 'expo-router';

import FollowListScreen from '../screens/FollowListScreen';

export default function FollowingPage() {
  const { userId } =
    useLocalSearchParams<{
      userId: string;
    }>();

  return (
    <FollowListScreen
      userId={userId}
      type="following"
    />
  );
}