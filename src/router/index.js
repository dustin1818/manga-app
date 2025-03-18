import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MangaInfoView from '@/views/MangaInfoView.vue'
import MangaEpisodesView from '@/views/MangaEpisodesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/asurascans/info/:id',
      name: 'info',
      component: MangaInfoView,
    },
    {
      path: '/asurascans/pages/:id',
      name: 'pages',
      component: MangaEpisodesView,
    },
  ],
})

export default router
