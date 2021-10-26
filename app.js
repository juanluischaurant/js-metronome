import Timer from './timer.js'
const tempoDisplay = document.querySelector('.tempo')
const tempoText = document.querySelector('.tempo-text')
const decreaseTempoBt = document.querySelector('.decrease-tempo')
const increaseTempoBt = document.querySelector('.increase-tempo')
const tempoSlider = document.querySelector('.tempo-slider')
const startStopBt = document.querySelector('.start-stop')
const subtractBeats = document.querySelector('.subtract-beats')
const addBeats = document.querySelector('.add-beats')
const measureCount = document.querySelector('.measure-count')

const click2 = new Audio('./sounds/stick1.mp3')
const click1 = new Audio('./sounds/stick2.mp3')

const MIN_BPM = 20, MAX_BPM = 300

let bpm = 140, measureLength = 4, count = 0, isRunning = false


decreaseTempoBt.addEventListener('click', () => {
	
	if(bpm <= MIN_BPM) {
		return
	} else {
		bpm--
		updateMetronome()
		
	}

})

increaseTempoBt.addEventListener('click', () => {
	if(bpm >= MAX_BPM) {
		return
	} else {
		bpm++
		updateMetronome()
		
	}
})

tempoSlider.addEventListener('input', () => {
	bpm = tempoSlider.value
	updateMetronome()
})

subtractBeats.addEventListener('click', () => {
	if(measureLength <= 1) {
		return
	} else {
		measureLength--
		measureCount.textContent = measureLength
		
	}
})

addBeats.addEventListener('click', () => {
	if(measureLength >= 20) {
		return
	} else {
		measureLength++
		measureCount.textContent = measureLength
		
	}
})

function updateMetronome() {
	metronome.timeInterval = 60000/bpm
	count = 0
	tempoDisplay.textContent = bpm
	tempoSlider.value = bpm

	if(bpm <= 24) { tempoText.textContent = 'Larghissimo (very, very slow)' }
	if(bpm > 24 && bpm <= 40) { tempoText.textContent = 'Adagissimo (very slow)' }
	if(bpm > 40 && bpm <= 59) { tempoText.textContent = 'Largo (slow & broad)' }
	if(bpm >= 60 && bpm <= 65) { tempoText.textContent = 'Larghetto (rather slow & broad)' }
	if(bpm > 66 && bpm <= 76) { tempoText.textContent = 'Adagio (slow with great expression)' }
	if(bpm > 76 && bpm <= 108) { tempoText.textContent = 'Andante (at a walking pace)'}
	if(bpm > 108 && bpm < 120) { tempoText.textContent = 'Moderato (at a moderate speed)'}
	if(bpm >= 120 && bpm < 156) {tempoText.textContent = 'Allegro (fast, quick, and bright)'}
	if(bpm >= 156 && bpm < 168) {tempoText.textContent = 'Vivace (lively and fast)'}
	if(bpm >= 168 && bpm < 200) {tempoText.textContent = 'Presto - very, very fast'}
	if(bpm >= 200) {tempoText.textContent = 'Prestissimo – even faster than presto'}
}


function playClick() {
	if(count === measureLength) {
		count = 0
	}
	if(count === 0) {
		click1.play()
		click1.currentTime = 0
	} else { 
		click2.play()
		click2.currentTime = 0
	}
	count++
}

const metronome = new Timer(playClick, 60000/bpm, {immediate: true})

startStopBt.addEventListener('click', ()=>{
	
	if(!isRunning) {
		metronome.start()
		isRunning = true
		startStopBt.textContent = 'STOP'
	} else {
		metronome.stop()
		isRunning = false
		startStopBt.textContent = 'START'
	}
})

// metronome.start()
updateMetronome()