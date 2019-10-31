import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // counter: 10,
    authenticated: null,
  },
  getters: {},
  mutations: {
    setAuthenticated(state, value) {
      state.authenticated = value;
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
    // incrementCounter(context, amount = 1) {
    //   context.commit('incrementCounter', amount);
    // },
    // decrementCounter(context) {
    //   context.commit('decrementCounter');
    // },
  },
});
