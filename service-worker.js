const CACHE_NAME = 'bytecraft-cache-v1';

// Lista de archivos esenciales para que la aplicación funcione sin conexión.
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  // Si usas un CDN de Tailwind o Google Fonts, también deben cachearse
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap',
  // Rutas de iconos (Asegúrate de que la carpeta 'icons' y los archivos existan)
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Evento de Instalación: Cacha los archivos esenciales.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// Evento de Activación: Limpia cachés antiguas (si cambias la versión de caché).
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Evento de Fetch: Estrategia "Cache First, then Network" para recursos estáticos.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});