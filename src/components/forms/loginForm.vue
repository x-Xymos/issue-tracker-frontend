<template>
  <div id="login-form">
    <form @submit.prevent="handleSubmit">

        <li v-for="field in this.account">
          <label>{{field.displayName}}</label>
          <input class="inputBox"
          type="text"
          :class="{ 'has-error': field.error }"
          v-model="field.value"
          @focus="clearStatus"
          @keypress="clearStatus"
          />
        <label class="error-message">{{field.error}}</label>
        </li>

      <button>Log in</button>
      <label class="error-message">{{this.errMsg}}</label>
    </form>
  </div>
</template>
<script>

import axios from 'axios';
import accountApi from '../../endpoints/accountApi';
import accountValidation from '../../utils/formValidation/accountValidation';
import FormField from '../generics/FormField';

export default {
  name: 'login-form',
  data() {
    return {
      errMsg: '',
      account: {
        email: new FormField('Email'),
        password: new FormField('Password'),
      },
    };
  },
  methods: {
    handleSubmit() {
      this.clearStatus();
      /* eslint-disable */
      for (const field in this.account) {
        this.account[field].error = '';
      }

      /* eslint-enable */
      if (accountValidation(this.account)) {
        return;
      }
      const data = {};
      /* eslint-disable */
      for (const field in this.account) {
        data[field] = this.account[field].value;
      }
      /* eslint-enable */

      axios.post(accountApi.login, data)
        .then((response) => {
          if (response.data.status === true) {
            localStorage.setItem('token', response.data.token);
            this.$store.dispatch('setAuthenticated', true);
            this.$emit('closeModal');
          } else {
            this.errMsg = response.data.message;
          }
        }).catch((e) => {
          this.errMsg = e;
        });
    },
    clearStatus() {
      this.errMsg = '';
    },
  },
};
</script>
<style scoped>
li {
  list-style: none;
}
form {
  margin-bottom: 2rem;
}

#login-form{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

[class*="-message"] {
  font-weight: 500;
}

.success-message {
  color: #32a95d;
}
</style>
