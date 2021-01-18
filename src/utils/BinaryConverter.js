import {InsufficientBits} from './Exceptions.js';

export class BinaryConverter {
    static getConvertions() {
        return [BinaryToDecimal, DecimalToBinary];
    }
}

export class ConverterStrategy {

    static validateChain(chain) {
        return chain != '' && !isNaN(parseInt(chain)) && this.isBinary(chain);
    }

    static revertChain(chain) {
        return chain.split('')
            .map(digit => digit == 0 ? 1 : 0)
            .join('');
    }

    static getName() {
        throw new Error('You should define #getName');
    }
    
    static convert() {
        throw new Error('You should define #convert.');
    }
}

export class BinaryToDecimal extends ConverterStrategy {

    static getLanguageKey() {
        return 'binary';
    }
    
    static getConvertions() {
        return [SimpleToDecimalConverter, Ca1ToDecimalConverter, Ca2ToDecimalConverter];
    }
    
    static isFromDecimal() {
        return false;
    }

    static validateChain(chain) {
        return chain != '' && !isNaN(parseInt(chain)) && this.isBinary(chain);
    }

    static isBinary(chain) {
        for (let i = 0; i < chain.length; i++) {
            if (chain[i] != '0' && chain[i] != '1'){
                return false;
            }
        }
        return true;
    }

    static convert(chain) {
        let returnNumber = 0;
        chain = chain.split('').reverse().join('');
        for (let i = 0; i < chain.length; i++) {
            if (chain[i] == '1') {
                returnNumber = returnNumber + Math.pow(2, i);
            }
        }
        return returnNumber;
    }
}

export class DecimalToBinary extends ConverterStrategy {

    static getLanguageKey() {
        return 'decimal';
    }

    static getConvertions() {
        return [DecimalToSimpleConverter, DecimalToCa1Converter, DecimalToCa2Converter];
    }

    static isFromDecimal() {
        return true;
    }

    static validateChain(chain) {
        return chain != '' && !isNaN(parseInt(chain));
    }

    static divideNumber(number) {
        let newChain = '';
        while (number != 0) {
            newChain = (number % 2) + newChain;
            number = Math.floor(number / 2);
        }
        return newChain;
    }

    static completeWithZeros(chain, bits) {
        return (new Array(bits - chain.length)).fill('0').join('') + chain;
    }
}

//FROM BINARY TO DECIMAL
export class Ca2ToDecimalConverter extends BinaryToDecimal {

    static getLanguageKey() {
        return 'ca2';
    }

    static convert(chain) {
        const isNegative = chain[0] == '1';
        if (isNegative) {
            const firstOneIndex = chain.lastIndexOf('1');
            const firstPart = this.revertChain(chain.substring(0, firstOneIndex)).split('');
            chain = firstPart.concat(chain.substring(firstOneIndex).split('')).join('');
        }
        let returnNumber = super.convert(chain);
        return isNegative ? returnNumber * (-1) : returnNumber;
    }
}

export class Ca1ToDecimalConverter extends BinaryToDecimal {

    static getLanguageKey() {
        return 'ca1';
    }

    static convert(chain){
        const isNegative = chain[0] == '1';
        if (isNegative) {
            chain = this.revertChain(chain);
        }
        let returnNumber = super.convert(chain);
        return isNegative ? returnNumber * (-1) : returnNumber;
    }
}

export class SimpleToDecimalConverter extends BinaryToDecimal {

    static getLanguageKey() {
        return 'simple';
    }
}


//FROM DECIMAL TO BINARY
export class DecimalToCa2Converter extends DecimalToBinary {

    static getLanguageKey() {
        return 'ca2';
    }

    static convert(chain, bits) {
        let newChain;
        let number=parseInt(chain);
        if ((Math.pow(2, bits - 1) - 1) >= number) {
            newChain = this.divideNumber(number);
            return this.completeWithZeros(newChain, bits);
        }
        
        throw new InsufficientBits(bits);
    }
}

export class DecimalToCa1Converter extends DecimalToBinary{

    static getLanguageKey() {
        return 'ca1';
    }

    static convert(chain, bits) {
        let number = parseInt(chain);
        if (number < 0) {
            number = number * (-1)
        }
        if ((Math.pow(2, bits - 1) - 1) >= number) {
            let newChain = this.completeWithZeros(this.divideNumber(number), bits);
            if (chain >= 0) {
                return newChain;
            }
            return this.revertChain(newChain);
            
        }
        
        throw new InsufficientBits(bits);
    }
}

export class DecimalToSimpleConverter extends DecimalToBinary{

    static getLanguageKey() {
        return 'simple';
    }

    static convert(chain, bits) {
        let number = parseInt(chain);
        if ((Math.pow(2, bits)-1) >= number) {
            let newChain = this.divideNumber(number);
            return this.completeWithZeros(newChain,bits);
        }
        throw new InsufficientBits(bits);
    }

    static validateChain(chain) {
        return chain>=0 && super.validateChain(chain);
    }
}

//Response {error: true/false, response: errorMsg/chain}
