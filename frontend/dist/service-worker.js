const CACHE_NAME = 'pdt-cache-v1';
const ASSETS_TO_CACHE = [
  '/pro-diss-track/',
  '/pro-diss-track/index.html',
  '/pro-diss-track/icons/icon-pdt-192x192.png',
  '/pro-diss-track/icons/icon-pdt-512x512.png',
  '/pro-diss-track/manifest.webmanifest',
  '/pro-diss-track/vite.svg',
  // tambahkan file CSS/JS dari build jika perlu
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE)),
  );
});

self.addEventListener('activate', (event) => {
  self.clients.claim();
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)),
        ),
      ),
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).catch(() => {
          if (event.request.destination === 'document') {
            return caches.match('/pro-diss-track/index.html');
          }
        })
      );
    }),
  );
});
