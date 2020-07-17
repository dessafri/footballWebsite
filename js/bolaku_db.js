let dbPromised = idb.open("BolaKu", 2, function (upgradeDb) {
    let favTeams = upgradeDb.createObjectStore("favTeams", {
        keyPath: "id"
    });
    favTeams.createIndex("name", "name", {
        unique: false
    });
    let standingOS = upgradeDb.createObjectStore("standings", {
        keyPath: "competition.id"
    });
    standingOS.createIndex("competition.name", "competition.name", {
        unique: false
    });
});


function saveStandings(data) {
    dbPromised.then(function (db) {
        let tx = db.transaction("standings", "readwrite");
        let store = tx.objectStore("standings")
        store.put(data)
        return tx.complete;
    })
}

function getStandings() {
    return new Promise(function (resolve, reject) {
        dbPromised.then(function (db) {
            var tx = db.transaction('standings', 'readonly');
            var store = tx.objectStore('standings');
            return store.getAll();
        }).then(function (items) {
            resolve(items)

        })
    });
}

function saveFavTeam(data) {
    dbPromised.then(function (db) {
            let tx = db.transaction("favTeams", "readwrite");
            let store = tx.objectStore("favTeams")
            store.put(data)
            return tx.complete;
        })
        .then(function () {
            const title = "Data Team Berhasil disimpan!";
            console.log(title);
            const options = {
                body: `Club ${data.name} sudah tersimpan, cek Team Favorite.`,
                badge: "../favicon-32x32.png",
                icon: "../favicon-32x32.png",
                actions: [{
                        action: "yes-action",
                        title: "Ya"
                    },
                    {
                        action: "no-action",
                        title: "Tidak"
                    },
                ],
            };
            if (Notification.permission === "granted") {
                navigator.serviceWorker.ready.then(function (registration) {
                    registration.showNotification(title, options);
                });
            } else {
                M.toast({
                    html: `Club ${data.name} berhasil disimpan, cek Team Favorite.`,
                });
            }
        })
}

function getFavTeams() {
    return new Promise(function (resolve, reject) {
        dbPromised.then(function (db) {
            let tx = db.transaction("favTeams", "readonly");
            let store = tx.objectStore("favTeams")
            return store.getAll();
        }).then(function (items) {
            resolve(items)

        })
    });
}

function deleteFavTeams(idTeam, nameTeam) {
    dbPromised
        .then(function (db) {
            let tx = db.transaction("favTeams", "readwrite");
            let store = tx.objectStore("favTeams");
            store.delete(idTeam);
            return tx.complete;
        })
        .then(() => {
            const title = 'Data Team Berhasil Di Hapus !';
            const options = {
                'body': `${nameTeam} berhasil dihapus dari list Favorite.`,
                badge: "../favicon-32x32.png",
                icon: "../favicon-32x32.png"
            };
            if (Notification.permission === 'granted') {
                navigator.serviceWorker.ready.then(function (registration) {
                    registration.showNotification(title, options);
                });
            } else {
                M.toast({
                    html: `${nameTeam} berhasil dihapus dari list Favorite`,
                });
            }
        })
}