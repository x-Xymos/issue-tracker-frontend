<template>
  <transition name="modal-fade">
    <div class="authModal" v-show="value">
      <div class="authContainer">
        <loginForm />
        <signupForm />
        <button @click="closeModal">Close</button>
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
    value: {
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit("input", !this.value);
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

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .25s ease
  }

</style>
