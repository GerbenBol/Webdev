let players = [];
let textPlayers = [];
let imgPlayers = [];
let currentPlaying = "-";
let playing = false;

function createSite() {
    players[0] = document.getElementById("teena");
    players[1] = document.getElementById("camellia");
    players[2] = document.getElementById("minds");
    players[3] = document.getElementById("megalo");
    players[4] = document.getElementById("blackparade");

    textPlayers[0] = document.getElementById("teenagers")
    textPlayers[1] = document.getElementById("1f1e33");
    textPlayers[2] = document.getElementById("suspicious");
    textPlayers[3] = document.getElementById("megalovania");
    textPlayers[4] = document.getElementById("welcome");

    imgPlayers[0] = document.getElementById("teen");
    imgPlayers[1] = document.getElementById("came");
    imgPlayers[2] = document.getElementById("elvis");
    imgPlayers[3] = document.getElementById("mega");
    imgPlayers[4] = document.getElementById("parade");

    setAudioPlayers();
    setSongLength();
}

function setAudioPlayers() {
    textPlayers.forEach(key => {
        key.addEventListener("click", startPlaying.bind(null, key.id));
    })

    imgPlayers.forEach(key => {
        key.addEventListener("click", startPlaying.bind(null, key.id));
    });
}

function startPlaying(key) {
    let index;

    if (key == "teen" || key == "teenagers") {
        index = 0;
        currentPlaying = "My Chemical Romance - Teenagers";
    } else if (key == "came" || key == "1f1e33") {
        index = 1;
        currentPlaying = "Camellia - #1f1e33";
    } else if (key == "elvis" || key == "suspicious") {
        index = 2;
        currentPlaying = "Elvis Presley - Suspicious Minds";
    } else if (key == "mega" || key == "megalovania") {
        index = 3;
        currentPlaying = "Toby Fox - Megalovania";
    } else {
        index = 4;
        currentPlaying = "My Chemical Romance - Welcome to the Black Parade";
    }

    // Stop currently playing song
    stopPlaying();

    let audio = players[index];
    textPlayers[index].className = "name active-name";
    imgPlayers[index].className = "active-img";
    audio.volume = 0.1;
    audio.play();
    keepTrackOfTime(index);
    playing = true;
}

async function keepTrackOfTime(index) {
    let active = true;
    let thisPlayer = currentPlaying.split("-")[1];

    while (active) {
        if (thisPlayer == currentPlaying.split("-")[1]) {
            let nowlis = document.getElementById("nowlis");
            let current = "Now playing: " + currentPlaying;
            let totTime = getSongLength(players[index].duration);
            let curTime = getSongLength(players[index].currentTime);
            current += " (" + curTime + " / " + totTime + ")";
            nowlis.innerHTML = current;

            await new Promise(r => setTimeout(r, 500));

            if (players[index].duration == players[index].currentTime) {
                active = false;
                currentPlaying = "-";
                nowlis.innerHTML = "Now playing: -";
                stopPlaying();
            }
        } else {
            active = false;
        }
    }
}

function stopPlaying() {
    for (let i = 0; i < 5; i++) {
        players[i].pause();
        players[i].currentTime = 0;

        textPlayers[i].className = "name";

        imgPlayers[i].className = "";
    }
}

async function setSongLength() {
    await new Promise(r => setTimeout(r, 100));
    let teen = document.getElementById("teena");
    let came = document.getElementById("camellia");
    let elvis = document.getElementById("minds");
    let mega = document.getElementById("megalo");
    let parade = document.getElementById("blackparade");

    let grid = document.getElementsByClassName("length");
    grid[0].innerHTML = getSongLength(teen.duration);
    grid[1].innerHTML = getSongLength(came.duration);
    grid[2].innerHTML = getSongLength(elvis.duration);
    grid[3].innerHTML = getSongLength(mega.duration);
    grid[4].innerHTML = getSongLength(parade.duration);
}

function getSongLength(time) {
    let mins = Math.floor(time / 60);

    if (mins < 10)
        mins = "0" + String(mins);

    let secs = Math.floor(time % 60);

    if (secs < 10)
        secs = "0" + String(secs);

    return mins + ":" + secs;
}

function playPause() {
    let index;

    if (currentPlaying == "-") {
        index = 0;
        currentPlaying = "My Chemical Romance - Teenagers";
    } else if (currentPlaying == "My Chemical Romance - Teenagers") {
        index = 0;
    } else if (currentPlaying == "Camellia - #1f1e33") {
        index = 1;
    } else if (currentPlaying == "Elvis Presley - Suspicious Minds") {
        index = 2;
    } else if (currentPlaying == "Toby Fox - Megalovania") {
        index = 3;
    } else if (currentPlaying == "My Chemical Romance - Welcome to the Black Parade") {
        index = 4;
    }

    if (playing) {
        playing = false;
        players[index].pause();
    } else {
        playing = true;
        
        let audio = players[index];
        textPlayers[index].className = "name active-name";
        imgPlayers[index].className = "active-img";
        audio.volume = 0.1;
        audio.play();
        keepTrackOfTime(index);
    }
}
