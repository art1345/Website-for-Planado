// sw.js - Service Worker (simplified example)
var CACHE_NAME = 'planado-cache-v1';
var urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/sidebar-pages.js',
  '/friends.html',
  '/gallery.html',
  '/search.html',
  '/notifications.html',
  '/messages.html',
  '/settings.html'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});
