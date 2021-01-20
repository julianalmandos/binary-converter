<template>
  <div class="record">
    <div class="number-info">
      <span class="number">{{record.chain}}</span>
      <span class="type">{{currentLanguage[record.from]}} <span></span></span>
    </div>
    <div class="convertion-info">
      <span class="convertion-date">{{currentLanguage.on}} {{record.date.toISOString().split('T')[0]}}</span>
    </div>
    <div class="number-info">
      <span class="number">{{record.result}}<span class="bits">{{record.bits}}</span></span>
      <span class="type">{{currentLanguage[record.to]}}</span>
    </div>
  </div>
</template>

<script>
import Vuex from 'vuex'

export default {
  name: 'Record',
  props: [
    'record'
  ],
  computed: {
    ...Vuex.mapState([
        'currentLanguage'
    ])
  },
  mounted() {
    //Here I should get the converters using the keys (create a factory)
  }
}
</script>

<style scoped>

.record {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  border-left: 10px solid var(--black);
  border-bottom: 1px solid var(--black);
}

.number {
  font-size: 2rem;
}

.bits {
  font-size: 1rem;
  font-weight: normal;
}

.number-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.convertion-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 30px;
}

.type {
  font-weight: normal;
}

</style>