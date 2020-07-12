let dbPromised = idb.open("BolaKu", 2, function (upgradeDb) {
    // let teams = upgradeDb.createObjectStore("teams", {
    //     keyPath: "standings[0].table.team.id"
    // });
    // teams.createIndex("standings[0].table.team.name", "standings[0].table.team.name", {
    //     unique: false
    // });
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

function saveTeams(data) {
    dbPromised.then(function (db) {
            let tx = db.transaction("teams", "readwrite");
            let store = tx.objectStore("teams")
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