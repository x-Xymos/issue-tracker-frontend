<template>
<div class='profile'>
  <title>Profile</title>
  <h1>Profile</h1>
  <div v-if='!this.loading && !this.error'>
      <div v-if='!this.editing'>
        <li v-for="field in this.account">
          <label v-if='field.value != ""'>{{field.displayName}}: {{field.value}}</label>
        </li>
        <button v-if='this.accountOwner' @click='editProfile'>Edit Profile</button>
      </div>

      <div v-if='this.editing'>
        <li v-for='field in this.tempAccount'>
          <label>{{field.displayName}}</label>
          <input
          :type="field.type"
          v-model='field.value'
          :class="{ 'has-error': field.error }"
          />
          <label class="error-message">{{field.error}}</label>
        </li>
        <button v-if='this.editing' @click='saveProfile'>Save</button>
        <button v-if='this.editing' @click='cancelEditing'>Cancel</button>
      </div>
  </div>
  <label class="error-message">{{this.errMsg}}</label>
</div>
</template>

<script>
import axios from 'axios';
import accountApi from '../endpoints/accountApi';
import accountValidation from '../utils/formValidation/accountValidation';
import FormField from './generics/FormField';

export default {
  name: 'profile',
  data() {
    return {
      errMsg: '',
      account: {
        username: new FormField({ displayName: 'Username', type: 'text' }),
        email: new FormField({ displayName: 'Email', type: 'email' }),
        createdAt: new FormField({ displayName: 'Join Date', type: 'text' }),
      },
      tempAccount: {
        username: new FormField({ displayName: 'Username', type: 'text' }),
        email: new FormField({ displayName: 'Email', type: 'email' }),
      },
      accountOwner: false,
      loading: true,
      editing: false,
      error: false,
    };
  },
  methods: {
    loadProfile() {
      this.clearErrors();
      const token = localStorage.getItem('token');
      const params = { username: `${this.$route.params.username}` };
      const headers = { Authorization: `Bearer ${token}` };

      if (token) {
        axios.get(accountApi.profile, { headers, params })
          .then((response) => {
            if (response.data.status) {
              /* eslint-disable */
              for (const field in this.account) {
                this.account[field].value = response.data.account[field];
                /* eslint-enable */
                this.accountOwner = response.data.accountOwner;
                if (this.accountOwner) {
                  this.$store.dispatch('setUsername', this.account.username.value);
                }
              }
            } else {
              this.errMsg = response.data.message;
              this.error = true;
            }
          }).catch((e) => {
            this.errMsg = e;
            this.error = true;
          });
      } else {
        this.errMsg = 'Missing JWT Token';
        this.error = true;
      }
      this.loading = false;
    },
    editProfile() {
      /* eslint-disable */
      for (const field in this.tempAccount) {
          this.tempAccount[field].value = this.account[field].value;
      }
      /* eslint-enable */
      this.editing = true;
    },
    saveProfile() {
      /* eslint-disable */
      for (const field in this.tempAccount) {
        this.tempAccount[field].error = '';
      }
   
      /* eslint-enable */
      if (accountValidation(this.tempAccount)) {
        return;
      }

      let post = false;
      const data = {};
      /* eslint-disable */
      this.tempAccount.email.value =  this.tempAccount.email.value.toLowerCase();
      for (const field in this.tempAccount) {
        if (this.tempAccount[field].value != this.account[field].value) {
          data[field] = this.tempAccount[field].value;
          post = true;
        } else {
          data[field] = '';
        }
      }

      /* eslint-enable */
      if (post) {
        const token = localStorage.getItem('token');
        if (token) {
          axios.put(accountApi.profile, data, { headers: { Authorization: `Bearer ${token}` } })
            .then((response) => {
              if (response.data.status === true) {
                /* eslint-disable */
                for (const field in this.tempAccount) {
                  this.account[field].value = this.tempAccount[field].value;
                }
                /* eslint-enable */
                this.clearTempAccount();
                history.replaceState(null, null, `/profile/${this.account.username.value}`);
                this.$store.dispatch('setUsername', this.account.username.value);
                localStorage.setItem('username',  this.account.username.value);
                this.editing = false;
                this.errMsg = '';
              } else {
                this.errMsg = response.data.message;
              }
            }).catch((e) => {
              this.errMsg = e;
            });
        } else {
          this.errMsg = 'Missing JWT Token';
        }
      } else {
        this.cancelEditing();
      }
    },
    cancelEditing() {
      this.editing = false;
      this.clearTempAccount();
      this.errMsg = '';
    },
    clearErrors() {
      this.error = false;
      this.errMsg = '';
    },
    clearTempAccount() {
      /* eslint-disable */
      for (const field in this.tempAccount) {
        this.tempAccount[field].value = '';
        this.tempAccount[field].error = '';
      /* eslint-enable */
      }
    },
  },
  watch: {
    /* eslint-disable */
  '$route.params.username' : function () {
    this.loadProfile();
  },
  /* eslint-enable */
  },
  created() {
    this.loadProfile();
  },
};
</script>
<style scoped>
li {
  list-style:  none;
}
</style>
