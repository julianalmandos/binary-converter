<template>
  <div class="menu">
    <h2 class="classySubtitle">Convert from</h2>
    <div class="buttons">
      <button :class="[selectedDecimalButton ? 'classySelectedButton' : 'classyButton']" @click="showDecimalMenu()">Decimal</button>
      <button :class="[selectedBinaryButton ? 'classySelectedButton' : 'classyButton']" class="classyButton" @click="showBinaryMenu()">Binary</button>
    </div>
    <div v-if="decimalMenu">
      <h2 class="classySubtitle">to</h2>
      <div class="buttons">
        <button class="classyButton" @click="showInput()">Ca1</button>
        <button class="classyButton" @click="showInput()">Ca2</button>
        <button class="classyButton" @click="showInput()">Simple</button>
      </div>
    </div>
    <div v-if="binaryMenu">
      <h2 class="classySubtitle">with type</h2>
      <div class="buttons">
        <button class="classyButton" @click="showInput()">Ca1</button>
        <button class="classyButton" @click="showInput()">Ca2</button>
        <button class="classyButton" @click="showInput()">Simple</button>
      </div>
    </div>
    <div class="classyInputBox" v-if="showInput">
      <input class="classyInput" type="text"/><br><br>
      <button class="classyButton" @click="convert()">Convert!</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Menu',  
    data() {
      return {
        decimalMenu: false,
        binaryMenu: false,
        selectedDecimalButton: false,
        selectedBinaryButton: false,
        showInput: true,
      }
    },
    methods: {
      showDecimalMenu() {
        this.hideBinaryMenu();
        this.decimalMenu=true;
        this.selectedDecimalButton=true;        
      },
      showBinaryMenu() {
        this.hideDecimalMenu();
        this.binaryMenu=true;
        this.selectedBinaryButton=true;
      },
      hideDecimalMenu() {
        this.decimalMenu=false;
        this.selectedDecimalButton=false;
      },
      hideBinaryMenu() {
        this.binaryMenu=false;
        this.selectedBinaryButton=false;
      },
      showInput() {
        this.showInput=true;
      },
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

  .classySelectedButton {
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
    -webkit-box-shadow: 5px 5px 0px -1px rgba(0,0,0,0.75);
    -moz-box-shadow: 5px 5px 0px -1px rgba(0,0,0,0.75);
    box-shadow: 5px 5px 0px -1px rgba(0,0,0,0.75);
  }

  .classyInputBox {
    margin: 40px 0px 40px 0px;
  }
</style>




