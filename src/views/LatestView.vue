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
    <PulseLoader class="m-auto" color="#9333EA" />
  </div>
  <div v-else-if="mangaStore.manga.error" class="w-full h-screen grid items-center">
    <div class="text-center">
      <h1 class="text-2xl font-bold mb-6">Error loading manga</h1>
      <p>{{ mangaStore.manga.error }}</p>
    </div>
  </div>
  <div v-else class="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
    <h1 class="text-2xl font-bold mb-6">Latest Manga</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      <RouterLink
        :to="`/asurascans/info/${manga.id}`"
        v-for="manga in paginatedManga"
        :key="manga.id"
      >
        <div
          class="relative h-72 rounded-lg shadow-md overflow-hidden group transition-all duration-300 hover:shadow-xl"
        >
          <img
            :src="manga.image"
            :alt="manga.title"
            class="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
          />

          <div
            class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"
          ></div>

          <div class="absolute inset-0 flex flex-col justify-end p-4 text-white">
            <h3 class="text-lg font-bold truncate">{{ manga.title }}</h3>
            <p class="text-sm text-gray-200 mt-1">{{ manga.chapters }} chapters</p>

            <div
              class="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
            >
              <p class="text-xs text-gray-300 mt-2 line-clamp-2">
                Experience this thrilling manga adventure now!
              </p>
              <button
                class="mt-3 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors"
              >
                Read Now
              </button>
            </div>
          </div>
        </div>
      </RouterLink>
    </div>

    <div class="flex justify-center mt-10 mb-6">
      <nav class="flex items-center space-x-2">
        <button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-3 py-2 rounded-md border transition-colors"
          :class="
            currentPage === 1
              ? 'text-gray-400 border-gray-200 cursor-not-allowed'
              : 'border-purple-300 text-purple-600 hover:bg-purple-50'
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
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
          class="px-3 py-2 rounded-md border transition-colors"
          :class="
            currentPage === totalPages
              ? 'text-gray-400 border-gray-200 cursor-not-allowed'
              : 'border-purple-300 text-purple-600 hover:bg-purple-50'
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
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
