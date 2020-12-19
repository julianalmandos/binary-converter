<template>
  <div class="menu">
    <h2 class="classy-subtitle">Convert from</h2>
    <div class="flex-around">
      <button :class="[convertion.selected ? 'classy-selected-button' : null, 'classy-button', 'classy-shadow', 'dotted']" v-for="convertion in fromConvertions" :key="convertion.name" @click="selectFromConvertion(convertion)">{{convertion.name}}</button>
    </div>
    <div v-if="toConvertions.length!=0">
      <h2 class="classy-subtitle">{{fromSelected.isFromDecimal() ? 'to' : 'with chain type'}}</h2>
      <div class="flex-around">
        <button :class="[convertion.selected ? 'classy-selected-button' : null, 'classy-button', 'classy-shadow', 'dotted']" v-for="convertion in toConvertions" :key="convertion.name" @click="selectToConvertion(convertion)">{{convertion.name}}</button>
      </div>
    </div>
    <div v-if="toSelected!=null">
      <form class="classy-form" @submit.stop.prevent="makeConvertion">
        <div class="flex-around">
          <input :class="[fromSelected.isFromDecimal() ? 'classy-number-input' : 'classy-bits-input', 'classy-shadow', 'classy-input']" :maxlength="fromSelected.isFromDecimal() ? '' : '16'" type="text" v-model="chain" :placeholder="fromSelected.isFromDecimal() ? 'Number' : 'Chain'"/><input class="classy-bits-counter classy-shadow classy-input" v-if="!fromSelected.isFromDecimal()" :placeholder="chain.length" disabled/>
          <input v-if="fromSelected.isFromDecimal()" class="classy-small-input classy-shadow classy-input" type="text" v-model="bits" placeholder="Bits"/>
        </div>
        <div class="flex-around">
          <button class="classy-button classy-selected-button classy-shadow dotted" type="submit">Generate!</button>
          <button class="classy-button classy-selected-button classy-shadow dotted" type="button" @click.stop.prevent="resetForm">Reset</button>
        </div>        
      </form>
    </div>
    <div class="classy-progress-bar-container" v-show="showLoadingBar">
      <div class="classy-progress-bar-box classy-shadow">
        <div class="classy-progress-bar dotted" ref="progressBar"></div>
      </div>
    </div>
    <div v-if="result!=null">
      <h1 class="classy-subtitle classy-end classy-result classy-shadow dotted">Result: {{result}}</h1>
    </div>
    <div v-if="resultError">
      <h1 class="classy-subtitle classy-end classy-warning classy-shadow dotted">Result: {{resultError.message}}</h1>
    </div>
    <div v-if="error">
      <h1 class="classy-subtitle classy-end classy-error classy-shadow dotted">Error: {{error.message}}</h1>
    </div>
  </div>
</template>

<script>
  import {BinaryConverter, BinaryToDecimal, DecimalToBinary, Ca2ToDecimalConverter, Ca1ToDecimalConverter, SimpleToDecimalConverter, DecimalToSimpleConverter, DecimalToCa2Converter, DecimalToCa1Converter} from '../utils/BinaryConverter.js'
  import completeBar from '../utils/retro-progress-bar.js'
  import Vuex from 'vuex'

  export default {
    name: 'Menu',  
    data() {
      return {
        fromConvertions: [],
        toConvertions: [],
        fromSelected: null,
        toSelected: null,
        chain: '',
        result: null,
        resultError: null,
        error: null,
        showLoadingBar: false,
        bits: null,
      }
    },
    mounted() {
      var binaryConvertions=new BinaryConverter().getConvertions();

      binaryConvertions.forEach(convertion => {
        convertion.selected=false;
      })

      this.fromConvertions=binaryConvertions;
    },
    methods: {
      ...Vuex.mapActions([
        'addRecordAction',
      ]),
      //Load secondary convertions when selecting an option
      selectFromConvertion(convertion){
        this.fromConvertions.forEach(convertion => {
          convertion.selected=false;
        })
        //Would be good to select or not in the same function
        convertion.selected=true;
        this.fromSelected=convertion;
        this.resetToSelection();
        this.toConvertions=convertion.getConvertions();
      },
      selectToConvertion(convertion){
        this.toConvertions.forEach(convertion => {
          convertion.selected=false;
        })
        convertion.selected=true;
        this.toSelected=convertion;
      },
      resetToSelection(){
        this.toSelected=null;
        this.chain='';
        this.bits='';
        this.result=null;
        this.error=null;
        this.resultError=null;
      },
      resetForm(){
        this.fromConvertions.forEach(convertion => {
          convertion.selected=false;
        })
        this.toConvertions=[];
        this.fromSelected=null;
        this.resetToSelection();
      },
      async makeConvertion(){
        this.result=null;
        this.error=null;
        this.resultError=null;
        //Validates the chain, then converts if valid
        if(this.toSelected.validateChain(this.chain)){
          if(this.bits!='' | (!this.fromSelected.isFromDecimal())){
            if(this.bits<=32){
              this.showLoadingBar=true;
              await completeBar(this.$refs.progressBar)
                .then(result => {
                  this.result=this.toSelected.convert(this.chain,this.bits);
                  this.recordOperation();
                })
                .catch(error => {
                  this.resultError=error;
                })
                .finally(() => {
                  this.showLoadingBar=false;
                })
            }else{
              //Shows error if the chain is invalid
              this.error={message:'can\'t generate numbers with >32 bits'};
            }
          }else{
            this.error={message:'please specify the number of bits'};
          }
        }else{
          //Shows error if the chain is invalid
          this.error={message:'invalid chain'};
        }
      },
      recordOperation(){
        this.addRecordAction({
          from: this.fromSelected.name,
          to: this.toSelected.name,
          chain: this.chain,
          bits: this.bits,
          result: this.result,
        })
      }
    }
  }
</script>

<style>

.flex-around {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

/* FIXME: these buttons should be a different component */
.classy-button {
  border: 1px solid var(--black);
  color: var(--black);
  padding: 10px 20px;
  text-align: center;
  font-size: 16px;
}

.classy-error, .classy-button {
  background-color: var(--primaryRed);
}

.classy-selected-button, .classy-result {
  background-color: var(--primaryGreen);
}

.classy-button:hover, .classy-selected-button:hover {
  background-color: whitesmoke;
  cursor: pointer;
}

.classy-subtitle {
  font-style: italic;
}

.classy-input {
  font-size: 3rem;
  text-align:center;
  background-color: var(--primaryWhite);
  border: 1px solid var(--black);
  margin: 40px 0px;
}

.classy-bits-input, .menu {
  width:60%;
}

.classy-number-input {
  width:50%;
}

.classy-small-input {
  width:20%;
}

.classy-bits-counter {
  width:10%;
}

.classy-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.classy-progress-bar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 0 0 0;
}

.classy-progress-bar-box {
  display: flex;
  border: 1px solid var(--black);
  text-align: center;
  width: 300px;
}

.classy-progress-bar {
  height: 24px;
  background-color: var(--black);
  width: 25%;
}

.classy-end {
  border: 1px solid var(--black);
  margin: 0 15px;
}

.classy-warning {
  background-color: var(--primaryYellow);
}
</style>




