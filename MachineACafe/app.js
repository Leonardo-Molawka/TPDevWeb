import {injectElements, renewTag} from "./functions/dom.js";

const wrapper = document.querySelector('#controle');
wrapper.innerHTML = '<input id="input" type="text">' + wrapper.innerHTML;
const boutton = document.querySelector('#start');

boutton.textContent = "Calculer";
function start() {
    let input = document.querySelector('#input');
    calculer(Number(input.value));
    const etapes = [
        { title: "Commence à faire le café", duree: 2000 },
        { title: "Mouds les grains de café", duree: 1500 },
        { title: "Fait chauffer l'eau", duree: 2500 }, 
        { title: "Infuse les grains de café moulus", duree: 3000 },
        { title: "Verse le café dans une tasse", duree: 2000 },
        { title: "Ajoute un peu de lait dans la tasse", duree: 1500 },
        { title: "Le café est terminé.", duree: 1000 } 
    ];
    const laListe = renewTag('ul');
    wrapper.append(laListe);
    injectElements(etapes, laListe);
}

const ingredients = [
    { nom: "eau", quantité: 200, unité: "ml"},
    { nom: "lait", quantité: 50, unité:"ml"},
    { nom: "grains", quantité: 15, unité:"g"},
];

function calculer(nbCafe){
    for (let value of Object.values(ingredients)){
        wrapper.innerHTML += "<p>" + value.nom + " " + value.quantité*nbCafe + " " +value.unité + "</p>";
    }
}

document.querySelector('#start').addEventListener('click', start)


function verifierDisponibilite(nbTasses, eauDisponible, laitDisponible, grainsDisponibles) {  
    const eauNecessaire = nbTasses * 200;
    const laitNecessaire = nbTasses * 50;
    const grainsNecessaires = nbTasses * 15;

    if (eauDisponible >= eauNecessaire && laitDisponible >= laitNecessaire && grainsDisponibles >= grainsNecessaires) {
        if (eauDisponible > eauNecessaire || laitDisponible > laitNecessaire || grainsDisponibles > grainsNecessaires) {
            const tassesSupplementaires = Math.min(
                Math.floor(eauDisponible / 200),
                Math.floor(laitDisponible / 50),
                Math.floor(grainsDisponibles / 15)
            );
            return `Oui, je peux faire cette quantité de café (et même ${tassesSupplementaires} plus que cela)`;
        } else {
            return "Oui, je peux faire cette quantité de café";
        }
    } else {
        const tassesPossibles = Math.min(
            Math.floor(eauDisponible / 200),
            Math.floor(laitDisponible / 50),
            Math.floor(grainsDisponibles / 15)
        );
        return `Non, je ne peux faire que ${tassesPossibles} tasses de café`;
    }
}


function verifier() {
    const eauInput = document.querySelector('#eau');
    const laitInput = document.querySelector('#lait');
    const grainsInput = document.querySelector('#grains');
    const tassesInput = document.querySelector('#tasses');
    const resultat = document.querySelector('#resultat');

    const eauDisponible = Number(eauInput.value);
    const laitDisponible = Number(laitInput.value);
    const grainsDisponibles = Number(grainsInput.value);
    const nbTasses = Number(tassesInput.value);

    const message = verifierDisponibilite(nbTasses, eauDisponible, laitDisponible, grainsDisponibles);

    resultat.textContent = message;
}


const boutonVerifier = document.querySelector('#verifier');
boutonVerifier.addEventListener('click', verifier);


let argentMachine = 550;
let eauDisponible = 400;
let laitDisponible = 540;
let grainsDisponibles = 120;
let tassesJetables = 9;


function acheterCafe(typeCafe, prix, eauNecessaire, laitNecessaire, grainsNecessaires) {
    if (tassesJetables >= 1 && eauDisponible >= eauNecessaire && laitDisponible >= laitNecessaire && grainsDisponibles >= grainsNecessaires) {
        argentMachine += prix;
        eauDisponible -= eauNecessaire;
        laitDisponible -= laitNecessaire;
        grainsDisponibles -= grainsNecessaires;
        tassesJetables -= 1;
        return `Vous avez acheté un ${typeCafe}.`;
    } else {
        return "Désolé, nous ne pouvons pas préparer cette boisson pour le moment.";
    }
}


