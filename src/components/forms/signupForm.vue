<template>
  <div id="signup-form">
    <form @submit.prevent="handleSubmit">

       <li v-for="field in this.account">
          <label>{{field.displayName}}</label>
          <input class="inputBox"
          :type="field.type"
          :class="{ 'has-error': field.error }"
          v-model="field.value"
          @focus="clearStatus"
          @keypress="clearStatus"
          />
        <label class="error-message">{{field.error}}</label>
        </li>
      <button>Sign up</button>
      <label class="error-message">{{this.errMsg}}</label>
      <p v-if="this.success" class="success-message">Successfully signed up</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import accountApi from '@/endpoints/accountApi';
import accountValidation from '../../utils/formValidation/accountValidation';
import FormField from '../generics/FormField';

export default {
  name: 'signup-form',
  data() {
    return {
      errMsg: '',
      success: false,
      account: {
        username: new FormField({ displayName: 'Username', type: 'text' }),
        email: new FormField({ displayName: 'Email', type: 'email' }),
        password: new FormField({ displayName: 'Password', type: 'password' }),
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

      axios.post(accountApi.signup, data)
        .then((response) => {
          if (response.data.status === true) {
            this.success = true;
            /* eslint-disable */
            for (const field in this.account) {
              this.account[field].value = '';
            }
            /* eslint-enable */
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
li{
  list-style: none;
}
form {
  margin-bottom: 2rem;
}

#signup-form{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

[class*="-message"] {
  font-weight: 500;
}

.error-message {
  color: #d33c40;
}

.success-message {
  color: #32a95d;
}
</style>
