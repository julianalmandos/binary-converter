export class InsufficientBits extends Error{
    constructor(bits){
        super();
        //FIXME: implement Vuex getter and LanguageManager helper function to handle value injection in translations.
        this.message = `Couldn't convert the chain to a ${bits}-digit decimal number.`;
    }
}