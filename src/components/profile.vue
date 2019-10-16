<template>
  <div class="profile">
    <h1>{{title}}</h1>
  </div>
</template>
<script>
export default {
  name: 'profile',
  data() {
    return {
      title: 'Profile',
    };
  },
  created() {
    if (!this.$store.state.authenticated) {
      this.$router.push('/') 
    };
  }
};
</script>
<style scoped>
</style>
