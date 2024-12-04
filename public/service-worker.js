// public/service-worker.js

self.addEventListener('install', (event) => {
  console.log('Service Worker installed');
  event.waitUntil(
      caches.open('my-cache').then((cache) => {
          return cache.addAll([
              '/',  // Cache homepage
              '/index.html',
              '/styles.css',
              '/scripts.js',
              '/icons/icon-192x192.png',  // Add other static files to cache
          ]);
      })
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated');
});

self.addEventListener('push', (event) => {
  const payload = event.data ? event.data.json() : {};
  const title = payload.title || 'Default Title';
  const options = {
      body: payload.body || 'Default body text',
      icon: payload.icon || '/icons/icon-192x192.png',  // Make sure this icon is available
      data: {
          url: payload.url || '/'
      }
  };

  event.waitUntil(
      self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
      clients.openWindow(event.notification.data.url || '/')
  );
});
