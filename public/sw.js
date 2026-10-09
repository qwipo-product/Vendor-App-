// Service worker for local push-style notifications.
// This is a mock/demo setup: notifications are triggered directly by the
// page's own JS (via registration.showNotification) rather than a remote
// push server, since there is no backend in this project. Functionally it
// still delivers OS-level notifications with an actionable "Update Stock"
// button, and survives the tab being backgrounded/minimized.

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const productId = event.notification.data && event.notification.data.productId;
  if (!productId) return;

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) {
          client.postMessage({ type: 'push-navigate', productId });
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(`/catalog?edit=${productId}`);
      }
    })
  );
});
