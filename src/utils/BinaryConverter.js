export class BinaryConverter {
    loadConvertions() {
        var convertions=[];
        convertions.push(new BinaryToDecimal());
        convertions.push(new DecimalToBinary());
        return convertions;
    }
}

export class BinaryToDecimal {
    name='Binary';
    selected=false;
    
    loadConvertions() {
        var convertions=[];
        convertions.push(new SimpleToDecimalConverter());
        convertions.push(new Ca1ToDecimalConverter());
        convertions.push(new Ca2ToDecimalConverter());
        return convertions;
    }
    
    isFromDecimal() {
        return false;
    }
}

export class DecimalToBinary {
    name='Decimal';
    selected=false;

    loadConvertions() {
        var convertions=[];
        convertions.push(new DecimalToSimpleConverter());
        convertions.push(new DecimalToCa2Converter());
        convertions.push(new DecimalToCa1Converter());        
        return convertions;
    }

    isFromDecimal() {
        return true;
    }
}


//FROM BINARY TO DECIMAL
export class Ca2ToDecimalConverter {
    name='Ca2';
    selected=false;

    convert(chain,base){
        return '1';
    }

    validateChain(chain){
        return parseInt(chain)!=NaN;
    }
}

export class Ca1ToDecimalConverter {
    name='Ca1';
    selected=false;

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

export class SimpleToDecimalConverter {
    name='Simple';
    selected=false;

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
export class DecimalToCa2Converter {
    name='Ca2';
    selected=false;

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

export class DecimalToCa1Converter {
    name='Ca1';
    selected=false;

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

export class DecimalToSimpleConverter {
    name='Simple';
    selected=false;

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
        return chain!='' && !isNaN(parseInt(chain));
    }
}

