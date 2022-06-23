"use strict";
import songs from "../../data/music.json" assert { type: "json" };
import { controls } from "./controllers/controls.js";

const contentList = document.querySelector(".content-list");
const songContainer = document.getElementById("audio");
const progress = document.getElementById('progress')
const folder = "../assets/audio/";
let duration;

songContainer.controls = false

songContainer.addEventListener("loadeddata", (event) => {
    duration = event.target.duration;
});

export default function audioController() {
    songs.forEach((song) => {
        const res = renderSongName(song);
        contentList.appendChild(res);
        addEvents(res, song);
    });
    
    songContainer.addEventListener('timeupdate', (event) => {
        const time = (event.target.currentTime / event.target.duration) * 100
        progress.value = isNaN(time) ? 0 : time
    })
}

function renderSongName(data) {
    const card = document.createElement("div");
    card.className = "content-list_card";
    card.innerText = data.name;
    return card;
}

function addEvents(card, song) {
    const name = song.src;
    card.onclick = () => {
        play(name);
        card.classList.add("active");
    };
}

function play(item) {
    disactive();
    songContainer.src = folder + item;
    songContainer.play();
    const time = document.getElementById("duration");
    time.innerText = duration;
}

function disactive() {
    const elementsAct = document.querySelectorAll(".active");
    elementsAct.forEach((elem) => elem.classList.remove("active"));
}

controls(songContainer)


