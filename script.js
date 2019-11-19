let cykler = [];
const url = "https://esauka.dk/koga/wordpress/wp-json/wp/v2/koga?per_page=100";
let filter = "Alle";
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

// const liste = document.querySelector(".liste");

window.addEventListener("load", start);

function start() {
    //            hentNav();
    hentFooter();
    hentJson();
    animer();
    addEventListenersToButtons();
    showPage();
}

//        async function hentNav() {
//            const response = await fetch("inc/nav.html");
//            const inclusion = await response.text();
//            document.querySelector("nav").innerHTML = inclusion;
//            console.log(inclusion);
//        }

async function hentFooter() {
    const response = await fetch("inc/footer.html");
    const inclusion = await response.text();
    document.querySelector("footer").innerHTML = inclusion;
}

async function hentJson() {
    const response = await fetch(url);
    cykler = await response.json();
    console.log(cykler);
    vis();
}
// Loading hjul
function showPage() {
    document.querySelector("#hjul_container").style.display = "none";
    document.querySelector("#body_container").style.display = "block";
}


function vis() {
    const skabelon = document.querySelector("template");
    const liste = document.querySelector(".liste");
    filtr = urlParams.get("kategori");
    if (liste) {
        liste.innerHTML = "";

        cykler.forEach((cykel) => {
            if (filter == "Alle" || filter == cykel.kategori) {
                const klon = skabelon.cloneNode(true).content;
                klon.querySelector(".title").textContent = cykel.navn;

                klon.querySelector("img").src = cykel.billede.guid;
                klon.querySelector("img").alt = "billede af" + cykel.title.rendered;
                klon.querySelector(".beskrivelse").innerHTML = cykel.kort_tekst;
                liste.appendChild(klon);
                liste.lastElementChild.addEventListener("click", () => {
                    location.href = `cykelinfo.html?navn=${cykel.navn}&id=${cykel.id}`;

                });
            }
        })
    }
}

function visSingle(bike) {
    document.querySelector("#single").style.display = "block";
    document.querySelector("#single .luk").addEventListener("click", lukSingle);
    document.querySelector(".beskrivelse h2").textContent = bike.navn;
    document.querySelector(".beskrivelse .billede").src = bike.billede.guid;
    document.querySelector(".beskrivelse .billede").alt = "billede af" + bike.navn;
    document.querySelector(".beskrivelse .pris").textContent = bike.lang_tekst;
}

function lukSingle() {
    document.querySelector("#single").style.display = "none";
}


function animer() {
    document.querySelector("#menuknap").addEventListener("click", toggleMenu);

}


function toggleMenu() {
    console.log("toggleMenu");

    document.querySelector("#menu").classList.toggle("hidden");

    let erSkjult = document.querySelector("#menu").classList.contains("hidden");
    if (erSkjult == true) {
        document.querySelector("#menuknap").textContent = "☰";
        document.querySelector("#menuknap").classList.remove("whiten");

    } else {
        document.querySelector("#menuknap").textContent = "✕";
        document.querySelector("#menuknap").classList.add("whiten");

    }
}

function addEventListenersToButtons() {
    document.querySelectorAll(".filter").forEach(elm => {
        elm.addEventListener("click", filtrering);
    })
}

function filtrering() {
    filter = this.dataset.kategori;
    document.querySelector("h2").textContent = this.textContent;
    document.querySelectorAll(".cykel_filter").forEach(elm => {
        elm.classList.remove("valgt");
    })
    this.classList.add("valgt");
    vis();
}
