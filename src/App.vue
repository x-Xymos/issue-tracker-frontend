<template>
  <div id="app">
    <navbar />
    <router-view />
  </div>
</template>
<script>
import navbar from '@/components/navbar';

export default {
  name: 'App',
  components: {
    navbar,
  },
};
</script>
<style>
body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#app {
  width: 900px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
</style>
