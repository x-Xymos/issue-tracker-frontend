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
    // when the app is created we check if there's a token and username
    // stored in local storage to persist the login session
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const params = { username };
    const headers = { Authorization: `Bearer ${token}` };

    if (token && username) {
      axios.get(accountApi.profile, { headers, params })
        .then((response) => {
          if (response.data.status) {
            this.$store.dispatch('setUsername', response.data.account.username);
            this.$store.dispatch('setAuthenticated', true);
          } else {
            this.$store.dispatch('setUsername', '');
            this.$store.dispatch('setAuthenticated', false);
          }
        }).catch((e) => {
          this.error = true;
          this.errMsg = e;
          this.$store.dispatch('setUsername', '');
          this.$store.dispatch('setAuthenticated', false);
        });
    } else {
      this.$store.dispatch('setUsername', '');
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
