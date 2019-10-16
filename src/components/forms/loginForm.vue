<template>
  <div id="login-form">
    <form @submit.prevent="handleSubmit">
      <label>Email</label>
      <input class="inputBox"
        type="text"
        :class="{ 'has-error': submitting && invalidemail }"
        v-model="account.email"
        @focus="clearStatus"
        @keypress="clearStatus"
      />
      <label>Password</label>
      <input class="inputBox"
        type="text"
        :class="{ 'has-error': submitting && invalidPassword }"
        v-model="account.password"
        @focus="clearStatus"
      />
      <button>Log in</button>
    </form>
  </div>
</template>
<script>

import axios from 'axios';

export default {
  name: 'login-form',
  data() {
    return {
      submitting: false,
      error: false,
      success: false,
      account: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    handleSubmit() {
      this.submitting = true;
      this.clearStatus();

      if (this.invalidemail || this.invalidPassword) {
        this.error = true;
        return;
      }

      const data = {
        email: this.account.email,
        password: this.account.password,
      };

      axios.post('http://0.0.0.0:8880/api/login', data)
        .then((response) => {
          if (response.data.status === true) {
            localStorage.setItem('token', response.data.token);
            this.$store.dispatch('setAuthenticated', true);

            this.account = {
              email: '',
              password: '',
            };

            this.error = false;
            this.success = true;
            this.submitting = false;

            this.$emit('closeModal');
          }
        }).catch((e) => {
          this.error = true;
          console.log(e);
        });
    },
    clearStatus() {
      this.success = false;
      this.error = false;
    },
  },
  computed: {
    invalidemail() {
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

#login-form{
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
