// src/middleware/auth.js
export default function auth({ next, router }) {
  if (!localStorage.getItem('token')) {
    return router.push({ name: 'home' });
  }

  return next();
}

//  https://markus.oberlehner.net/blog/implementing-a-simple-middleware-with-vue-router/
