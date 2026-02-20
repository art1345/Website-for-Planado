// Change this to your repository name when deploying to GitHub Pages.
// For local/dev or root deployment, keep it as empty string.
var GHPATH = '';

// Choose a unique app prefix
var APP_PREFIX = 'planado_';

// The version of the cache - update this when you change files
var VERSION = 'version_02';

// The files to make available for offline use
var URLS = [
  `${GHPATH}/`,
  `${GHPATH}/index.html`,
  `${GHPATH}/friends.html`,
  `${GHPATH}/gallery.html`,
  `${GHPATH}/search.html`,
  `${GHPATH}/notifications.html`,
  `${GHPATH}/messages.html`,
  `${GHPATH}/settings.html`,
  `${GHPATH}/login.html`,
  `${GHPATH}/signup.html`,
  `${GHPATH}/style.css`,
  `${GHPATH}/script.js`,
  `${GHPATH}/auth.js`,
  `${GHPATH}/sidebar-pages.js`,
  `${GHPATH}/sections/friends.js`,
  `${GHPATH}/sections/gallery.js`,
  `${GHPATH}/sections/messages.js`,
  `${GHPATH}/sections/notifications.js`,
  `${GHPATH}/sections/search.js`,
  `${GHPATH}/sections/settings.js`,
  `${GHPATH}/manifest.webmanifest`
];

// Service worker installation
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(APP_PREFIX + VERSION).then(function(cache) {
      return cache.addAll(URLS);
    })
  );
});

// Serve cached content when offline
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});

// Clean up old caches when new version is installed
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keyList) {
      var cacheWhitelist = [APP_PREFIX + VERSION];
      return Promise.all(
        keyList.map(function(key) {
          if (cacheWhitelist.indexOf(key) === -1) {
            return caches.delete(key);
          }
          return null;
        })
      );
    })
  );
});
