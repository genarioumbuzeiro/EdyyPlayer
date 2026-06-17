const CACHE = 'eddyplayer-v1';
const URLS = ['index.html','manifest.json','icon-192.png','icon-512.png','https://cdn.jsdelivr.net/npm/hls.js@1.5.17','https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(URLS)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(clients.claim().then(() => caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))))); });
self.addEventListener('fetch', e => { e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).catch(() => new Response('Offline', {status:503})))); });
