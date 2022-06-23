"use strict";

const songs = ["creativeminds.mp3", "dreams.mp3", "hipjazz.mp3", "ukulele.mp3"];
const contentList = document.querySelector(".content-list");
const songContainer = document.getElementById("audio");
const folder = "../assets/audio/";

export default function audioController() {
    songs.forEach(song => {
        const res = renderSongName(song);
        contentList.appendChild(res);
        res.onclick = (event) => playSong(event.target.innerText, res);
    });
}

function renderSongName(data) {
    const card = document.createElement("div");
    card.className = "content-list_card";
    card.innerText = data;
    return card;
}

function playSong(song, card) {
    disactive();
    songContainer.src = folder + song;
    songContainer.play();
    card.classList.add("active");
}

function disactive() {
    const elementsAct = document.querySelectorAll(".active");
    elementsAct.forEach(elem => elem.classList.remove("active"));
}
