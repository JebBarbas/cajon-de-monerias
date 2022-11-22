// @ts-check

const projects = [
    {
        name: 'Reloj Midnights',
        slug: 'midnights-clock',
        description: 'Reloj con temática de Midnights muy bonito en honor a Taylor Swift.',
        stars: 5
    },
    {
        name: 'Solucionador de IO',
        slug: 'io-solver',
        description: 'Calculadora para la unidad 5 de IO, para un servidor y muchos servidores.',
        stars: 4.5
    },
    {
        name: `Meper donas?`,
        slug: 'im-sorry',
        description: 'Página que hice para disculparme de una forma divertida.',
        stars: 3
    },
    {
        name: 'Propiedades de Pantalla',
        slug: 'screen-properties',
        description: 'Pequeña pagina que te dice algunas propiedades de tu pantalla.',
        stars: 1
    }
]

/**
 * Obtiene la cantidad de estrellas, media estrellas y estrellas vacias
 * @param {number} stars 
 */
function getStars(stars){
    const enteras = Math.floor(stars)
    const medias = stars % 1 === 0 ? 0 : 1
    const vacias = 5 - enteras - medias

    return [enteras, medias, vacias]
}

/**
 * Crea una estrella con la clase adicional que dice como esta
 * @param {string} aditionalClass 
 */
function createStar(aditionalClass){
    const iconClass = 'star'
    const size = 'is-small'

    const i = document.createElement('i')
    i.classList.add('nes-icon', iconClass, size, aditionalClass)

    return i
}

/**
 * Crea las estrellas y las pone en un icon-list, el cual regresa
 * @param {number} stars 
 */
function createStars(stars){
    const [enteras, medias, vacias] = getStars(stars)
    const il = document.createElement('div')

    il.classList.add('icon-list')

    for(let i = 0; i < enteras; i++){
        il.appendChild(createStar('is-full'))
    }

    for(let i = 0; i < medias; i++){
        il.appendChild(createStar('is-half'))
    }

    for(let i = 0; i < vacias; i++){
        il.appendChild(createStar('is-empty'))
    }

    return il
}

function construir(){
    const ul = document.getElementById('list') ?? document.createElement('ul')
    for(let project of projects){
        const li = document.createElement('li')
        const a = document.createElement('a')
        const p = document.createElement('p')
        const iconL = document.createElement('section')

        iconL.classList.add('icon-list')

        a.setAttribute('href', `./${project.slug}`)

        a.innerText = project.name
        p.innerText = project.description

        li.appendChild(a)
        
        ul.appendChild(li)
        ul.appendChild(createStars(project.stars))
        ul.appendChild(p)
    }
}

document.addEventListener('DOMContentLoaded', construir)