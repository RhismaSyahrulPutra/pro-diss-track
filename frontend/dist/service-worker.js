const CACHE_NAME = 'pdt-cache-v1';
const ASSETS_TO_CACHE = [
  '/pro-diss-track/',
  '/pro-diss-track/index.html',
  '/pro-diss-track/icons/icon-pdt-192x192.png',
  '/pro-diss-track/icons/icon-pdt-512x512.png',
  '/pro-diss-track/manifest.webmanifest',
  '/pro-diss-track/vite.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }),
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name)),
      );
    }),
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    }),
  );
});
