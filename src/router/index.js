import Vue from 'vue';
import VueRouter from 'vue-router';
import Enums from '../enums';

Vue.use(VueRouter);

const Login = () => import(/* webpackChunkName: "login" */ '../views/login');
const Home = () =>
  import(/* webpackChunkName: "home_welcome" */ '../views/home');
const Welcome = () =>
  import(/* webpackChunkName: "home_welcome" */ '../views/welcome');

const User = () =>
  import(/* webpackChunkName: "User_Right_Role" */ '../views/user');
const Right = () =>
  import(/* webpackChunkName: "User_Right_Role" */ '../views/right');
const Role = () =>
  import(/* webpackChunkName: "User_Right_Role" */ '../views/role');

const routes = [
  {
    path: '/',
    redirect: '/welcome'
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
  console.log(to.path);
  if (to.path === '/login') {
    return next();
  }
  const token = window.sessionStorage.getItem(Enums.TOKEN_NAME);
  if (!token) {
    return next('/login');
  }
  next();
});

export default router;
