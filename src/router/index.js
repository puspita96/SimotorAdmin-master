import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import { store } from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      requiresAuth: true
    },

    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/moderasi',
    name: 'Moderasi',
    meta: {
      requiresAuth: true
    },

    component: () => import('../views/Moderasi.vue')
  },
  {
    path: '/user',
    name: 'Users',
    meta: {
      requiresAuth: true
    },

    component: () => import('../views/User.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: {
      requiresAuth: true
    },

    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/',
    name: 'Login',
    beforeEnter: (to, from, next) => {
      // to.matched.some(router.app.$store.state.token !== "null");
      // console.log('ayam', router.app.$store.state.token);

      if (router.app.$store.state.token !== null)
        next({
          path: '/dashboard'
        });
      else next();
    },

    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/pembelian_tiket',
    name: 'pembelian_tiket',
    meta: {
      requiresAuth: true
    },

    component: () =>
      import(/* webpackChunkName: "about" */ '../views/PembelianTiket.vue')
  },
  {
    path: '/pengembalian_tiket',
    name: 'pengembalian_tiket',
    meta: {
      requiresAuth: true
    },

    component: () =>
      import(/* webpackChunkName: "about" */ '../views/PengembalianTiket.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  next();
});
// Buat Login

router.beforeEach((to, from, next) => {
  if (
    to.matched.some(record => record.meta.requiresAuth) &&
    (!router.app.$store.state.token || router.app.$store.state.token === 'null')
  )
    next({
      name: 'Login',
      path: '/',
      query: {
        redirect: to.fullPath
      }
    });
  else next();
});

if (window.sessionStorage) {
  const localUserString = window.sessionStorage.getItem('user');
  const localToken = window.sessionStorage.getItem('token');

  if (localUserString !== null) {
    const localUser = JSON.parse(localUserString);

    store.commit('SET_USER', localUser);
    store.commit('SET_TOKEN', localToken);
  }
}

export default router;
