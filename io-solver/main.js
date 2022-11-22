// @ts-check
import Fraction from "../common/Fraction.js"

import {
    P0,
    Pn,
    queueLength,
    queueWait,
    rho,
    systemLength,
    systemWait
} from './variosServidores.js'

import {
    frecuenciaEntrada,
    frecuenciaSalida,
    PnGreaterThan,
} from './unServidor.js'

const _l_ = 'λ'
const _m_ = 'μ'
const _r_ = 'ρ'

/**
 * Gets the numeric value of the input with the given id
 * @param {string} id 
 * @returns {number}
 */
function valueOf(id){
    const txt = document.getElementById(id)
    if(!txt) return NaN

    // @ts-ignore
    return Number(txt.value)
}

/**
 * Puts some text inside a label
 * @param {string} id 
 * @param {string} label
 * @param {Fraction|string} value 
 * @param {string} units
 */
function logInto(id, label, value, units){
    const lbl = document.getElementById(id)
    if(!lbl) return

    lbl.innerText = `${label}: ${value} ${units}`
}

/**
 * Writes the full results of percentage
 * @param {Fraction} percentage 
 */
function toPercentString(percentage){
    const inFraction = percentage.toString()
    const inDecimal = percentage.toNumber()
    const inPercent = `${(inDecimal * 100).toFixed(2)}%`

    return `${inFraction} = ${inDecimal.toFixed(4)} = ${inPercent}`
}

function canCalculate(){
    const l = valueOf('txtLambda')
    const m = valueOf('txtMiu')
    const s = valueOf('txtSer')

    // Todo es positivo y miu es mayor a lambda
    return l > 0 && m > 0 && m > l && s > 0 
}

function changeDisabled(){
    const btn = document.getElementById('btnCalc')
    // @ts-ignore
    if(btn) btn.disabled = !canCalculate() 
}

function calculate(){
    if(!canCalculate()) return
    // @ts-ignore
    const ut = String(document.getElementById('txtUT')?.value)

    const l = valueOf('txtLambda')
    const m = valueOf('txtMiu')
    const s = valueOf('txtSer')

    const r = rho(l ,m, s)

    const n = valueOf('txtN')
    const k = valueOf('txtK')
    

    // Lambda y Miu
    logInto('lblLambda', _l_, Fraction.for(l), `clientes por ${ut}`)
    logInto('lblMiu', _m_, Fraction.for(m), `clientes por ${ut}`)

    // a) Frecuencia de entrada
    const fe = frecuenciaEntrada(l)
    logInto('lblFEntrada', `1/${_l_}`, fe, `${ut} por cliente`)

    // b) Frecuencua de salida
    const fs = frecuenciaSalida(m)
    logInto('lblFSalida', `1/${_m_}`, fs, `${ut} por cliente`)

    // c) Probabilidad de que el sistema este ocioso
    const p0 = P0(r, l, m, s)
    logInto('lblPo', 'Po', toPercentString(p0), '')

    // d) Factor de utilización del sistema
    logInto('lblRho', _r_, toPercentString(r), '')

    // e) Numero de clientes en la fila
    const lq = queueLength(p0, r, l, m, s)
    logInto('lblQueueLength', 'Lq', lq, 'clientes en la fila')

    // f) Tiempo que pasan los clientes en la fila
    const wq = queueWait(lq, l)
    logInto('lblQueueWait', 'Wq', wq, `${ut} en la fila`)

    // g) Tiempo que pasan los clientes en el sistema
    const W = systemWait(wq, m)
    logInto('lblSystemWait', 'W', W, `${ut} en el sistema`)

    // h) Numero de clientes en el sistema
    const L = systemLength(W, l)
    logInto('lblSystemLength', 'L', L, 'clientes en el sistema')

    // i) Probabilidad de que haya n
    const p = Pn(n, p0, l, m, s)
    logInto('lblPn', `P${n}`, toPercentString(p), '')

    // j) Probabilidad de que haya mas de k
    // Solo si s = 1
    if(s === 1){
        const pnk = PnGreaterThan(k, r)
        logInto('lblPk', `Pn>${k}`, toPercentString(pnk), '')
    }
    else{
        logInto('lblPk', `Pn>${k}`, '?', '(No se encontró formula)')
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnCalc')?.addEventListener('click', calculate)
    document.getElementById('txtLambda')?.addEventListener('change', changeDisabled)
    document.getElementById('txtMiu')?.addEventListener('change', changeDisabled)
    document.getElementById('txtSer')?.addEventListener('change', changeDisabled)
    document.getElementById('txtN')?.addEventListener('change', changeDisabled)
    document.getElementById('txtK')?.addEventListener('change', changeDisabled)

})