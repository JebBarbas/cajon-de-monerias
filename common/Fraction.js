// @ts-check

/**
 * Retorna el maximo comun divisor entre dos numeros
 * @param {number} a 
 * @param {number} b 
 */
function mcd(a, b) {
    if(a === 0 || b === 0) throw new Error('No intentes hacer pendejadas con 0')
    let temporal;//Para no perder b
    while (b !== 0) {
        temporal = b;
        b = a % b;
        a = temporal;
    }
    return a;
}

/**
 * Retorna si el numero se está volviendo muy grande como para representarlo
 * como fracción
 * @param {number} number
 */
function isTooLarge(number){
    const MAX_DIGIT_COUNT = 6
    return String(number).length > MAX_DIGIT_COUNT
}

export default class Fraction {    
    numerator; 
    denominator;
    
    /**
     * Creates a new instance of a fraction
     * @param {number} numerator
     * @param {number} denominator
     */
    constructor(numerator, denominator){
        if(denominator === 0) throw new Error(`No se pueden crear fracciones con 0 como denominador: ${numerator}/${denominator}`)

        if(numerator === 0){
            // 0/a = 0; a != 0, entonces haré que a sea 1
            // para que sea el caso más sencillo

            this.numerator = numerator
            this.denominator = 1
        }
        else{
            // Se supone que ni numerator ni denominator son 0
            const $mcd = mcd(numerator, denominator)

            this.numerator = numerator / $mcd
            this.denominator = denominator / $mcd
        }
    }

    /**
     * Adds two fractions
     * @param {Fraction} f 
     */
    plus(f){
        return new Fraction(
            this.numerator * f.denominator + this.denominator * f.numerator, 
            this.denominator * f.denominator
        )
    }

    /**
     * Returns the negative of the fraction (-f)
     */
    negative(){
        return new Fraction(-this.numerator, this.denominator)
    }

    /**
     * Substracts two fractions
     * @param {Fraction} f 
     */
    minus(f){
        // this + (-f) = this - f
        return this.plus(f.negative())
    }

    /**
     * Multiplies two fractions
     * @param {Fraction} f 
     */
    multiplied(f){
        return new Fraction(
            this.numerator * f.numerator,
            this.denominator * f.denominator
        )
    }

    /**
     * Inverses the fraction (1/this)
     */
    inversed(){
        return new Fraction(this.denominator, this.numerator)
    }

    /**
     * Divides two fractions
     * @param {Fraction} f 
     */
    divide(f){
        // this * 1/f = this/f
        return this.multiplied(f.inversed())
    }

    /**
     * Powers the fraction to an exponent
     * @param {number} n 
     */
    pow(n){
        return new Fraction(
            this.numerator ** n,
            this.denominator ** n
        )
    }

    /**
     * Converts the fraction to a number
     */
    toNumber(){
        return this.numerator / this.denominator
    }

    toString(){

        if(this.denominator === 1) return ` ${this.numerator} `

        if(isTooLarge(this.numerator) || isTooLarge(this.denominator)){
            return ` ${this.toNumber().toFixed(4)} `
        }

        return ` ${this.numerator}/${this.denominator} `
    }

    /**
     * Creates a new fraction from an integer number
     * @param {number} n 
     */
    static for(n){
        return new Fraction(n, 1)
    }
}