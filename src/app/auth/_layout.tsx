import { Stack } from 'expo-router';
import { useApp } from '../../context/AppContext';

export default function AuthLayout() {
  const { isLoggedIn } = useApp();

  if (isLoggedIn) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="otp" />
    </Stack>
  );
}
