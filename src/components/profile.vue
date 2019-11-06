<template>
  <div class='profile'>
    <title>Profile</title>
    <h1>Profile</h1>
    <div v-if='!this.loading'>

        <div v-if='!this.editing'>
          <li v-for="field in this.account">
            <label>{{field.displayName}}:{{field.value}}</label>
          </li>
          <button @click='editProfile'>Edit Profile</button>
        </div>

      <div v-if='this.editing'>
        <li v-for='field in this.tempAccount'>
          <label>{{field.displayName}}</label>
          <input type='text'
          v-model='field.value'
          :class="{ 'has-error': field.error }"
          />
         <label class="error-message">{{field.error}}</label>
        </li>
        <label class="error-message">{{this.errMsg}}</label>
        <button v-if='this.editing' @click='saveProfile'>Save</button>
        <button v-if='this.editing' @click='cancelEditing'>Cancel</button>
      </div>

    </div>

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
        username: new FormField('Username'),
        email: new FormField('Email'),
      },
      tempAccount: {
        username: new FormField('Username'),
        email: new FormField('Email'),
      },
      loading: true,
      editing: false,
    };
  },
  methods: {
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

      const data = {};
      /* eslint-disable */
      for (const field in this.tempAccount) {
        if  (this.tempAccount[field].value != this.account[field].value) {
          data[field] = this.tempAccount[field].value;
        } else {
          data[field] = '';
        }
      }
     
      /* eslint-enable */
      const token = localStorage.getItem('token');
      if (token) {
        axios.post(accountApi.updateProfile, data, { headers: { Authorization: `Bearer ${token}` } })
          .then((response) => {
            if (response.data.status === true) {
              /* eslint-disable */
              for (const field in this.tempAccount) {
                this.account[field].value = this.tempAccount[field].value;
              }
              /* eslint-enable */
              this.clearTempAccount();
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
    },
    cancelEditing() {
      this.editing = false;
      this.clearTempAccount();
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
  created() {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(accountApi.getProfile, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          if (response.data.status) {
            /* eslint-disable */
            for (const field in this.account) {
              this.account[field].value = response.data.account[field];
            /* eslint-enable */
            }
          } else {
            this.errMsg = response.data.message;
          }
        }).catch((e) => {
          this.errMsg = e;
        });
    } else {
      this.errMsg = 'Missing JWT Token';
    }
    this.loading = false;
  },
};
</script>
<style scoped>
li {
  list-style:  none;
}
</style>
