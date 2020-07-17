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
                <div id="button-team" class=""></div>
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

    let idTeam = data.id;
    getFavTeams().then(items => {
        cekFavTeams(items)
    })

    function cekFavTeams(items) {
        let subscribeTeam = `<div class"subscribe" id="subscribe" style="margin-top: 50px; margin-left: 30px;"><a class="btn-floating btn-large pulse"><i class="material-icons">favorite</i></a></div>`

        let deleteTeam = ""

        document.getElementById("button-team").innerHTML = ""

        if (items.length == 0) {
            document.getElementById("button-team").classList.remove("delete");
            document.getElementById("button-team").classList.add("subscribe");
            document.getElementById("button-team").innerHTML = subscribeTeam;

        } else {
            items.forEach(items => {
                if (idTeam == items.id) {
                    document.getElementById("button-team").classList.remove("subscribe");
                    document.getElementById("button-team").classList.add("delete");
                    deleteTeam += `<div class"delete" id="delete" style="margin-top: 50px; margin-left: 30px;" data-id="${items.id}" data-name="${items.name}"><a class="btn-floating btn-large pulse red"><i class="material-icons">delete</i></a></div>`
                    document.getElementById("button-team").innerHTML = deleteTeam
                } else {
                    document.getElementById("button-team").classList.remove("delete");
                    document.getElementById("button-team").classList.add("subscribe");
                    document.getElementById("button-team").innerHTML = subscribeTeam
                }
            })
        }

        function hasClass(element, cls) {
            return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
        }

        let elem = document.getElementById("button-team")
        if (hasClass(elem, "subscribe") == true) {
            document.getElementById("subscribe").addEventListener("click", () => {
                saveFavTeam(data)
                elem.classList.remove("subscribe")
                elem.classList.add("delete")
                getFavTeams().then(items => {
                    cekFavTeams(items)
                })
            })
        } else {
            document.getElementById("delete").addEventListener("click", (event) => {
                let id = document.getElementById("delete").getAttribute("data-id");
                let name = document.getElementById("delete").getAttribute("data-name");
                id = parseInt(id);
                deleteFavTeams(id, name)
                elem.classList.remove("delete")
                elem.classList.add("subscribe")
                getFavTeams().then(items => {
                    cekFavTeams(items)
                })
            })
        }
        // console.log(items)


    }



}