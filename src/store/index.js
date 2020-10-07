import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  //data
  state: {
    userId: 0,
    theUserName: ''
  },
  //methods
  mutations: {
    updateUserId(state, num) {
      state.userId = num.id
      console.log('mutation之后呢' + state.userId)
    },
    setUserId(state, info) {
      state.userId = info.userId
    }
  },
  actions: {
    async realUpdateByAsyncId({ commit }) {
      await this.$axios('', {})
      commit('setUserId')
    }
  },
  modules: {},
  getters: {}
})
