'use strict'

const back = document.getElementById('back')
const advance = document.getElementById('advance')
const progress = document.getElementById('progress')
const volumeIcon = document.getElementById('volume-icon')
const volume = document.getElementById('volume')
const listSongs = document.querySelectorAll('.content-list_card')

function controls(music, button, duration) {
    button.addEventListener('click', () => playOrPause(music, button))
    back.addEventListener('click', () => backTime(music))
    advance.addEventListener('click', () => advancedTime(music))
    progress.addEventListener('input', event => dragProgressBar(music, duration, event.target.value))
    volumeIcon.addEventListener('mouseover', () => volume.style.display = 'block')
    volumeIcon.addEventListener('click', () => volume.style.display = 'none')
    volume.addEventListener('input', (event) => audio.volume = event.target.value / 100)
}

function playOrPause(data, button) {
    if (data.paused) {
        data.play()
        button.innerHTML = '<img id="" src="../../public/svg/pause-circle.svg" alt="play-circle" />'
    } else {
        data.pause()
        button.innerHTML = '<img id="" src="../../public/svg/play-circle.svg" alt="play-circle" />'
    }
}

const backTime = data => data.currentTime -= 10
const advancedTime = data => data.currentTime += 10
const dragProgressBar = (music, duration, value) => music.currentTime = (duration / 100) * value


function next(songs, index, callback) {
    let nextSong
    callback()
    songs.forEach((item, i) => {
        if (item.src === index[0]) nextSong = songs[i + 1]
    })
    listSongs.forEach((item, i) => {
        if (item.innerText === nextSong.name) {
            listSongs[i - 1].classList.remove('actives')
            item.classList.add('actives')
        }
    })
    return nextSong
}

function previus(songs,index, callback) {
    let previusSong
    callback()
    songs.forEach((item, i) => {
        if (item.src === index[0]) previusSong = songs[i - 1]
    })
    listSongs.forEach((item, i) => {
        if (item.innerText === previusSong.name) {
            listSongs[i + 1].classList.remove('actives')
            item.classList.add('actives')
        }
    })

    return previusSong
}


export { controls, next, previus }

