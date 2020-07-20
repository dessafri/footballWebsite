importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox)
    console.log(`Workbox berhasil dimuat`);
else
    console.log(`Workbox gagal dimuat`);

workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.precaching.precacheAndRoute([{
        url: "/index.html",
        revision: '3'
    },
    {
        url: "/nav.html",
        revision: '3'
    },
    {
        url: "/offline.html",
        revision: '3'
    },
    {
        url: "pages/home.html",
        revision: '3'
    },
    {
        url: "pages/contact.html",
        revision: '3'
    },
    {
        url: "pages/about.html",

        revision: '3'
    },
    {
        url: "/detail.html",
        revision: '3'
    },
    {
        url: "pages/myfavorite.html",
        revision: '3'
    },
    {
        url: "/team.html",

        revision: '3'
    },
    {
        url: "js/nav.js",
        revision: '3'
    },
    {
        url: "js/api.js",
        revision: '3'
    },
    {
        url: "js/materialize.min.js",
        revision: '3'
    },
    {
        url: "js/bolaku_db.js",
        revision: '3'
    },
    {
        url: "js/idb/lib/idb.js",
        revision: '3'
    },
    {
        url: "js/listLeague.js",

        revision: '3'
    },
    {
        url: "js/detailLeague.js",

        revision: '3'
    },
    {
        url: "js/team.js",

        revision: '3'
    },
    {
        url: "js/favoriteTeams.js",
        revision: '3'
    },
    {
        url: "js/cek_sw.js",

        revision: '3'
    },
    {
        url: "/css/materialize.min.css",
        revision: '3'
    },
    {
        url: "/css/style.css",
        revision: '3'
    },
    {
        url: "/favicon-32x32.png",
        revision: '3'
    },
    {
        url: "/logo/logo.png",
        revision: '3'
    },
    {
        url: "/logo/logo72.png",
        revision: '3'
    },
    {
        url: "/logo/logo96.png",
        revision: '3'
    },
    {
        url: "/logo/logo128.png",
        revision: '3'
    },
    {
        url: "/logo/logo144.png",
        revision: '3'
    },
    {
        url: "/logo/logo192.png",
        revision: '3'
    },
    {
        url: "/logo/logo256.png",
        revision: '3'
    },
    {
        url: "/logo/logo384.png",
        revision: '3'
    },
    {
        url: "/profile.jpeg",
        revision: '3'
    },
    {
        url: "/img/2002.png",
        revision: '3'
    },
    {
        url: "/img/2003.png",
        revision: '3'
    },
    {
        url: "/img/2014.png",
        revision: '3'
    },
    {
        url: "/img/2015.png",
        revision: '3'
    },
    {
        url: "/img/2019.png",
        revision: '3'
    },
    {
        url: "/img/2021.png",
        revision: '3'
    },
    {
        url: "/img/fb.png",
        revision: '3'
    },
    {
        url: "/img/gmail.png",
        revision: '3'
    },
    {
        url: "/img/linkedin.png",
        revision: '3'
    },
    {
        url: "/img/github.webp",
        revision: '3'
    },
    {
        url: "/img/offline-img.svg",
        revision: '3'
    },
    {
        url: "/manifest.json",
        revision: '3'
    },
]);

self.addEventListener("install", function (event) {
    const urls = ['/offline.html'];
    const cacheName = workbox.core.cacheNames.runtime;
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(urls);
        })
    );
});

const urls = ['/offline.html'];

// pages to cache

workbox.routing.registerRoute(new RegExp('/'),
    async ({
        event
    }) => {
        try {
            return await workbox.strategies.networkFirst({
                cacheName: 'BolaKu',
                plugins: [
                    new workbox.expiration.Plugin({
                        maxEntries: 60,
                        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
                    }),
                ],
            }).handle({
                event
            });
        } catch (error) {
            return caches.match(urls);
        }
    }
);

workbox.routing.registerRoute(
    /^https:\/\/api\.football\-data\.org\/v2\//,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'football-data-api',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 120,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
            }),
        ],
    })
);

workbox.routing.registerRoute(
    /\.(?:png|jpx|css|svg)$/,
    workbox.strategies.networkFirst({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 25,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
            }),
        ],
    })
);


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