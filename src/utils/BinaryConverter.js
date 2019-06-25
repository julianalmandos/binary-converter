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
        return '2';
    }

    validateChain(chain){
        return parseInt(chain)!=NaN;
    }
}

export class SimpleToDecimalConverter {
    name='Simple';
    selected=false;

    convert(chain,base){
        return '3';
    }

    validateChain(chain){
        return parseInt(chain)!=NaN;
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

