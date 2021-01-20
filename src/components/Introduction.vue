<template>
  <div class="introduction">
    <h1>{{currentLanguage.binaryDecimalConverter}}</h1>
    <h4>{{currentLanguage.chooseBetweenTypes}}</h4>
  </div>
</template>

<script>
import Vuex from 'vuex'

export default {
  name: 'Introduction',
  computed: {
    ...Vuex.mapState([
      'currentLanguage'
    ]),
  }
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

