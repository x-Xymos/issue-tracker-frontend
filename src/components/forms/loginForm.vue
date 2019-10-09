<template>
  <div id="login-form">
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
      <label>Password</label>
      <input
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
  name: "login-form",
  data() {
    return {
      submitting: false,
      error: false,
      success: false,
      account: {
        username: "",
        password: "",
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

      //this.$emit("add:employee", this.employee);
      this.$refs.first.focus();
      this.account = {
        username: "",
        password: "",
      };
      this.error = false;
      this.success = true;
      this.submitting = false;
    },
    clearStatus() {
      this.success = false;
      this.error = false;
    },
  },
  computed: {
    invalidUsername() {
      return this.account.username === "";
    },
    invalidPassword() {
      return this.account.password === "";
    },
  },
};
</script>
<style scoped>
form {
  margin-bottom: 2rem;
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
