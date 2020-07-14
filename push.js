var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BAREz08RJfDjPXIENaHEAj6mERq3oZNb1fVX6pEpbFgeUN9mDzxE2VGVpj-uZsXmuD93weVccnVxeerj1Qat_6Y",
    "privateKey": "wxF6QoOmbkaeySaQu3hR0B5F__MalyE7mgfd45Th0r4"
};


webPush.setVapidDetails(
    'mailto:safrides@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://sg2p.notify.windows.com/w/?token=BQYAAADJ%2bMm9HZY5hPjDXDI2f%2fVxD4DSItQemCvMdEgSR%2foxiO%2fdW7jgBQLshfMq7pi5kR7pKQHB%2fSEha69QSfPyEMv6a5Ule4SvGIWeAXVF7tVQjG72UeGtUtlJqOpN8a88C6lSHGKZBaAVhFGJXYYSFtQSd6gowsabZksx8n7gU2B2heoSYTnr4K%2bCDNGJQkTaSgt9q1oJPghnH9Rzt%2fAc9e04SEpH1nUA1X1JvRphtGRhoK%2fGTzH3Qsr0SBDzO3WLrnh%2bFw4RzudyQQDTteYf6%2ffuK%2bp5IUfzxt0MtbnCdGtB9%2bUQnEcy%2fR9idGb6IvoX10x6%2fjfqx%2fQ%2b4hbfuMeWdt%2ft",
    "keys": {
        "p256dh": "BKA3wT0Mb/opG7K+ghp4qjI+lOtbJFfvVfdaErLvxmfxtMfhku5kCVDuk/Dd2eZzYtjar3jOKVJTsd/VWp0twmw=",
        "auth": "gWfNn5actGVBZwPys0CJqw=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '485317730676',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);