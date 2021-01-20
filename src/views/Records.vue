<template>
  <div class="records">
    <h1>{{currentLanguage.records}}</h1>
    <div v-if="records.length" class="records-list">
      <Record v-for="record in records" :key="record.date.toString()" :record="record"></Record>
    </div>
    <h2 v-else>{{currentLanguage.noRecords}}</h2>
  </div>
</template>

<script>
import Record from '@/components/Record.vue'
import Vuex from 'vuex'

export default {
  name: 'Records',
  components: {
    Record
  },
  data() {
    return {
      records: []
    }
  },
  computed: {
    ...Vuex.mapState([
      'currentLanguage'
    ])
  },
  mounted() {
    this.records = this.$store.state.records;
  }
}
</script>

<style>

.records-list {
  width: 60%;
}

.records-list > .record:not(:last-child)  {
  margin-bottom: 25px;
}

</style>