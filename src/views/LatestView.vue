<script setup>
import { onMounted, ref, computed } from 'vue'
import { useMangaStore } from '@/state/store'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

const mangaStore = useMangaStore()
const latestManga = ref([])
const currentPage = ref(mangaStore.page)
const totalPages = ref(100)

const goToPage = async (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    mangaStore.page = page

    mangaStore.manga.loading = true
    const mangaData = await mangaStore.fetchLatestManga()
    latestManga.value = mangaData
    mangaStore.manga.loading = false
  }
}

const paginatedManga = computed(() => {
  return latestManga.value
})

onMounted(async () => {
  mangaStore.manga.loading = true
  mangaStore.manga.error = null
  const mangaData = await mangaStore.fetchLatestManga()
  latestManga.value = mangaData
})
</script>

<template>
  <div v-if="mangaStore.manga.loading" class="w-full h-screen grid items-center">
    <PulseLoader class="m-auto" color="#9333EA" size="10px" />
  </div>
  <div v-else-if="mangaStore.manga.error" class="w-full h-screen grid items-center">
    <div class="text-center">
      <h1 class="text-xl font-bold mb-4">Error loading manga</h1>
      <p class="text-sm">{{ mangaStore.manga.error }}</p>
    </div>
  </div>
  <div v-else class="max-w-7xl mx-auto px-4 py-4">
    <h1 class="text-xl font-bold mb-4">Latest Manga</h1>

    <div class="grid grid-cols-2 lg:grid-cols-3 gap-6">
      <RouterLink
        :to="`/asurascans/info/${manga.id}`"
        v-for="manga in paginatedManga"
        :key="manga.id"
      >
        <div class="relative h-52 md:h-72 rounded-lg shadow-md overflow-hidden">
          <img
            :src="manga.image"
            :alt="manga.title"
            class="absolute inset-0 w-full h-full object-cover object-top"
          />

          <div
            class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"
          ></div>

          <div class="absolute inset-0 flex flex-col justify-end p-2">
            <h3 class="text-base font-bold truncate text-white">{{ manga.title }}</h3>
            <p class="text-xs text-gray-200">{{ manga.chapters }} chapters</p>
            <button class="mt-2 w-full py-1 bg-blue-600 text-white text-xs rounded-md">
              Read Now
            </button>
          </div>
        </div>
      </RouterLink>
    </div>

    <div class="flex justify-center mt-6 mb-4">
      <nav class="flex items-center space-x-2">
        <button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-2 py-1.5 rounded-md border transition-colors text-sm"
          :class="
            currentPage === 1
              ? 'text-gray-400 border-gray-200 cursor-not-allowed'
              : 'border-purple-300 text-purple-600 hover:bg-purple-50'
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <button
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-2 py-1.5 rounded-md border transition-colors text-sm"
          :class="
            currentPage === totalPages
              ? 'text-gray-400 border-gray-200 cursor-not-allowed'
              : 'border-purple-300 text-purple-600 hover:bg-purple-50'
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </nav>
    </div>
  </div>
</template>
