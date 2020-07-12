const CACHE_NAME = "BolaKu-v1";
var urlsToCache = [
    "/",
    "/index.html",
    "/nav.html",
    "pages/home.html",
    "pages/contact.html",
    "pages/about.html",
    "/detail.html",
    "js/nav.js",
    "js/api.js",
    "js/materialize.min.js",
    "js/bolaku_db.js",
    "js/idb/lib/idb.js",
    "js/listLeague.js",
    "js/detailLeague.js",
    "css/materialize.min.css",
    "css/style.css",
    "css/style.scss",
    "css/style.css.map",
    "favicon-32x32.png",
    "logo.png",
    "profile.jpeg",
    "img/2002.png",
    "img/2003.png",
    "img/2014.png",
    "img/2015.png",
    "img/2019.png",
    "img/2021.png",
    "img/fb.png",
    "img/gmail.png",
    "img/linkedin.png",
    "img/github.webp",
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function (event) {
    var base_url = "https://api.football-data.org/v2/";

    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function (cache) {
                return fetch(event.request).then(function (response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, {
                ignoreSearch: true
            }).then(function (response) {
                return response || fetch(event.request);
            })
        )
    }
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});