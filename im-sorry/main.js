// @ts-check

/** 
 * Obtiene el texto que se mostrará dependiendo de los parametros dados 
 * @returns {string} Texto que dependerá de los parametros
 */
function getText(){
    /** Frase por defecto */
    const frase = 'meper d0nas'
    
    /** Parametros de la URL */
    const params = new URLSearchParams(window.location.search)
    if(params.has('text')){
        // Tiene un texto estático, se pondrá ese texto
        return params.get('text') ?? ''
    }
    else if(params.has('name')){
        // Tiene un nombre, se pone el nombre junto con la frase
        return `${frase} ${params.get('name')}?`
    }
    else {
        // No tiene parametros, solo muestra la frase
        return `${frase}?`
    }
}

/**
 * Regresa un HTMLElement dependiendo del id
 * @param {string} id id del elemento
 * @returns {HTMLElement} Un Elemento HTML
 */
function $(id){
    return document.getElementById(id) ?? document.createElement('div')
}

/**
 * Función que se ejecuta al presionar el botón
 */
function peroAmame(){
    // Se le da play al audio
    const audio = new Audio('song.mp3')
    audio.volume = 0.1
    audio.play()

    // Se oculta el botón
    $('btnAmame').classList.add('hidden')

    // Se le pone texto a la etiqueta, se pone visible y se pone a girar
    $('lblSorry').innerText = getText()
    $('lblSorry').classList.remove('hidden')
    $('lblSorry').classList.add('rotating')
    
    // En 10 segundos (cuando acabe de girar y cuando termine la canción)
    // se pondrá visible el confeti
    setTimeout(() => {
        $('imgConfeti').classList.remove('hidden')
    }, 10000);
}

// Se añade la función al evento click del botón
$('btnAmame').addEventListener('click', peroAmame)