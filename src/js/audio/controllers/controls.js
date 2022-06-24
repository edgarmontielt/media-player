'use strict'

const back = document.getElementById('back')
const advance = document.getElementById('advance')

function controls(music, button) {
    button.addEventListener('click', () => playOrPause(music, button))
    back.addEventListener('click', () => backTime(music))
    advance.addEventListener('click', () => advancedTime(music))
}

function playOrPause(data, button) {
    if (data.paused) {
        data.play()
        button.innerText = 'PAUSE'
    } else {
        data.pause()
        button.innerText = 'PLAY'
    }
}

function backTime(data) {
    data.currentTime -= 10
}

function advancedTime(data) {
    data.currentTime += 10
}

export { controls }

