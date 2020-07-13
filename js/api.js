let url = "https://api.football-data.org/v2/"
let authToken = "81e3ce7d778e4e5d9914ae02881ccf03"


function getLeague() {
    if ('caches' in window) {
        caches.match(`${url}competitions?plan=TIER_ONE&areas=2077`)
            .then(function (response) {
                if (response) {
                    response.json()
                        .then(function (data) {
                            setCompetitionData(data)
                        });
                }
            });
    }
    fetch(`${url}competitions?plan=TIER_ONE&areas=2077`, {
            headers: {
                "X-Auth-Token": "81e3ce7d778e4e5d9914ae02881ccf03"
            }
        })
        .then(response => {
            return response.json();
        })
        .then(resjson => {
            setCompetitionData(resjson)
        })
}

function getLeagueId() {
    // Ambil nilai query parameter (?id=)
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");
    if ('caches' in window) {
        caches.match(`${url}competitions/${idParam}/standings`)
            .then(function (response) {
                if (response) {
                    response.json()
                        .then(function (data) {
                            setCompetitionDataId(data)
                        });
                }
            });
    }
    if ('caches' in window) {
        caches.match(`${url}competitions/${idParam}/matches?status=SCHEDULED`)
            .then(function (response) {
                if (response) {
                    response.json()
                        .then(function (data) {
                            setCompetitionMatch(data)
                        });
                }
            });
    }
    if ('caches' in window) {
        caches.match(`${url}competitions/${idParam}/scorer`)
            .then(function (response) {
                if (response) {
                    response.json()
                        .then(function (data) {
                            setScoresCompetition(data)
                        });
                }
            });
    }
    fetch(`${url}competitions/${idParam}/matches?status=SCHEDULED`, {
            headers: {
                "X-Auth-Token": authToken
            }
        })
        .then(response => {
            return response.json();
        })
        .then(resjson => {
            setCompetitionMatch(resjson)
        })
    fetch(`${url}competitions/${idParam}/standings`, {
            headers: {
                "X-Auth-Token": authToken
            }
        })
        .then(response => {
            return response.json();
        })
        .then(resjson => {
            setCompetitionDataId(resjson)
        })
    fetch(`${url}competitions/${idParam}/scorers`, {
            headers: {
                "X-Auth-Token": authToken
            }
        })
        .then(response => {
            return response.json();
        })
        .then(resjson => {
            setScoresCompetition(resjson)
        })
}

function getTeam() {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");
    if ('caches' in window) {
        caches.match(`${url}teams/${idParam}`)
            .then(function (response) {
                if (response) {
                    response.json()
                        .then(function (data) {
                            setTeam(data)
                        });
                }
            });
    }
    fetch(`${url}teams/${idParam}`, {
            headers: {
                "X-Auth-Token": authToken
            }
        })
        .then(response => {
            return response.json();
        })
        .then(resjson => {
            setTeam(resjson)
        })
}