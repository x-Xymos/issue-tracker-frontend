<template>
  <div class="home">
    <title>Home</title>
    <h1>Home</h1>
        <h2>Counter: {{ counterTotal }}</h2>
         <button @click="incrementCounter">+</button>
        <button @click="decrementCounter">-</button>
        <button @click="setAuthenticated">SetAuthenticated</button>
        <h3>Authenticated: {{ authenticationStatus }}</h3>
  </div>
</template>

<script>

export default {
  name: 'home',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
  computed: {
    counterTotal() {
      return this.$store.state.counter;
    },
    authenticationStatus() {
      return this.$store.state.authenticated;
    },
  },
  methods: {
    setAuthenticated() {
      this.$store.dispatch('setAuthenticated', true);
    },
    incrementCounter() {
      this.$store.dispatch('incrementCounter');
    },
    decrementCounter() {
      this.$store.dispatch('decrementCounter');
    },
  },
};
</script><!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped></style>
