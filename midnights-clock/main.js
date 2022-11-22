// @ts-check

// Letra mostrada inicial
let actualLyric = 'Meet me at Midnight'

/**
 * Agrega un 0 antes del numero si es de un digito
 * @param {number} param 
 * @returns {string}
 */
function fix(param){
    return String(param).padStart(2,'0')
}

/**
 * Pone la hora actual en el elemento currentHour
 * @param {number} hour Hora actual
 * @param {number} minute Minuto actual
 * @param {number} second Segundo actual
 * @param {string} ampm Es 'am' o 'pm'?
 */
function setCurrentHour(hour, minute, second, ampm){
    const currentHour = document.getElementById('currentHour')

    if(currentHour){
        currentHour.innerText = `${fix(hour)}:${fix(minute)}:${fix(second)} ${ampm}`
    }
}

/**
 * Pone la letra indicada en el elemento lyric
 * @param {string} lyric 
 */
function setLyric(lyric){
    const lyricEl = document.getElementById('lyric')
    if(lyricEl){
        lyricEl.innerText = lyric
    }
}

/**
 * Obtiene el nuevo valor para el transform del elemento
 * @param {number} rotation 
 */
function getTransform(rotation){
    const TRANSLATE_CONST = 5
    return `translate(${TRANSLATE_CONST}px) rotate(${rotation}deg)`
}

/**
 * Ajusta las manecillas del reloj para coincidir con la hora
 * actual
 */
function adjustClock() {    
    const hourArrow = document.getElementById('hourArrow')
    const minuteArrow = document.getElementById('minuteArrow')

    // Obtiene la hora en formato de 12 horas (para el reloj) y si es AM o PM
    const fullHour = new Date().getHours()
    const [hour, ampm] = [fullHour % 12, fullHour > 12 ? 'pm' : 'am']

    const minute = new Date().getMinutes()
    const second = new Date().getSeconds()

    setCurrentHour(hour, minute, second, ampm)

    // Usa regla de 3 para obtener la rotacion de la flecha de hora
    // Suma los minutos totales del dia y en base a eso se establece
    // la duracion
    const totalHours = hour + (minute / 60)

    const hourArrowRotation = (totalHours * 360) / 12
    const minuteArrowRotation = (minute * 360) / 60

    if(hourArrow && minuteArrow){
        hourArrow.style.transform = getTransform(hourArrowRotation)
        minuteArrow.style.transform = getTransform(minuteArrowRotation)
    }
}

/**
 * Crea estrellas y las posiciona al azar en el elemento starsContainer
 * @param {number} starCount Numero de estrellas contadas
 */
function createStars(starCount = 200){
    const TWINKLE = 3
    
    const starsContainer = document.getElementById('starsContainer')
    if(!starsContainer) return 

    starsContainer.innerHTML = ''
    for (let i = 0; i < starCount; i++) {
        let star = document.createElement('div')
        star.classList.add('star')
        star.style.display = 'absolute'
        star.style.animation = `twinkle ${Math.random() * 5 + TWINKLE}s linear ${Math.random() * 5 + TWINKLE}s infinite`
        star.style.top = `${Math.random() * window.innerHeight}px`
        star.style.left = `${Math.random() * window.innerWidth}px`
        
        starsContainer.append(star);
    }
}

window.addEventListener('resize', () => createStars())

document.addEventListener('DOMContentLoaded', () => {
    createStars()
    adjustClock()
    setLyric(actualLyric)
    setInterval(adjustClock, 1000)
})

document.getElementById('lyric')?.addEventListener('click', () => {
    const newLyric = prompt('Escribe la nueva lyric que será mostrada', actualLyric)
    if(newLyric){
        actualLyric = newLyric
        setLyric(newLyric)
    }
})