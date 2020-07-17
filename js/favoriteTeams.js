function readFavteam() {
    getFavTeams().then((data) => {
        favTeam(data)
    })

    function favTeam(result) {
        let data = result;
        let favteams = ""
        let listTeams = ""
        let squad = ""
        if (data.length == 0) {
            favteams += `
            <div id="notHaveFavorite" style="display: flex; justify-content: center;">
            <i class="large material-icons cancelLogoFavorite">cancel</i>
            </div>
            <h3 style="magin-top: 30px; display: inline-block; width:100%;">You haven't selected your favorite team yet</h3>
            `
            document.getElementById("body-content-favorite").innerHTML = favteams
        } else {
            favteams += `
            <h4 style="margin-top: 30px; margin-bottom: 30px;">My Favorite Teams</h4>
            <ul class="collapsible" id="list-fav-teams">
            </ul>
            `
            data.forEach(data => {
                listTeams += `
                <li>
                    <div class="collapsible-header"><img src="${data.crestUrl}" alt="${data.name}" width="50" height="50" style="margin-right: 30px;"><span style="display: inline-block; margin-top: 20px;">${data.name}</span></div>
                    <div class="collapsible-body">
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
                     <div id="delete" style="margin-top: 50px; margin-left: 30px;"><a class="btn-floating btn-large pulse red"><i class="material-icons delete" data-id="${data.id}" data-name="${data.name}">delete</i></a></div>
                     </div>
                     <div class="detail" style="margin-top: 40px;margin-bottom: 40px;">
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
                    </div>
                </li>
                `
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
            })
            document.getElementById("body-content-favorite").innerHTML = favteams
            document.getElementById("list-fav-teams").innerHTML = listTeams
            document.getElementById("data-staff-and-player").innerHTML = squad
            var elems = document.querySelectorAll('.collapsible');
            var instances = M.Collapsible.init(elems);
            document.querySelectorAll(".delete").forEach(function (elm) {
                elm.addEventListener("click", (event) => {
                    let id = event.target.getAttribute("data-id")
                    let name = event.target.getAttribute("data-name")
                    id = parseInt(id)
                    deleteFavTeams(id, name)
                    setTimeout(() => {
                        location.reload()
                    }, 2000);
                })
            })
        }

    }

}