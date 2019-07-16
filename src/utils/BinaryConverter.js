export class BinaryConverter {
    convertions=[];

    getConvertions() {
        return [new BinaryToDecimal(),new DecimalToBinary()];
    }
}

export class ConverterStrategy{
    
}

export class BinaryToDecimal extends ConverterStrategy{
    name='Binary';
    
    getConvertions() {
        return [new SimpleToDecimalConverter(), new Ca1ToDecimalConverter(), new Ca2ToDecimalConverter()];
    }
    
    //Will be done in the view
    isFromDecimal() {
        return false;
    }

    //It's the same for all strategies
    validateChain(chain){
        return chain!='' && !isNaN(parseInt(chain)) && this.isBinary(chain);
    }

    //It's the same for all strategies
    isBinary(chain){
        for(let i=0;i<chain.length;i++){
            console.log('entra');
            if(chain[i]!='0' && chain[i]!='1'){
                return false;
            }
        }
        return true;
    }
}

export class DecimalToBinary extends ConverterStrategy{
    name='Decimal';

    getConvertions() {       
        return [new DecimalToSimpleConverter(), new DecimalToCa1Converter(), new DecimalToCa2Converter()];
    }

    //Will be done in the view
    isFromDecimal() {
        return true;
    }

    divideNumber(number){
        var newChain='';
        while(number!=0){
            newChain=(number % 2)+newChain;
            number= Math.floor(number/2);
        }
        return newChain;
    }

    completeWithZeros(chain,bits){
        while(chain.length!=bits){
            chain='0'+chain;
        }
        return chain;
    }

    validateChain(chain){
        //Should I check for the empty string in the view?
        return chain!='' && !isNaN(parseInt(chain));
    }
}

//FROM BINARY TO DECIMAL
export class Ca2ToDecimalConverter extends BinaryToDecimal{
    name='Ca2';

    convert(chain,base){
        if(chain[0]=='0'){
            //Debería usarse un método heredado que haga lo mismo que el Simple-to-Decimal  
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
        }else{
            //Debería usarse un método heredado que haga lo mismo que el Simple-to-Decimal
            var returnNumber=0;
            var chainArrayLength=chain.length-2;
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
    }
}

export class Ca1ToDecimalConverter extends BinaryToDecimal{
    name='Ca1';

    revertChain(chain){
        //Can't change single characters in strings. I use #split() to convert it to an array and then #join() to make a string again.
        chain=chain.split('');        
        for(let i=0;i<chain.length;i++){
            if(chain[i]=='0'){
                chain[i]='1';
            }else{
                chain[i]='0';
            }
        }
        console.log(chain.join(''));
        return chain;
    }

    convert(chain,base){
        if(chain[0]=='0'){
            //Debería usarse un método heredado que haga lo mismo que el Simple-to-Decimal  
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
        }else{
            //Invertir números
            chain=this.revertChain(chain);
            //Debería usarse un método heredado que haga lo mismo que el Simple-to-Decimal
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

            //Negativizar el número resultante
            return returnNumber*(-1);
        }
    }
}

export class SimpleToDecimalConverter extends BinaryToDecimal{
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
}


//FROM DECIMAL TO BINARY
export class DecimalToCa2Converter extends DecimalToBinary{
    name='Ca2';

    convert(chain,bits){
        //Parse to Int since chain comes as a String
        var newChain;
        var number=parseInt(chain);
        bits=bits-1;
        if((Math.pow(2,bits)-1)>=number){
            //Keep dividing by 2 until the number=0
            newChain=this.divideNumber(number);
            
            //Complete with 0's till 16 digits.
            return this.completeWithZeros(newChain,bits+1);
        }
        
        return 'Couldn\'t convert the given chain to a '+(bits+1)+' digit binary number.';
    }
}

export class DecimalToCa1Converter extends DecimalToBinary{
    name='Ca1';

    convert(chain,bits){
        //Parse to Int since chain comes as a String
        var newChain;
        var number=parseInt(chain);
        bits=bits-1; //I should only do this if the number is positive
        if((Math.pow(2,bits)-1)>=number){
            //Keep dividing by 2 until the number=0
            newChain=this.divideNumber(number);
            //Complete with 0's till 16 digits.
            return this.completeWithZeros(newChain,bits+1);
        }
        
        return 'Couldn\'t convert the given chain to a '+(bits+1)+' digit binary number.';
    }
}

export class DecimalToSimpleConverter extends DecimalToBinary{
    name='Simple';

    convert(chain,bits){
        //Parse to Int since chain comes as a String
        var newChain;
        var number=parseInt(chain);
        if((Math.pow(2,bits)-1)>=number){
            //Keep dividing by 2 until the number=0
            newChain=this.divideNumber(number);
            //Complete with 0's till 16 digits.
            return this.completeWithZeros(newChain,bits);
        }
        
        return 'Couldn\'t convert the given chain to a '+bits+' digit binary number.';
    }
}

