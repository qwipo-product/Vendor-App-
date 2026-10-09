import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useApp } from '../context/AppContext';

export default function IndexScreen() {
  const router = useRouter();
  const { isLoggedIn } = useApp();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/(tabs)/orders');
    } else {
      router.replace('/auth/login');
    }
  }, [isLoggedIn, router]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Loading...</Text>
    </View>
  );
}
