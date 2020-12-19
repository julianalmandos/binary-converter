<template>
  <div class="introduction">
    <span class="logo classy-shadow">001001001</span>
    <h1>Binary-Decimal Converter</h1>
    <h4>Choose between Ca2, Ca1, etc. and operate in both integer and floating point.</h4>
  </div>
</template>

<script>
export default {
  name: 'Introduction'
}
</script>

<style>
.logo {
  font-size: 7vw;
  background-color: var(--primaryWhite);
  border: 1px solid var(--black);
  pointer-events: none;
}

@media (max-width: 720px) {
  .logo {
    font-size: 14.8vw;
  }

  .introduction {
    width: 100%;
  }
}
</style>

