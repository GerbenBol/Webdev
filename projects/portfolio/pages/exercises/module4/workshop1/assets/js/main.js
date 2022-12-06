let voornaam = "Gerben";
let tussenvoegsel = " ";
let achternaam = "Bol";
let volledigeNaam = voornaam + tussenvoegsel + achternaam;
let geboortedag = 24;
let geboortemaand = 9;
let geboortejaar = 2003;
let huidig_jaartal = 2022;
let leeftijd;
let dag_van_het_jaar = 365 - 26;
let straat = "Jacq. Stalkade";
let huisnummer = 6;
let woonplaats = "Geertruidenberg";
let woonachtig_in_utrecht;
let aantal_studenten_in_deze_klas = 25;
let kosten_van_frikandelbroodje = 1.76;
let totale_lunchkosten;

// Leeftijd
if (geboortemaand == 12) {
    if (geboortedag <= 5) {
        dateBdayHasBeen;
    } else {
        dateBdayToCome();
    }
} else if (geboortemaand < 12) {
    dateBdayHasBeen();
} else {
    dateBdayToCome();
}

function dateBdayHasBeen() {
    leeftijd = huidig_jaartal - geboortejaar;
}

function dateBdayToCome() {
    leeftijd = huidig_jaartal - geboortedag - 1;
}

// In Utrecht
if (woonplaats.toLowerCase() == "utrecht") {
    woonachtig_in_utrecht = true;
} else {
    woonachtig_in_utrecht = false;
}

// Lunchkosten
totale_lunchkosten = kosten_van_frikandelbroodje * 2 * aantal_studenten_in_deze_klas;

let totalString = "Volledige naam: " + volledigeNaam + "<br>" +
    "Geboortedatum: " + geboortedag + "/" + geboortemaand + "/" + geboortejaar + "<br>" +
    "Leeftijd: " + leeftijd + "<br>" +
    "Dag van het jaar: " + dag_van_het_jaar + "<br>" +
    "Woonplaats: " + straat + " " + huisnummer + ", " + woonplaats + "<br>" +
    "Woonachtig in Utrecht: " + woonachtig_in_utrecht + "<br>" +
    "Aantal studenten in klas: " + aantal_studenten_in_deze_klas + "<br>" +
    "Kosten frikandelbroodje: " + "&euro;" + kosten_van_frikandelbroodje + "<br>" +
    "Totale lunchkosten: " + "&euro;" + totale_lunchkosten;

document.write(totalString);
