const CACHE_NAME = "profilepwa";

var urlsToCache = [
    "/",
    "/index.html",
    "/nav.html",
    "/manifest.json",
    "/pages/home.html",
    "/pages/about.html",
    "/pages/skills.html",
    "/pages/contact.html",
    "/css/materialize.min.css",
    "/css/style.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/img/backgrounds/header_back.jpg",
    "/img/profiles/gdk.jpg",
    "/img/profiles/wendy_profile.png",
    "/img/icons/facebook_logo.svg",
    "/img/icons/github_logo.svg",
    "/img/icons/instagram_logo.svg",
    "/img/mipmap/logo.png"
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches
            .match(event.request, { cacheName: CACHE_NAME })
            .then(function(response) {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys()
            .then(function(cacheNames) {
                return Promise.all(
                    cacheNames.map(function(cacheName) {
                        if (cacheName != CACHE_NAME) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
    );
});