function remplirFournitures(eauAjout, laitAjout, grainsAjout, tassesAjout) {
    eauDisponible += eauAjout;
    laitDisponible += laitAjout;
    grainsDisponibles += grainsAjout;
    tassesJetables += tassesAjout;
    return "Fournitures ajoutées à la machine à café.";
}


function retirerArgent() {
    const argentRetire = argentMachine;
    argentMachine = 0;
    return `Vous avez retiré ${argentRetire} € de la machine à café.`;
}


function mettreAJourEtat() {
    const etatMachine = `Argent dans la machine : ${argentMachine} €<br>
    Eau disponible : ${eauDisponible} ml<br>
    Lait disponible : ${laitDisponible} ml<br>
    Grains de café disponibles : ${grainsDisponibles} g<br>
    Tasses jetables disponibles : ${tassesJetables}`;
    document.querySelector('#etatMachine').innerHTML = etatMachine;
}

// Gestion du clic sur le bouton "Acheter"
document.querySelector('#acheter').addEventListener('click', function () {
    const typeCafe = document.querySelector('#typeCafe').value;
    let prix, eauNecessaire, laitNecessaire, grainsNecessaires;

    if (typeCafe === "expresso") {
        prix = 4;
        eauNecessaire = 250;
        laitNecessaire = 0;
        grainsNecessaires = 16;
    } else if (typeCafe === "latte") {
        prix = 7;
        eauNecessaire = 350;
        laitNecessaire = 75;
        grainsNecessaires = 20;
    } else if (typeCafe === "cappuccino") {
        prix = 6;
        eauNecessaire = 200;
        laitNecessaire = 100;
        grainsNecessaires = 12;
    }
    function preparerCafeCitrouille() {
        const prix = 5;
        const eauNecessaire = 300;
        const laitNecessaire = 100;
        const grainsNecessaires = 18;
        
        const message = acheterCafe("Café à la citrouille", prix, eauNecessaire, laitNecessaire, grainsNecessaires);
        document.querySelector('#message').innerHTML = message;
        mettreAJourEtat();
    }
    
    // Fonction pour préparer un café à la fraise
    function preparerCafeFraise() {
        const prix = 6;
        const eauNecessaire = 250;
        const laitNecessaire = 50;
        const grainsNecessaires = 15;
        
        const message = acheterCafe("Café à la fraise", prix, eauNecessaire, laitNecessaire, grainsNecessaires);
        document.querySelector('#message').innerHTML = message;
        mettreAJourEtat();
    }
    
    // Fonction pour préparer un frapuccino
    function preparerFrapuccino() {
        const prix = 8;
        const eauNecessaire = 200;
        const laitNecessaire = 120;
        const grainsNecessaires = 20;
        
        const message = acheterCafe("Frapuccino", prix, eauNecessaire, laitNecessaire, grainsNecessaires);
        document.querySelector('#message').innerHTML = message;
        mettreAJourEtat();
    }
    

    const message = acheterCafe(typeCafe, prix, eauNecessaire, laitNecessaire, grainsNecessaires);
    document.querySelector('#message').innerHTML = message;
    mettreAJourEtat();
});

document.querySelector('#remplir').addEventListener('click', function () {
    const eauAjout = Number(prompt("Quantité d'eau à ajouter (en ml):"));
    const laitAjout = Number(prompt("Quantité de lait à ajouter (en ml):"));
    const grainsAjout = Number(prompt("Quantité de grains de café à ajouter (en g):"));
    const tassesAjout = Number(prompt("Nombre de tasses jetables à ajouter:"));
    const message = remplirFournitures(eauAjout, laitAjout, grainsAjout, tassesAjout);
    document.querySelector('#message').innerHTML = message;
    mettreAJourEtat();
});

document.querySelector('#prendre').addEventListener('click', function () {
    const message = retirerArgent();
    document.querySelector('#message').innerHTML = message;
    mettreAJourEtat();
});

document.querySelector('#cafeCitrouille').addEventListener('click', preparerCafeCitrouille);
document.querySelector('#cafeFraise').addEventListener('click', preparerCafeFraise);
document.querySelector('#frapuccino').addEventListener('click', preparerFrapuccino);

mettreAJourEtat();

