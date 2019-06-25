<template>
  <div class="hello">
    <span id="logo">001001001</span>
    <h1>Binary-Decimal Converter</h1>
    <h4>Choose between Ca2, Ca1, etc. and operate in both integer and floating point.</h4>
  </div>
</template>

<script>
export default {
  name: 'Introduction',
  props: {
    msg: String
  }
}
</script>

<style>
  #logo {
    font-size:120px;
    background-color: whitesmoke;
    border: 1px solid black;
    -webkit-box-shadow: 10px 10px 0px -1px rgba(0,0,0,0.75);
    -moz-box-shadow: 10px 10px 0px -1px rgba(0,0,0,0.75);
    box-shadow: 10px 10px 0px -1px rgba(0,0,0,0.75);
  }
</style>

