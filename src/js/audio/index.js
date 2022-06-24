"use strict";
import songs from "../../data/music.json" assert { type: "json" };
import { controls, next, previus } from "./controllers/controls.js";

const songContainer = document.getElementById("audio");
const progress = document.getElementById("progress");
const playBtn = document.getElementById("play-music");
const previusIcon = document.getElementById("previus");
const nextIcon = document.getElementById("next");
const folder = "../assets/audio/";
let duration = 0.0;
const $ = (item) => document.querySelector(item);

songContainer.controls = false;

let index = [];

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

    songContainer.addEventListener(
        "timeupdate", 
        (event) =>
        renderTime(event.target.currentTime)
    );
    songContainer.addEventListener("ended", nextMusic);
    nextIcon.addEventListener("click", nextMusic);
    previusIcon.addEventListener("click", previusMusic);
}

function renderTime(currentTime) {
    const time = (currentTime / duration) * 100;
    progress.value = isNaN(time) ? 0 : time;
    const durationDOM = document.getElementById("duration");
    durationDOM.innerText = calcTime(currentTime) + " / " + calcTime(duration);
}

function calcTime(time) {
    const timeReturn = Math.floor(time / 60) + ":" + Math.floor(time % 60);
    return timeReturn;
}

function addStylesToControls() {
    $(".controls").style.animation = `animOpac 1s ease`;
    $(".controls").style.display = "grid";
    $(".container-content").style.display = "grid";
    $(".content-video").style.display = "block";
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
    const { src, name, img } = song;
    card.onclick = () => {
        disactive();
        play(src, name, img, card);
        card.classList.add("active");
    };
}

function play(item, name, img, card) {
    disactive();
    songContainer.src = folder + item;
    songContainer.play();
    playBtn.innerHTML =
        '<img id="" src="../../public/svg/pause-circle.svg" alt="play-circle" />';
    // const time = document.getElementById("duration");
    // time.innerText = duration;
    index[0] = item;
    $(".controls-title").innerHTML = `
        <img src="${img}" class="image"/>
        <h1>${name}</h1>
    `;
    renderImageForPanel(card.firstChild.src);
}

function nextMusic() {
    const listSongs = document.querySelectorAll(".content-list_card");
    const nextSong = next(songs, index, listSongs, disactive);

    const { src, name, img } = nextSong;
    const card = renderSongCard(nextSong);
    addEvents(card, nextSong);
    play(src, name, img, card);
}

function previusMusic() {
    const listSongs = document.querySelectorAll(".content-list_card");
    const previusSong = previus(songs, index, listSongs, disactive);
    const card = renderSongCard(previusSong);
    addEvents(card, previusSong);
    play(previusSong.src, card);
}

function renderImageForPanel(src) {
    const content = document.querySelector(".content-video_image");
    const imgPanel = `<img src=${src} class="image-panel">`;

    content.innerHTML = imgPanel;
}

function disactive() {
    const elementsAct = document.querySelectorAll(".active" || ".actives");
    elementsAct.forEach((elem) => {
        elem.classList.remove("active" || "actives");
    });
}

export default audioController;
