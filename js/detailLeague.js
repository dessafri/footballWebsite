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
                                    <th></th>
                                    <th></th>
                                    <th>Away Team</th>
                                </tr>
                            </thead>
                            <tbody id="data-matches">
                            </tbody>
                        </table>
                    </div>
                    <div id="topScore" class="col s12">
                        <table class="centered">
                            <thead>
                                <tr>
                                    <th>Player</th>
                                    <th>Team Name</th>
                                    <th>Goals</th>
                                </tr>
                            </thead>
                            <tbody id="data-scores">
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
            <td><a href="team.html?id=${data.team.id}">${data.team.name}</a></td>
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
                <td><a href="team.html?id=${match.homeTeam.id}">${match.homeTeam.name}</a></td>
                <td>VS <br> Matchday ${match.matchday}
                </td>
                <td><img src="${imgAway}" width="40" height="40"></td>
                <td><a href="team.html?id=${match.awayTeam.id}">${match.awayTeam.name}</a></td>
            </tr>
            `

        })

        document.getElementById("data-matches").innerHTML = matchday
    }
}

function setScoresCompetition(result) {
    let data = result.scorers
    let player = ""
    data.forEach(data => {
        player += `
        <tr>
            <td>${data.player.name}</td>
            <td><a href="team.html?id=${data.team.id}">${data.team.name}</a></td>
            <td>${data.numberOfGoals}</td>
        </tr>
        `
    })
    document.getElementById("data-scores").innerHTML = player
}