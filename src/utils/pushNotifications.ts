import { Platform } from 'react-native';

// Push-style notification helper (mock/demo setup, no backend push server).
// Uses the browser's native Notification API via a Service Worker so that
// notifications appear as real OS-level alerts with an actionable button,
// and are still delivered while the tab is backgrounded/minimized.
//
// This only runs on web (Platform.OS === 'web'). A native build would need
// expo-notifications + push tokens + a backend to send real device push
// notifications, which is out of scope for this mock.

export async function registerServiceWorker(): Promise<void> {
  if (Platform.OS !== 'web') return;
  if (!('serviceWorker' in navigator)) return;
  try {
    await navigator.serviceWorker.register('/sw.js');
  } catch (err) {
    console.error('Service worker registration failed:', err);
  }
}

export function requestNotificationPermission(): void {
  if (Platform.OS !== 'web') return;
  if (!('Notification' in window)) return;
  if (Notification.permission === 'default') {
    Notification.requestPermission();
  }
}

export function isPushNotificationSupported(): boolean {
  return Platform.OS === 'web' && 'Notification' in window && 'serviceWorker' in navigator;
}

interface PushNotificationOptions {
  title: string;
  body: string;
  productId: string;
  actionLabel?: string;
}

export async function showPushNotification({
  title,
  body,
  productId,
  actionLabel = 'Update Stock',
}: PushNotificationOptions): Promise<void> {
  if (!isPushNotificationSupported()) return;
  if (Notification.permission !== 'granted') return;

  const registration = await navigator.serviceWorker.ready;
  await registration.showNotification(title, {
    body,
    tag: `product-${productId}`,
    data: { productId },
    actions: [{ action: 'update-stock', title: actionLabel }],
  } as NotificationOptions);
}
