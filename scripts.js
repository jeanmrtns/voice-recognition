const result = document.querySelector('.recognition-result')
const btn = document.querySelector('.recognize-btn')
let listening = false
const recognition = recognize()

btn.addEventListener('click', (e) => {
    if(!recognition) return

    listening ? recognition.stop() : recognition.start()

    btn.innerHTML = listening ? 'Start listening' : 'Stop listening'
})

function recognize() {

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = SpeechRecognition !== undefined ? new SpeechRecognition() : null

    if(!recognition) {
        result.innerHTML = 'Speech recognition is not found!'
        return null
    }

    recognition.lang = 'pt_BR'

    recognition.onstart = (e) => listening = true
    recognition.onend = (e) => listening = false
    recognition.onerror = (e) => console.log(e)

    recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript
        console.log(transcript)
        result.innerHTML = transcript
        
    } 
    
    return recognition

}

