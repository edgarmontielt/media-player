"use strict";

const songs = ["creativeminds.mp3", "dreams.mp3", "hipjazz.mp3", "ukulele.mp3"];
const contentList = document.querySelector(".content-list");
const songContainer = document.getElementById("audio");
const folder = "../assets/audio/";

let duration

songContainer.addEventListener('loadeddata', event => {
    console.log(duration);
    duration = event.target.duration
})


export default function audioController() {
    songs.forEach(song => {
        const res = renderSongName(song);
        contentList.appendChild(res);
        addEvents(res)
    });
}

function renderSongName(data) {
    const card = document.createElement("div");
    card.className = "content-list_card";
    card.innerText = data;
    return card;
}

function addEvents(song) {
    const name = song.innerText
    song.onclick = () => {
        play(name)
        song.classList.add("active");
    };
}

function play(item) {
    disactive();
    songContainer.src = folder + item;
    songContainer.play();
    const time = document.getElementById('duration')
    time.innerText = duration
}

function disactive() {
    const elementsAct = document.querySelectorAll(".active");
    elementsAct.forEach(elem => elem.classList.remove("active"));
}
