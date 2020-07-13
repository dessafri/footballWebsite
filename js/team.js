function setTeam(result) {
    let data = result
    let team = ""
    team += `
        <div class="detail-team">
                <div class="image">
                    <img src="${data.crestUrl}" alt="${data.name}" width="250">
                </div>
                <div class="descriptions-team">
                    <ul>
                        <li><h5>${data.name}</h5></li>
                        <li><span>Short Name : </span>${data.shortName}</li>
                        <li><span>Venue : </span>${data.venue}</li>
                        <li><span>Club Colors </span>${data.clubColors}</li>
                        <li><span>Address : </span>${data.address}</li>
                        <li><span>Website : </span>${data.website}</li>
                        <li><span>Email : </span>${data.email}</li>
                    </ul>
                </div>
                <div class"subscribe" id="subscribe" style="margin-top: 50px; margin-left: 30px;"><a class="btn-floating btn-large pulse"><i class="material-icons">favorite</i></a></div>
            </div>
            <div class="detail" style="margin-top: 40px; margin-bottom: 40px;">
                <div class="content container" id="content-detail">
                    <div id="list-staff-and-player" class="col s12">
                        <table class="centered">
                            <thead>
                                <tr>
                                    <th>Player Name</th>
                                    <th>Position</th>
                                    <th>Nationality</th>
                                    <th>Date Of Birth</th>
                                </tr>
                            </thead>
                            <tbody id="data-staff-and-player">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        `

    document.getElementById("body-content").innerHTML = team;
    let squad = ""
    data.squad.forEach(data => {
        let date = data.dateOfBirth
        date = date.substring(0, 10)
        let position = ""
        if (data.position == null) {
            position = "Coach"
        } else {
            position = data.position
        }
        squad += `
            <tr>
                <td>${data.name}</td>
                <td>${position}</td>
                <td>${data.nationality}</td>
                <td>${date}</td>
            </tr>
        `
    })
    document.getElementById("data-staff-and-player").innerHTML = squad

    document.getElementById("subscribe").addEventListener("click", () => {
        saveFavTeam(data)
    })

}