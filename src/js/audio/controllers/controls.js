"use strict";

const $ = (item) => document.getElementById(item);
let musicCurrent;

const volumeIcon = $("volume-icon");

window.addEventListener("keydown", (event) => {
    const key = event.key;
    switch (key) {
        case "ArrowRight":
            advancedTime(musicCurrent);
            break;
        case "ArrowLeft":
            backTime(musicCurrent);
            break;
    }
});

function controls(music, button, duration) {
    musicCurrent = music;
    button.addEventListener("click", () => playOrPause(music, button));
    $("progress").addEventListener("input", (event) =>
        dragProgressBar(music, duration, event.target.value)
    );
    $("advance").addEventListener("click", () => advancedTime(music));
    $("back").addEventListener("click", () => backTime(music));
    $("volume").addEventListener(
        "input",
        (event) => (audio.volume = event.target.value / 100)
    );
    volumeIcon.addEventListener(
        "mouseover",
        () => (volume.style.display = "block")
    );
    volumeIcon.addEventListener("click", () => (volume.style.display = "none"));
}

function playOrPause(data, button) {
    if (data.paused) {
        data.play();
        button.innerHTML =
            '<img id="" src="../../public/svg/pause-circle.svg" alt="play-circle" />';
    } else {
        data.pause();
        button.innerHTML =
            '<img id="" src="../../public/svg/play-circle.svg" alt="play-circle" />';
    }
}

const backTime = (data) => (data.currentTime -= 10);
const advancedTime = (data) => (data.currentTime += 10);
const dragProgressBar = (music, duration, value) =>
    (music.currentTime = (duration / 100) * value);

function next(songs, index, list, callback) {
    let nextSong;
    callback();
    songs.forEach((item, i) => {
        if (item.src === index[0]) nextSong = songs[i + 1];
    });
    list.forEach((item, i) => {
        if (item.innerText === nextSong.name) {
            list[i - 1].classList.remove("actives");
            item.classList.add("actives");
        }
    });
    return nextSong;
}

function previus(songs, index, list, callback) {
    let previusSong;
    callback();
    songs.forEach((item, i) => {
        if (item.src === index[0]) {
            previusSong = songs[i - 1];
        }
    });

    list.forEach((item, i) => {
        if (item.innerText === previusSong.name) {
            list[i + 1].classList.remove("actives");
            item.classList.add("actives");
        }
    });

    return previusSong;
}

export { controls, next, previus };
