export class InsufficientBits extends Error{
    constructor(bits){
        super();
        this.message='Couldn\'t convert the chain to a '+bits+' digit number';
    }
}