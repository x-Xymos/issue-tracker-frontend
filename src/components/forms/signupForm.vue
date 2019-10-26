<template>
  <div id="signup-form">
    <form @submit.prevent="handleSubmit">
      <label>Username</label>
      <input
        ref="first"
        type="text"
        :class="{ 'has-error': submitting && invalidUsername }"
        v-model="account.username"
        @focus="clearStatus"
        @keypress="clearStatus"
      />
      <label>Email</label>
      <input
        type="text"
        :class="{ 'has-error': submitting && invalidEmail }"
        v-model="account.email"
        @focus="clearStatus"
      />
      <label>Password</label>
      <input
        type="text"
        :class="{ 'has-error': submitting && invalidPassword }"
        v-model="account.password"
        @focus="clearStatus"
      />
      <button>Sign up</button>
      <p v-if="this.resp.data.status" class="success-message">Successfully signed up</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import signupApi from '@/endpoints/signupApi';

export default {
  name: 'signup-form',
  data() {
    return {
      submitting: false,
      error: false,
      success: false,
      errMsg: '',
      resp: '',
      account: {
        username: '',
        email: '',
        password: '',
      },
    };
  },
  methods: {
    handleSubmit() {
      this.submitting = true;
      this.clearStatus();

      if (this.invalidUsername || this.invalidEmail || this.invalidPassword) {
        this.error = true;
        return;
      }
      axios.post(signupApi.signup, this.account)
        .then((response) => {

          this.resp = response;

          if (response.data.status === true) {

            this.account = {
            username: '',
            password: '',
            email: '',
            };

            this.error = false;
            this.success = true;
            this.submitting = false;

            //this.$emit('closeModal');
          }
        }).catch((e) => {
          this.error = true;
          this.errMsg = e;
        });
      
    },
    clearStatus() {
      this.success = false;
      this.error = false;
    },
  },
  computed: {
    invalidUsername() {
      return this.account.username === '';
    },
    invalidEmail() {
      return this.account.email === '';
    },
    invalidPassword() {
      return this.account.password === '';
    },
  },
};
</script>
<style scoped>
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
