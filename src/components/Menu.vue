<template>
  <div class="menu">
    <h2 class="classy-subtitle">Convert from</h2>
    <div class="flex-around">
      <Button
        :theme="convertion.selected ? 'green' : null"
        v-for="convertion in fromConvertions"
        :key="convertion.getName()"
        @click="selectFromConvertion(convertion)"
      >{{convertion.getName()}}</Button>
    </div>
    <div v-if="toConvertions.length!=0">
      <h2 class="classy-subtitle">{{fromSelected.isFromDecimal() ? 'to' : 'with chain type'}}</h2>
      <div class="flex-around">
        <Button
          :theme="convertion.selected ? 'green' : null"
          v-for="convertion in toConvertions"
          :key="convertion.getName()"
          @click="selectToConvertion(convertion)"
        >{{convertion.getName()}}</Button>
      </div>
    </div>
    <div v-if="toSelected!=null">
      <form class="classy-form" @submit.stop.prevent="makeConvertion">
        <div class="flex-around">
          <Input
            :class="[fromSelected.isFromDecimal() ? 'classy-number-input' : 'classy-bits-input']"
            :maxlength="fromSelected.isFromDecimal() ? '' : '16'"
            type="text"
            v-model="chain"
            :placeholder="fromSelected.isFromDecimal() ? 'Number' : 'Chain'"/>
          <Input
            v-if="!fromSelected.isFromDecimal()"
            class="classy-bits-counter"
            :placeholder="chain.length"
            disabled/>
          <Input
            v-else
            class="classy-small-input"
            type="text"
            v-model="bits"
            placeholder="Bits"/>
        </div>
        <div class="flex-around form-buttons">
          <Button
            class="shadow dotted"
            :theme="'green'"
            type="submit"
          >Generate!</Button>
          <Button
            class="shadow dotted"
            :theme="'yellow'"
            type="button"
            @click="resetForm"
          >Reset</Button>
        </div>        
      </form>
    </div>
    <div class="classy-progress-bar-container" v-show="showLoadingBar">
      <div class="classy-progress-bar-box shadow">
        <div class="classy-progress-bar dotted" ref="progressBar"></div>
      </div>
    </div>
    <div v-if="result!=null">
      <h1 class="classy-subtitle classy-end classy-result shadow dotted">Result: {{result}}</h1>
    </div>
    <div v-if="resultError">
      <h1 class="classy-subtitle classy-end classy-warning shadow dotted">Result: {{resultError.message}}</h1>
    </div>
    <div v-if="error">
      <h1 class="classy-subtitle classy-end classy-error shadow dotted">Error: {{error.message}}</h1>
    </div>
  </div>
</template>

<script>
  import {BinaryConverter} from '../utils/BinaryConverter.js'
  import completeBar from '../utils/retro-progress-bar.js'
  import Button from '@/components/Button.vue'
  import Input from '@/components/Input.vue'
  import Vuex from 'vuex'

  export default {
    name: 'Menu',
    components: {
      Button,
      Input
    },
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
      var binaryConvertions = BinaryConverter.getConvertions();

      BinaryConverter.prototype.selected = false;

      this.fromConvertions=binaryConvertions;
    },
    methods: {
      ...Vuex.mapActions([
        'addRecordAction',
      ]),
      //Load secondary convertions when selecting an option
      selectFromConvertion(convertion){
        this.fromConvertions.forEach(conv => {
          conv.selected = conv === convertion;
        });
        this.fromSelected=convertion;
        this.resetToSelection();
        this.toConvertions=convertion.getConvertions();
      },
      selectToConvertion(convertion){
        this.toConvertions.forEach(conv => {
          conv.selected = conv === convertion;
        })
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
        if(this.bits!='' || (!this.fromSelected.isFromDecimal())){
          if(this.bits<=32){
            if(this.toSelected.validateChain(this.chain)){
              this.showLoadingBar=true;
              await completeBar(this.$refs.progressBar)
                .then(result => {
                  this.result = this.toSelected.convert(this.chain,this.bits);;
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
              this.error={message:'invalid chain'};
            }
          }else{
            //Shows error if the chain is invalid
            this.error={message:'can\'t generate numbers with >32 bits'};
          }
        }else{
          this.error={message:'please specify the number of bits'};
        }
      },
      recordOperation(){
        this.addRecordAction({
          from: this.fromSelected.getName(),
          to: this.toSelected.getName(),
          chain: this.chain,
          bits: this.bits,
          result: this.result,
          date: new Date()
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

.classy-error {
  background-color: var(--primaryRed);
}

.classy-result {
  background-color: var(--primaryGreen);
}

.classy-subtitle {
  font-style: italic;
}

.classy-bits-input, .menu, .classy-number-input {
  width:60%;
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
  margin: 35px 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

.classy-warning {
  background-color: var(--primaryYellow);
}

.form-buttons > Button:not(:first-child) {
  margin-left: 20px;
}

@media (max-width: 720px) {
  .menu {
    width: 100%;
  }
}
</style>




