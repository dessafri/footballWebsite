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
                <li>Current Match Day : ${data.currentSeason.currentMatchday}</li>
                </div></a>
            </div>
        </div>`
    })
    document.querySelector("#dataLiga").innerHTML = league
}