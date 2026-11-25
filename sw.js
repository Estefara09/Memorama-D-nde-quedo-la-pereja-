const CACHE_NAME = 'memorama-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icono.svg'
];

// Instalar: guardar archivos en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => cache.addAll(urlsToCache))
  );
});

// Activar: limpiar cachés viejas (opcional)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME)
      .map(key => caches.delete(key))
    ))
  );
});

// Fetch: responder desde caché o red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
    .then(response => response || fetch(event.request))
  );
});