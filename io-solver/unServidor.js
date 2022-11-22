// @ts-check
import Fraction from "../common/Fraction.js"


/** @param {number} lambda  */
export function frecuenciaEntrada(lambda){
    return new Fraction(1, lambda)
}

/** @param {number} miu */
export function frecuenciaSalida(miu){
    return new Fraction(1 , miu)
}

/**
 * @param {number} lambda 
 * @param {number} miu 
 */
export function systemLength(lambda, miu){
    return new Fraction(lambda, miu - lambda)
}

/**
 * @param {number} lambda 
 * @param {number} miu 
 */
export function systemWait(lambda, miu){
    return new Fraction(1, miu - lambda)
}

/**
 * @param {number} lambda 
 * @param {number} miu 
 */
export function queueLength(lambda, miu){
    return new Fraction(lambda ** 2, miu * (miu - lambda))
}

/**
 * @param {number} lambda 
 * @param {number} miu 
 */
export function queueWait(lambda, miu){
    return new Fraction(lambda, miu * (miu - lambda))
}

/**
 * @param {number} lambda 
 * @param {number} miu 
 */
export function rho(lambda, miu){
    return new Fraction(lambda, miu)
}

/**
 * @param {number} n 
 * @param {Fraction} rho 
 */
export function Pn(n, rho){
    return Fraction.for(1).minus(rho).multiplied(rho.pow(n))
}

/**
 * @param {number} k 
 * @param {Fraction} rho 
 */
export function PnGreaterThan(k, rho){
    return rho.pow(k + 1)
}
