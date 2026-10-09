import { Stack } from 'expo-router';
import { AppProvider } from '../context/AppContext';
import { NotificationProvider } from '../context/NotificationContext';
import NotificationToast from '../components/NotificationToast';

export default function RootLayout() {
  return (
    <NotificationProvider>
      <AppProvider>
        <NotificationToast />
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </AppProvider>
    </NotificationProvider>
  );
}
