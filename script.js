        let cykler = [];
        const url = "https://esauka.dk/koga/wordpress/wp-json/wp/v2/koga?per_page=100";

        const modtagerKloner = document.querySelector(".liste");

        document.addEventListener("DOMContentLoaded", start);

        function start() {
            hentNav();
            hentJson();
        }

        async function hentNav() {
            const response = await fetch("inc/nav.html");
            const inclusion = await response.text();
            document.querySelector("nav").innerHTML = inclusion;
            console.log(inclusion);
        }

        async function hentJson() {
            const response = await fetch(url);
            cykler = await response.json();
            console.log(cykler);
            vis();
        }


        function vis() {
            const skabelon = document.querySelector("template");
            const liste = document.querySelector(".liste");

            modtagerKloner.innerHTML = "";

            cykler.forEach(cykel => {
                const klon = skabelon.cloneNode(true).content;
                klon.querySelector(".title").textContent = cykel.navn;
                klon.querySelector(".pris").textContent += cykel.pris;
                klon.querySelector("img").src = cykel.billede.guid;
                klon.querySelector("img").alt = "billede af" + cykel.title.rendered;
                klon.querySelector(".beskrivelse").innerHTML = cykel.lang_tekst;
                liste.appendChild(klon);
                modtagerKloner.lastElementChild.addEventListener("click", () => {
                    location.href = `cykelinfo.html?navn=${cykel.navn}`
                });
            });



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
