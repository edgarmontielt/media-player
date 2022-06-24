"use strict";
import songs from "../../data/music.json" assert { type: "json" };
import { controls } from "./controllers/controls.js";

const songContainer = document.getElementById("audio");
const progress = document.getElementById("progress");
const playBtn = document.getElementById("play-music");
const folder = "../assets/audio/";
let duration = 0.0;

songContainer.controls = false;

songContainer.addEventListener("loadeddata", (event) => {
    duration = event.target.duration;
    addStylesToControls();
    controls(songContainer, playBtn, duration);
});

function audioController() {
    songs.forEach((song) => {
        const list = document.querySelector(".content-list_items");
        const res = renderSongCard(song);
        list.appendChild(res);
        addEvents(res, song);
    });

    songContainer.addEventListener("timeupdate", (event) => {
        const time = (event.target.currentTime / event.target.duration) * 100;
        progress.value = isNaN(time) ? 0 : time;
    });
}

function addStylesToControls() {
    const controlsContainer = document.querySelector(".controls");
    controlsContainer.style.animation = `animOpac 1s ease`;
    controlsContainer.style.display = "block";
}

function renderSongCard(data) {
    const card = createElem("div", {
        className: "content-list_card",
    });
    const img = createElem("img", {
        className: "image",
    });
    const name = document.createElement("p");
    img.src = data.img;
    name.innerText = data.name;
    card.appendChild(img);
    card.appendChild(name);
    return card;
}

const createElem = (label, { atributes, className }) => {
    const elem = document.createElement(label);
    elem.classList.add(className);
    return elem;
};

function addEvents(card, song) {
    const name = song.src;
    card.onclick = () => {
        play(name, card);
        card.classList.add("active");
    };
}

function play(item, card) {
    disactive();
    songContainer.src = folder + item;
    songContainer.play();
    playBtn.innerText = "PAUSE";
    // const time = document.getElementById("duration");
    // time.innerText = duration;
    renderImageForPanel(card.firstChild.src);
}

function renderImageForPanel(src) {
    const content = document.querySelector(".content-video_image");
    const imgPanel = `<img src=${src} class="image-panel">`;

    content.innerHTML = imgPanel;
}

function disactive() {
    const elementsAct = document.querySelectorAll(".active");
    elementsAct.forEach((elem) => {
        elem.classList.remove("active");
    });
}

export default audioController;
