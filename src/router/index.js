import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/login';
import Home from '../views/home';
import Welcome from '../views/welcome';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: Welcome
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  }
  const token = window.sessionStorage.getItem('cms-vue-token');
  if (!token) {
    next('/login');
  }
  next();
});

export default router;
