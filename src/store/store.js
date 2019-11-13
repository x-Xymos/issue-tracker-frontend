import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // counter: 10,
    authenticated: null,
    username: '',
  },
  getters: {},
  mutations: {
    setAuthenticated(state, value) {
      state.authenticated = value;
    },
    setUsername(state, value) {
      state.username = value;
    },
    // incrementCounter(state, amount = 1) {
    //   state.counter += amount;
    // },
    // decrementCounter(state) {
    //   state.counter -= 1;
    // },
  },
  actions: {
    setAuthenticated(context, value) {
      context.commit('setAuthenticated', value);
    },
    setUsername(context, value) {
      context.commit('setUsername', value);
    },
    // incrementCounter(context, amount = 1) {
    //   context.commit('incrementCounter', amount);
    // },
    // decrementCounter(context) {
    //   context.commit('decrementCounter');
    // },
  },
});
