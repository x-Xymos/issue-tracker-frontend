import Vue from 'vue';
import Router from 'vue-router';
import home from '@/components/home';
import profile from '@/components/profile';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile,
    },
  ],
});
