<template>
  <div id='app'>
    <navbar />
    <router-view />
  </div>
</template>

<script>
import navbar from '@/components/navbar';
import axios from 'axios';
import accountApi from '@/endpoints/accountApi';

export default {

  name: 'App',
  components: {
    navbar,
  },
  created() {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(accountApi.home, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          if (response.data.status) {
            this.$store.dispatch('setAuthenticated', true);
          } else {
            this.$store.dispatch('setAuthenticated', false);
          }
        }).catch((e) => {
          this.error = true;
          this.errMsg = e;
          this.$store.dispatch('setAuthenticated', false);
        });
    } else {
      this.$store.dispatch('setAuthenticated', false);
    }
  },
};
</script>

<style>
.error-message {
  color: #d33c40;
}

body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#app {
  width: 900px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
</style>
