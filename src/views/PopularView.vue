<script setup>
import { onMounted } from 'vue'
import { useMangaStore } from '@/state/store'

const mangaStore = useMangaStore()

onMounted(() => {
  console.log('component loaded')
  console.log(mangaStore.fetchPopularManga())
})
</script>

<template>
  <div>Popular</div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
</template>
