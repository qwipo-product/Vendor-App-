// Push-style notification helper (mock/demo setup, no backend push server).
// Uses the browser's native Notification API via a Service Worker so that
// notifications appear as real OS-level alerts with an actionable button,
// and are still delivered while the tab is backgrounded/minimized.

export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (!('serviceWorker' in navigator)) return null;
  try {
    return await navigator.serviceWorker.register('/sw.js');
  } catch (err) {
    console.error('Service worker registration failed:', err);
    return null;
  }
}

export function requestNotificationPermission(): void {
  if (!('Notification' in window)) return;
  if (Notification.permission === 'default') {
    Notification.requestPermission();
  }
}

export function isPushNotificationSupported(): boolean {
  return 'Notification' in window && 'serviceWorker' in navigator;
}

interface PushNotificationOptions {
  title: string;
  body: string;
  path: string;
  tag: string;
  actionLabel?: string;
}

export async function showPushNotification({
  title,
  body,
  path,
  tag,
  actionLabel = 'Update Stock',
}: PushNotificationOptions): Promise<void> {
  if (!isPushNotificationSupported()) return;
  if (Notification.permission !== 'granted') return;

  const registration = await navigator.serviceWorker.ready;
  await registration.showNotification(title, {
    body,
    tag,
    data: { path },
    actions: [{ action: 'update-stock', title: actionLabel }],
  } as NotificationOptions);
}
