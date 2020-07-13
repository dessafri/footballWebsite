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
        .then(() => {
            console.log("Data Berhasil Di simpan")
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
        .then(() => {
            console.log("Team Berhasil Di simpan")
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