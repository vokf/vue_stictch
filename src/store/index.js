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
    roleName: '',
    publishId: 1,
    userInfo: []
  },
  //methods
  mutations: {
    updateUserId(state, num) {
      state.userId = num.id
      state.userName = num.username

      console.log('mutation之后呢' + state.userId)
    },

    getUser(state, info) {
      state.userName = info.userName
    },
    changePublishId(state, info) {
      state.publishId = info.publishId
    }
  },
  actions: {
    async getUserName({ commit }) {
      await this.$axios({
        url: '/user/findUserById',
        params: { id: commit.userId }
      }).then(commit('getUser'))
    }
  },
  modules: {},
  getters: {
    getUserName(state) {
      return state.userName
    },
    getUserId(state) {
      return state.userId
    }
  }
})
