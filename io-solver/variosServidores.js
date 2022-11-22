// @ts-check

import Fraction from "../common/Fraction.js"

/**
 * Retorna el factorial de un numero
 * @param {number} n 
 * @returns {number}
 */
function factorial(n) {
    if(n <= 1) return 1
    return n * factorial(n - 1)
}

/**
 * @param {number} lambda 
 * @param {number} miu 
 * @param {number} n 
 */
function P0Term(lambda, miu, n){
    const denominator = new Fraction(lambda, miu).pow(n)
    const term = denominator.divide(new Fraction(factorial(n), 1))

    return term
}

/**
 * @param {number} lambda 
 * @param {number} miu 
 * @param {number} ser 
 */
function P0Sumatoria(lambda, miu, ser){
    let sum = Fraction.for(0)

    for(let n = 0; n < ser; n++){
        sum = sum.plus(P0Term(lambda, miu, n))
    }

    return sum
}

/**
 * @param {number} lambda 
 * @param {number} miu 
 * @param {number} ser 
 */
export function rho(lambda, miu, ser){
    return new Fraction(lambda, ser * miu)
}

/**
 * @param {Fraction} rho
 * @param {number} lambda 
 * @param {number} miu 
 * @param {number} ser 
 */
export function P0(rho, lambda, miu, ser){
    const sum = P0Sumatoria(lambda, miu, ser)
    const terminoS = P0Term(lambda, miu, ser)

    const one = Fraction.for(1)
    const parentesisGrande = one.minus(rho).inversed()

    return sum.plus(terminoS.multiplied(parentesisGrande)).inversed()
}

/**
 * @param {Fraction} p0
 * @param {Fraction} rho
 * @param {number} lambda 
 * @param {number} miu 
 * @param {number} ser 
 */
export function queueLength(p0, rho, lambda, miu, ser){
    const elevado = new Fraction(lambda, miu).pow(ser)
    const numerator = p0.multiplied(elevado).multiplied(rho)

    const elevado2 = Fraction.for(1).minus(rho).pow(2)
    const denominator = Fraction.for(factorial(ser)).multiplied(elevado2)

    return numerator.divide(denominator)
}

/**
 * @param {Fraction} queueLength 
 * @param {number} lambda 
 */
export function queueWait(queueLength, lambda){
    return queueLength.divide(Fraction.for(lambda))
}

/**
 * @param {Fraction} queueWait 
 * @param {number} miu 
 */
export function systemWait(queueWait, miu){
    return queueWait.plus(new Fraction(1, miu))
}

/**
 * @param {Fraction} systemWait 
 * @param {number} lambda 
 */
export function systemLength(systemWait, lambda){
    return Fraction.for(lambda).multiplied(systemWait)
}

/**
 * 
 * @param {number} n 
 * @param {Fraction} p0 
 * @param {number} lambda 
 * @param {number} miu 
 * @param {number} ser 
 */
export function Pn(n, p0, lambda, miu, ser){
    const numerator = new Fraction(lambda, miu).pow(n)
    const denominador = 0 <= n && n <= ser ?
        factorial(n)
    :
        factorial(ser) * (ser ** (n - ser))

    return numerator.divide(Fraction.for(denominador)).multiplied(p0)
}