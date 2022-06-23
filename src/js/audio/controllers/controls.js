'use strict'

const back = document.getElementById('back')
const advance = document.getElementById('advance')
const play = document.getElementById('play-music')

function controls(music) {
    play.addEventListener('click', () => playOrPause(music))
    back.addEventListener('click', () => backTime(music))
    advance.addEventListener('click', () => advancedTime(music))
}


function playOrPause(data) {
    if (data.paused) {
        data.play()
    } else {
        data.pause()
    }
}

function backTime(data) {
    data.currentTime -= 10
}

function advancedTime(data) {
    data.currentTime += 10
}

export { controls }

