import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    records: [],
  },
  mutations: {
    addRecordMutation(state,record){
      state.records.push(record);
      console.log(state.records);
    }
  },
  actions: {
    addRecordAction({commit},record){
      commit('addRecordMutation',record);
    }
  }
})
