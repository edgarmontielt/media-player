'use strict'

const back = document.getElementById('back')
const advance = document.getElementById('advance')
const progress = document.getElementById('progress')

function controls(music, button, duration) {
    button.addEventListener('click', () => playOrPause(music, button))
    back.addEventListener('click', () => backTime(music))
    advance.addEventListener('click', () => advancedTime(music))
    progress.addEventListener('input', event => dragProgressBar(music, duration, event.target.value))
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

const backTime = data => data.currentTime -= 10
const advancedTime = data => data.currentTime += 10
const dragProgressBar = (music, duration, value) => music.currentTime = (duration / 100) * value


export { controls }

