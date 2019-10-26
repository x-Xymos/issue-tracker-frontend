<template>
  <div class='profile'>
    <title>Profile</title>
    <h1>Profile</h1>
    <h2 v-if="!this.loading">UserID: {{UserID}}</h2>
    <p>{{errMsg}}</p>
  </div>
</template>

<script>
import axios from 'axios';
import loginApi from '@/endpoints/loginApi';

export default {
  name: 'profile',
  data() {
    return {
      error: '',
      errMsg: '',
      UserID: '',
      loading: true,
    };
  },
  created() {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(loginApi.home, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          if (response.data.status) {
            this.UserID = response.data.UserID;
            
          } else {
            this.UserID = 'ERROR';
          }
        }).catch((e) => {
          this.error = true;
          this.errMsg = e;
          this.UserID = 'ERROR';
        });
    } else {
      // todo: redirect or show error
      this.UserID = 'ERROR';
    }
    this.loading = false;
  },
};
</script>
<style scoped>
</style>
