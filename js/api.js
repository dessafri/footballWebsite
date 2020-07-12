let url = "https://api.football-data.org/v2/"
let authToken = "81e3ce7d778e4e5d9914ae02881ccf03"


function getLeague() {
    if ('caches' in window) {
        caches.match(url + "competitions?plan=TIER_ONE&areas=2077")
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
}

function setCompetitionData(result) {
    let data = result.competitions
    let league = ""
    data.map(data => {
        if (data.id == 2001 || data.id == 2018 || data.id == 2016 || data.id == 2017) {
            return
        }
        league += `
        <div class="col l4 s6 m4">
            <div class="card"><a href="detail.html?id=${data.id}">
                <div class="card-image">
                    <img src="../img/${data.id}.png" alt="${data.name}">
                </div>
                <div class="card-content hide-on-small-only">
                <hr>
                <li>Start Date : ${data.currentSeason.startDate}</li>
                <li>End Date : ${data.currentSeason.endDate}</li>
                <li>Current MatchDay : ${data.currentSeason.currentMatchday}</li>
                </div></a>
            </div>
        </div>`
    })
    document.querySelector("#dataLiga").innerHTML = league
}

function setCompetitionDataId(result) {
    let data = result
    let winner = ""
    if (data.season.Winner == null) {
        winner = "the competition isn't over yet"
    } else {
        winner = data.season.Winner
    }
    let competitions = ""
    competitions += `
        <div class="detail-league">
                <div class="image">
                    <img src="img/${data.competition.id}.png" alt="${data.competition.name}" width="250">
                </div>
                <div class="descriptions-league">
                    <ul>
                        <li><h5>${data.competition.name}</h5></li>
                        <li><span>Start Date : </span>${data.season.startDate}</li>
                        <li><span>End Date : </span>${data.season.endDate}</li>
                        <li><span>Current Match Day : </span>${data.season.currentMatchday}</li>
                        <li><span>Winner : </span>${winner}</li>
                    </ul>
                </div>
            </div>
            <div class="detail" style="margin-top: 40px; margin-bottom: 40px;">
                <div class="row" style=" display: flex; justify-content: center;">
                    <div class="col s12 m12 l12" style=" width: 90%;">
                        <ul class="tabs" id="tabs-swipe-demo">
                            <li class="tab col s3 "><a href="#standings">Standings</a></li>
                            <li class="tab col s3 "><a href="#matches">Match</a></li>
                            <li class="tab col s3 "><a href="#topScore">Top Score</a></li>
                        </ul>
                    </div>
                </div>
                <div class="content container" id="content-detail">
                    <div id="standings" class="col s12">
                        <table class="centered">
                            <thead>
                                <tr>
                                    <th>Position</th>
                                    <th></th>
                                    <th>Teams</th>
                                    <th>MD</th>
                                    <th>W</th>
                                    <th>D</th>
                                    <th>L</th>
                                    <th>G</th>
                                    <th>GA</th>
                                    <th>GD</th>
                                    <th>POINT</th>
                                </tr>
                            </thead>
                            <tbody id="data-standings">
                            </tbody>
                        </table>
                    </div>
                    <div id="matches" class="col s12">
                        <table class="centered">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Home Team</th>
                                    <th>VS</th>
                                    <th></th>
                                    <th>Away Team</th>
                                </tr>
                            </thead>
                            <tbody id="data-matches">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        `
    document.getElementById("body-content").innerHTML = competitions
    var elems = document.querySelectorAll('.tabs');
    var instances = M.Tabs.init(elems);
    let standings = ""
    data.standings[0].table.forEach(data => {
        let logoTeam = data.team.crestUrl.replace(/^http:\/\//i, 'https://');
        standings += `
        <tr>
            <td>${data.position}</td>
            <td><img src="${logoTeam}" alt="${data.team.name}" width="40" height="40"></td>
            <td>${data.team.name}</td>
            <td>${data.playedGames}</td>
            <td>${data.won}</td>
            <td>${data.draw}</td>
            <td>${data.lost}</td>
            <td>${data.goalsFor}</td>
            <td>${data.goalsAgainst}</td>
            <td>${data.goalDifference}</td>
            <td>${data.points}</td>
        </tr>
        `
    })
    document.getElementById("data-standings").innerHTML = standings
    saveStandings(data);
}

function setCompetitionMatch(result) {
    let dataMatch = result.matches;
    dataMatch = dataMatch.slice(0, 10)
    getStandings().then(function (items) {
        match(items)
    })

    function match(result) {
        let dataImages = result[0]
        let matchday = ""
        dataMatch.forEach(match => {
            let imgHome = ""
            let imgAway = ""
            dataImages.standings[0].table.forEach(data => {
                let idHomeDb = data.team;
                let idAwayDb = data.team;
                let idHome = match.homeTeam;
                let idAway = match.awayTeam;

                if (idHomeDb.id == idHome.id) {
                    imgHome = idHomeDb.crestUrl;
                    return imgHome
                }
                if (idAwayDb.id == idAway.id) {
                    imgAway = idAwayDb.crestUrl
                    return imgAway
                }
            })
            matchday += `
            <tr>
                <td><img src="${imgHome}" width="40" height="40"></td>
                <td>${match.homeTeam.name}</td>
                <td>VS</td>
                <td><img src="${imgAway}" width="40" height="40"></td>
                <td>${match.awayTeam.name}</td>
            </tr>
            `

        })

        document.getElementById("data-matches").innerHTML = matchday


    }
    // let dataStandings = ""
    // console.log(dataStandings)
    // let data = result.matches
    // let matches = ""
    // matches += `

    //             `
    // // document.getElementById("content-detail").innerHTML = matches
}