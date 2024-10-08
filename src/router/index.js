import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue'),
      // children: [
      //   {
      //     path: '/day',
      //     name: 'DayDayAssess',
      //     component: () => import('../components/DayDayAssess.vue'),
      //   },
      // ],
    },
  ],
});

export default router;
