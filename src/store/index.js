import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.localStorage
    })
  ],
  //data
  // 用户信息
  state: {
    userId: 1,
    userName: '',
    age: 0,
    gender: '',
    phone: '',
    companyName: '',
    companyLocation: '',
    email: '',
    special: '',
    roleName: ''
  },
  //methods
  mutations: {
    updateUserId(state, num) {
      state.userId = num.id
      // localStorage.setItem('userId', state.userId)

      console.log('mutation之后呢' + state.userId)
    },
    setUserId(state, info) {
      state.userId = info.userId
    },
    change(state, pl) {
      state.userId += pl.num
    },
    getUser(state, info) {
      state.userName = info.userName
      state.age = info.age
      state.phone = info.phone
      state.gender = info.gender
      state.companyName = info.companyName
      state.companyLocation = info.companyLocation
      state.email = info.email
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
