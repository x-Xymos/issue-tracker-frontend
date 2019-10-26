<template>
<div>
  <nav class="navbar-wrapper">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li v-if="authenticationStatus == false" class="nav-item">
          <a class="nav-link" @click="toggleAuthModal('login')">Log In</a>
        </li>
        <li v-if="authenticationStatus == false" class="nav-item">
          <a class="nav-link" @click="toggleAuthModal('signup')" >Sign Up</a>
        </li>
        <li v-if="authenticationStatus" class="nav-item">
          <router-link class="nav-link" to="/profile">Profile</router-link>
        </li>
        <li v-if="authenticationStatus" class="nav-item">
           <a class="nav-link" @click="logOut()" >Log out</a>
        </li>
      </ul>
  </nav>
  <authModal @toggleAuthModal="toggleAuthModal()" @showLoginForm="showLoginForm"
  @showSignupForm="showSignupForm"
  v-bind:authModalProps="authModalProps">
  </authModal>
</div>
</template>
<script>
import authModal from '@/components/modals/authModal';

export default {
  name: 'navbar',
  components: {
    authModal,
  },
  data() {
    return {
      authModalProps: {
        authModalOpen: false,
        loginFormOpen: false,
        signupFormOpen: false,
      },
    };
  },
  methods: {
    toggleAuthModal(form) {
      this.authModalProps.authModalOpen = !this.authModalProps.authModalOpen;
      if (form === 'login') {
        this.showLoginForm();
      } else if (form === 'signup') {
        this.showSignupForm();
      }
    },
    showLoginForm() {
      this.authModalProps.loginFormOpen = true;
      this.authModalProps.signupFormOpen = false;
    },
    showSignupForm() {
      this.authModalProps.signupFormOpen = true;
      this.authModalProps.loginFormOpen = false;
    },
    logOut() {
      this.$store.dispatch('setAuthenticated', false);
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
      }
      this.$router.push({ name: 'home' });
      this.$router.go();
    },
  },
  computed: {
    authenticationStatus() {
      return this.$store.state.authenticated;
    },
  },
};
</script>
<style scoped>
.navbar-wrapper{
width: 100%;
  position: fixed;
  left: 0px;
  top: 0px;
  height: 40px;
  background-color: #0366EE;
  border: 2px solid rgb(3, 91, 214);
}
.navbar-nav{
    position: fixed;
    right: 50px;
    top: 0px;
    height: 40px;
    display: flex;
    flex-direction:  row;
    align-items:  center;
    justify-content:  center;
}

.nav-item{
    margin: 0px 30px 0px 30px;
}

li{
    list-style: none;
    cursor: pointer;
}

a{
    color: rgb(255, 255, 255);
    text-decoration: none;
    background-color: transparent;
}
</style>
