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
    </form>
  </div>
</template>
<script>
export default {
  name: "signup-form",
  data() {
    return {
      submitting: false,
      error: false,
      success: false,
      account: {
        username: "",
        email: "",
        password: "",
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

      //this.$emit("add:employee", this.employee);
      this.$refs.first.focus();
      this.account = {
        username: "",
        password: "",
        email: "",
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
    invalidEmail() {
      return this.account.email === "";
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
