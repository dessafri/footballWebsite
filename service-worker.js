const CACHE_NAME = "BolaKu-v1";
var urlsToCache = [
    "/",
    "/index.html",
    "/nav.html",
    "pages/home.html",
    "pages/contact.html",
    "pages/about.html",
    "/detail.html",
    "pages/myfavorite.html",
    "/team.html",
    "js/nav.js",
    "js/api.js",
    "js/materialize.min.js",
    "js/bolaku_db.js",
    "js/idb/lib/idb.js",
    "js/listLeague.js",
    "js/detailLeague.js",
    "js/team.js",
    "js/favoriteTeams.js",
    "js/cek_sw.js",
    "css/materialize.min.css",
    "css/style.css",
    "favicon-32x32.png",
    "logo.png",
    "logo72.png",
    "logo96.png",
    "logo128.png",
    "logo144.png",
    "logo192.png",
    "logo256.png",
    "logo384.png",
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
    "/manifest.json"
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function (event) {
    var url = "https://api.football-data.org/v2/";

    if (event.request.url.indexOf(url) > -1) {
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

self.addEventListener('push', function (event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: 'img/2002.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});
self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    if (!event.action) {
        // Penguna menyentuh area notifikasi diluar action
        console.log('Notification Clicked.');
        return;
    }
    switch (event.action) {
        case 'yes-action':
            clients.openWindow('/#myfavorite');
            break;
        case 'no-action':
            break;
        default:
            console.log(`Action yang dipilih tidak dikenal: '${event.action}'`);
            break;
    }
});