// Minimal runtime-caching service worker so the calculator is installable and works offline.
// Network-first (always fresh when online) with a cache fallback for offline use. The app is
// stateless, so activating a new worker immediately (skipWaiting + claim) is safe here.
const CACHE = 'riichi-calc-v1';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

self.addEventListener('fetch', event => {
    const req = event.request;
    if (req.method !== 'GET') return;
    event.respondWith(
        fetch(req)
            .then(resp => {
                const copy = resp.clone();
                caches.open(CACHE).then(c => c.put(req, copy)).catch(() => { });
                return resp;
            })
            .catch(() => caches.match(req).then(r => r || caches.match('index.html')))
    );
});
