export class BinaryConverter {
    convertions=[];

    getConvertions() {
        return this.convertions;
    }

    registerConvertion(convertion){
        this.convertions.push(convertion);
    }
}

export class BinaryToDecimal {
    convertions=[];
    name='Binary';
    selected=false;
    
    getConvertions() {
        return this.convertions;
    }

    registerConvertion(convertion){
        this.convertions.push(convertion);
    }
    
    //Will be done in the view
    isFromDecimal() {
        return false;
    }
}

export class DecimalToBinary {
    convertions=[];
    name='Decimal';
    selected=false;

    getConvertions() {       
        return this.convertions;
    }

    registerConvertion(convertion){
        this.convertions.push(convertion);
    }

    //Will be done in the view
    isFromDecimal() {
        return true;
    }
}

export class ConverterStrategy{
    convert(){}
    validateChain(){}
}

//FROM BINARY TO DECIMAL
export class Ca2ToDecimalConverter extends ConverterStrategy{
    name='Ca2';

    convert(chain,base){
        return '1';
    }

    validateChain(chain){
        return parseInt(chain)!=NaN;
    }
}

export class Ca1ToDecimalConverter extends ConverterStrategy{
    name='Ca1';

    convert(chain,base){
        if(chain[0]=='0'){
            //Debería usarse un método heredado que haga lo mismo que el Simple-to-Decimal
        }else{
            //Invertir números
            //Debería usarse un método heredado que haga lo mismo que el Simple-to-Decimal
            //Negativizar el número resultante
        }
    }

    validateChain(chain){
        return parseInt(chain)!=NaN;
    }
}

export class SimpleToDecimalConverter extends ConverterStrategy{
    name='Simple';

    convert(chain,base){
        var returnNumber=0;
        var chainArrayLength=chain.length-1;
        /*
        Take for example the chain 001101, that represents number 13 in decimal.
        i=5 -> 2^0 = 2^((chain.length-1)-i) = 2^(5-5) = 2^0
        i=4 -> 0^1
        i=3 -> 2^2 = 2^((chain.length-1)-i) = 2^(5-3) = 2^2
        i=2 -> 2^3 = 2^((chain.length-1)-i) = 2^(5-2) = 2^3
        i=1 -> 0^4
        i=0 -> 0^5
        */
        for(let i=chainArrayLength;i>=0;i--){
            if(chain[i]=='1'){
                returnNumber=returnNumber+Math.pow(2,chainArrayLength-i);
            }            
        }

        return returnNumber;
    }

    isBinary(chain){
        for(let i=0;i<chain.length;i++){
            console.log('entra');
            if(chain[i]!='0' && chain[i]!='1'){
                return false;
            }
        }
        return true;
    }

    validateChain(chain){
        return chain!='' && !isNaN(parseInt(chain)) && this.isBinary(chain);
    }
}


//FROM DECIMAL TO BINARY
export class DecimalToCa2Converter extends ConverterStrategy{
    name='Ca2';

    convert(chain,base){
        //Parse to Int since chain comes as a String
        var number=parseInt(chain);
        var newChain='';
        base=base-1;
        if((Math.pow(2,base)-1)>=number){
            //Keep dividing by 2 until the number=0
            while(number!=0){
                newChain=(number % 2)+newChain;
                number= Math.floor(number/2);
            }
            //Complete with 0's till 32 digits.
            while(newChain.length!=16){
                newChain='0'+newChain;
            }
        }else{
            newChain='Couldn\'t convert the given chain to base '+(base+1);
        }
        return newChain;
    }

    validateChain(chain){
        return chain!='' && !isNaN(parseInt(chain));
    }
}

export class DecimalToCa1Converter extends ConverterStrategy{
    name='Ca1';

    convert(chain,base){
        //Parse to Int since chain comes as a String
        var number=parseInt(chain);
        var newChain='';
        base=base-1; //I should only do this if the number is positive
        if((Math.pow(2,base)-1)>=number){
            //Keep dividing by 2 until the number=0
            while(number!=0){
                newChain=(number % 2)+newChain;
                number= Math.floor(number/2);
            }
            //Complete with 0's till 32 digits.
            while(newChain.length!=16){
                newChain='0'+newChain;
            }
        }else{
            newChain='Couldn\'t convert the given chain to base '+(base+1);
        }
        return newChain;
    }

    validateChain(chain){
        return chain!='' && !isNaN(parseInt(chain));
    }
}

export class DecimalToSimpleConverter extends ConverterStrategy{
    name='Simple';

    convert(chain,base){
        //Parse to Int since chain comes as a String
        var number=parseInt(chain);
        var newChain='';
        //Keep dividing by 2 until the number=0
        if((Math.pow(2,base)-1)>=number){
            while(number!=0){
                newChain=(number % 2)+newChain;
                number= Math.floor(number/2);
            }
            //Complete with 0's till 32 digits.
            while(newChain.length!=16){
                newChain='0'+newChain;
            }
        }else{
            newChain='Couldn\'t convert the given chain to base '+base;
        }
        return newChain;
    }

    validateChain(chain){
        //Should I check for the empty string in the view?
        return chain!='' && !isNaN(parseInt(chain));
    }
}

