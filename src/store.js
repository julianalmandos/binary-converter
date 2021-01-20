import Vue from 'vue'
import Vuex from 'vuex'
import LanguageManager from './utils/LanguageManager.js'
import lang from './utils/lang.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    records: [],
    currentLanguageKey: '',
    currentLanguage: {}
  },
  mutations: {
    addRecord(state, record){
      state.records.push(record);
      console.log(state.records);
    },
    setLanguage(state, language) {
      state.currentLanguageKey = language;
      state.currentLanguage = lang[language];
    }
  },
  actions: {
    addRecord({commit}, record){
      commit('addRecord', record);
    },
    setLanguage({commit}, language) {
      if (language) {
        if (!LanguageManager.isValid(language)) {
          console.warning('Invalid language');
          return;
        }
        LanguageManager.savePrefLanguage(language);
      } else {
        language = LanguageManager.getCurrentLanguage();
      }
      commit('setLanguage', language);
    }
  }
})
