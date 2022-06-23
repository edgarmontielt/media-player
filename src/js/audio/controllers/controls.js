'use strict'

const back = document.getElementById('back')
const advance = document.getElementById('advance')
const play = document.getElementById('play-music')

function controls(music) {
    playOrPause(music)
}


function playOrPause(data) {
    play.addEventListener('click', () => {
        if (data.paused) {
            data.play()
        } else {
            data.pause()
        }
    })
}

function backTime(music) {
    back.addEventListener('click', () => {
        music.currentTime -= 10
    })
}

function advancedTime(music) {
    advance.addEventListener('click', () => {
        music.currentTime += 10
    })
}

export { controls, backTime, advancedTime }

