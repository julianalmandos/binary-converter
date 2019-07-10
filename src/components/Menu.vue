<template>
  <div class="menu">
    <h2 class="classySubtitle">Convert from</h2>
    <div class="buttons">
      <button :class="[convertion.selected ? 'classySelectedButton' : 'classyButton']" v-for="convertion in fromConvertions" :key="convertion.name" @click="selectFromConvertion(convertion)">{{convertion.name}}</button>
    </div>
    <div v-if="toConvertions.length!=0">
      <h2 class="classySubtitle">{{fromSelected.isFromDecimal() ? 'to' : 'with chain type'}}</h2>
      <div class="buttons">
        <button :class="[convertion.selected ? 'classySelectedButton' : 'classyButton']" v-for="convertion in toConvertions" :key="convertion.name" @click="selectToConvertion(convertion)">{{convertion.name}}</button>
      </div>
    </div>
    <div v-if="toSelected!=null">
      <form class="classyForm" @submit.stop.prevent="makeConvertion">
        <input class="classyInput" type="text" v-model="chain"/>
        <div class="buttons">
          <button class="classySelectedButton" type="submit">Generate!</button>
          <button class="classySelectedButton" type="button" @click.stop.prevent="resetForm">Reset</button>
        </div>        
      </form>
    </div>
    <div class="classyProgressBarContainer" v-show="loading">
      <div class="classyProgressBarBox">
        <div class="classyProgressBar" ref="progressBar"></div>
      </div>
    </div>
    <div v-if="result!=null">
      <h1 class="classySubtitle classyResult">Result: {{result}}</h1>
    </div>
    <div v-if="showChainError">
      <h1 class="classySubtitle classyError">Error: invalid chain</h1>
    </div>
  </div>
</template>

<script>
  import {BinaryConverter, BinaryToDecimal, DecimalToBinary, Ca2ToDecimalConverter, Ca1ToDecimalConverter, SimpleToDecimalConverter, DecimalToSimpleConverter, DecimalToCa2Converter, DecimalToCa1Converter} from '../utils/BinaryConverter.js'
  import completeBar from '../utils/retro-progress-bar.js' 

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
        showChainError: false,
        loading: false,
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
        this.toSelected= null;
        this.chain= '';
        this.result= null;
        this.showChainError= false;
        this.loading= false;
      },
      resetForm(){
        this.fromConvertions.forEach(convertion => {
          convertion.selected=false;
        })
        this.toConvertions=[];
        this.fromSelected= null;
        this.resetToSelection();
      },
      async makeConvertion(){
        this.result=null;
        this.showChainError=false;
        //Validates the chain, then converts if valid
        if(this.toSelected.validateChain(this.chain)){
          this.loading=true;
          await completeBar(this.$refs.progressBar)
            .then(result => {
              this.result=this.toSelected.convert(this.chain,16);
              this.loading=false;
            });
        }else{
          //Shows error if the chain is invalid
          this.showChainError=true;
        }
      }
    }
  }
</script>

<style>
  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }

  .classyButton {
    background-color: lightcoral; /* Green */
    border: 1px solid black;
    color: black;
    padding: 10px 20px;
    text-align: center;
    font-size: 16px;
    -webkit-box-shadow: 5px 5px 0px -1px rgba(0,0,0,0.75);
    -moz-box-shadow: 5px 5px 0px -1px rgba(0,0,0,0.75);
    box-shadow: 5px 5px 0px -1px rgba(0,0,0,0.75);
  }

  .classySelectedButton {
    background-color: lightgreen; /* Green */
    border: 1px solid black;
    color: black;
    padding: 10px 20px;
    text-align: center;
    font-size: 16px;
    -webkit-box-shadow: 5px 5px 0px -1px rgba(0,0,0,0.75);
    -moz-box-shadow: 5px 5px 0px -1px rgba(0,0,0,0.75);
    box-shadow: 5px 5px 0px -1px rgba(0,0,0,0.75);
  }

  .classyButton:hover, .classySelectedButton:hover {
    background-color: white;
    cursor: pointer;
  }

  .classySubtitle {
    font-style: italic;
  }

  .classyInput {
    width:50%;
    font-size: 50px;
    text-align:center;
    background-color: whitesmoke;
    -webkit-box-shadow: 5px 5px 0px -1px rgba(0,0,0,0.75);
    -moz-box-shadow: 5px 5px 0px -1px rgba(0,0,0,0.75);
    box-shadow: 5px 5px 0px -1px rgba(0,0,0,0.75);
    margin: 40px 0px 40px 0px;
  }

  .classyForm {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .classyResult {
    background-color: lightgreen;
    border: 1px solid black;
    -webkit-box-shadow: 5px 5px 0px -1px rgba(0,0,0,0.75);
    -moz-box-shadow: 5px 5px 0px -1px rgba(0,0,0,0.75);
    box-shadow: 5px 5px 0px -1px rgba(0,0,0,0.75);
  }

  .classyProgressBarContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 40px 0 0 0;
  }

  .classyProgressBarBox {
    display: flex;
    flex-direction: row;
    border: 1px solid black;
    text-align:center;
    width:300px;
    -webkit-box-shadow: 5px 5px 0px -1px rgba(0,0,0,0.75);
    -moz-box-shadow: 5px 5px 0px -1px rgba(0,0,0,0.75);
    box-shadow: 5px 5px 0px -1px rgba(0,0,0,0.75);
  }

  .classyProgressBar {
    height:24px;
    background-color: black;
    width:25%;
  }

  .classyError {
    background-color: lightcoral;
    border: 1px solid black;
    -webkit-box-shadow: 5px 5px 0px -1px rgba(0,0,0,0.75);
    -moz-box-shadow: 5px 5px 0px -1px rgba(0,0,0,0.75);
    box-shadow: 5px 5px 0px -1px rgba(0,0,0,0.75);
  }
</style>




