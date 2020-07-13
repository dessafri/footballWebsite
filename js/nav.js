loadNav();

function loadNav() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status != 200) return;

            // Muat daftar tautan menu
            document.querySelectorAll(".top-nav, .bot-nav").forEach(function (elm) {
                elm.innerHTML = xhttp.responseText;
            });

            // Daftarkan event listener untuk setiap tautan menu
            document.querySelectorAll(".bot-nav, .top-nav").forEach(function (elm) {
                elm.addEventListener("click", function (event) {
                    // // Muat konten halaman yang dipanggil
                    let page = event.target.getAttribute("href").substr(1);
                    loadPage(page);
                });
            });
        }
    };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
}

var page = window.location.hash.substr(1);
if (page == "") page = "home";
loadPage(page);

function loadPage(page) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            var content = document.querySelector("#body-content");
            if (this.status == 200) {
                content.innerHTML = xhttp.responseText;
                if (page == "home" || page == "") {
                    getLeague();
                }
                if (page == "myfavorite") {
                    readFavteam();
                }
            } else if (this.status == 404) {
                content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
            } else {
                content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
            }
        }
    };
    xhttp.open("GET", "pages/" + page + ".html", true);
    xhttp.send();
}