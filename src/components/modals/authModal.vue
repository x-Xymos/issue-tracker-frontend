<template>
  <transition name="modal-fade">
    <div class="authModal" v-show="authModalProps.authModalOpen">
      <div class="authContainer">
        <div class="authWrapper">
          <a @click="showLoginForm">Log In</a>
          <a @click="showSignupForm">Sign Up</a>
          <loginForm @closeModal="closeModal" v-show="authModalProps.loginFormOpen"/>
          <signupForm @closeModal="closeModal" v-show="authModalProps.signupFormOpen"/>
          <button @click="closeModal">Close</button>
        </div>
      </div>
      <div class="authModalBackdrop" @click="closeModal"></div>
    </div>
  </transition>
</template>

<script>
import loginForm from '@/components/forms/loginForm';
import signupForm from '@/components/forms/signupForm';

export default {
  name: 'authModal',
  components: {
    loginForm,
    signupForm,
  },
  props: {
    authModalProps: {
      authModalOpen: false,
      loginFormOpen: false,
      signupFormOpen: false,
    },
  },
  methods: {
    closeModal() {
      this.$emit('toggleAuthModal');
    },
    showLoginForm() {
      this.$emit('showLoginForm');
    },
    showSignupForm() {
      this.$emit('showSignupForm');
    },
  },
};
</script>

<style lang="css" scoped>
.authModalBackdrop {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  transition: background-color 2s;

}
.authWrapper{
  margin: 35px;
}

.authContainer {
  z-index:  2;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 600px;
  transform: translate(-50%, -50%);
  border-radius:5px;
  display: inline-table;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(255, 255, 255);
}
 .modal-fade-enter,
  .modal-fade-leave-active {
    opacity: 0;
  }

a{
  color: rgb(255, 255, 255);
  text-decoration: none;
  background-color: #0366EE;
  border: 2px solid rgb(3, 91, 214);
  border-radius: 3px;
  margin: 0px 5px 0px 5px;
}

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .25s ease
  }

</style>
