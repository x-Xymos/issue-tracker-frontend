<template>
  <div id="login-form">
    <form @submit.prevent="handleSubmit">
      <label>Username</label>
      <input class="inputBox"
        ref="first"
        type="text"
        :class="{ 'has-error': submitting && invalidUsername }"
        v-model="account.username"
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
export default {
  name: 'login-form',
  data() {
    return {
      submitting: false,
      error: false,
      success: false,
      account: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    handleSubmit() {
      this.submitting = true;
      this.clearStatus();

      if (this.invalidUsername || this.invalidPassword) {
        this.error = true;
        return;
      }

      this.$refs.first.focus();
      this.account = {
        username: '',
        password: '',
      };
      this.error = false;
      this.success = true;
      this.submitting = false;
      this.$emit('closeModal');
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
