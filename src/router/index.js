import HomeView from '@/views/HomeView.vue'
import MangaEpisodesView from '@/views/MangaEpisodesView.vue'
import MangaInfoView from '@/views/MangaInfoView.vue'
import PopularView from '@/views/PopularView.vue'
import LatestView from '@/views/LatestView.vue'
import SearchView from '@/views/SearchView.vue'
import { createRouter, createWebHistory } from 'vue-router'

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
    {
      path: '/asurascans/popular',
      name: 'popular',
      component: PopularView,
    },
    {
      path: '/asurascans/latest',
      name: 'latest',
      component: LatestView,
    },
    {
      path: '/asurascans/search',
      name: 'search',
      component: SearchView,
    },
  ],
})

export default router
