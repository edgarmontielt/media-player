"use strict";
import songs from "../../data/music.json" assert { type: "json" };

const contentList = document.querySelector(".content-list");
const songContainer = document.getElementById("audio");
const folder = "../assets/audio/";

let duration;

songContainer.addEventListener("loadeddata", (event) => {
    duration = event.target.duration;
    console.log(duration);
});

export default function audioController() {
    songs.forEach((song) => {
        const res = renderSongName(song);
        contentList.appendChild(res);
        addEvents(res, song);
    });
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
