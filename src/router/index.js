import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/login';
import Home from '../views/home';
import Welcome from '../views/welcome';
import User from '../views/user';
import Right from '../views/right';
import Role from '../views/role';
import Enums from '../enums';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home'
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
      },
      {
        path: '/user',
        component: User
      },
      {
        path: '/right',
        component: Right
      },
      {
        path: '/role',
        component: Role
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
  const token = window.sessionStorage.getItem(Enums.TOKEN_NAME);
  if (!token) {
    next('/login');
  }
  next();
});

export default router;
