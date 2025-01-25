import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import ScheduleView from "@/views/ScheduleView.vue";
import IdolView from "@/views/IdolView.vue";
import CardView from "@/views/CardView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: ScheduleView,
    },
    {
      path: '/idol',
      name: 'idol',
      component: IdolView,
    },
    {
      path: '/card',
      name: 'card',
      component: CardView,
      props: true,
    },
  ],
})

export default router
