// @ts-check

function write(){
    const sizeW = document.querySelector('#sizeW')
    const sizeH = document.querySelector('#sizeH')

    if(sizeW) sizeW.innerHTML = `Ancho: ${innerWidth}`
    if(sizeH) sizeH.innerHTML = `Alto: ${innerHeight}`
}

window.addEventListener('resize', write)
document.addEventListener('DOMContentLoaded', write)