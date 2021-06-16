import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
  base: '/',
  mode: 'history',
});

// 注入拦截器
// router.beforeResolve(async(to, from, next) => {
//   next();
// });

export default router;
