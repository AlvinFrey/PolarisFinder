
const cacheName = 'polaris-finder-cache';

const filesToCache = [
    '/',
    '/bundle.js',
    '/index.html',
    '/css/main.css',
    '/img/new-logo-te.jpeg'
];

self.addEventListener('activate', e => self.clients.claim());

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheName)
            .then(cache => cache.addAll(filesToCache))
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
            .then(response => response ? response : fetch(e.request))
    )
});
