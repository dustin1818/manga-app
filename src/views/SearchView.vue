<script setup>
import { ref, watch } from 'vue'
import { useMangaStore } from '@/state/store'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

const mangaStore = useMangaStore()
const searchQuery = ref('')
const searchResults = ref([])
const isSearching = ref(false)
const hasSearched = ref(false)

const searchManga = async () => {
  if (!searchQuery.value.trim()) return

  isSearching.value = true
  hasSearched.value = true

  try {
    const results = await mangaStore.searchManga(searchQuery.value)
    searchResults.value = results || []
  } catch (error) {
    console.error('Search error:', error)
    searchResults.value = []
  } finally {
    isSearching.value = false
  }
}

let debounceTimeout
watch(searchQuery, () => {
  clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(() => {
    if (searchQuery.value.trim().length >= 2) {
      searchManga()
    }
  }, 500)
})
</script>

<template>
  <div class="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
    <h1 class="text-2xl font-bold mb-6">Search Manga</h1>

    <!-- Search Input -->
    <div class="mb-8">
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search for manga titles..."
          class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent shadow-sm"
          @keyup.enter="searchManga"
        />
        <button
          @click="searchManga"
          class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
      <p class="text-sm text-gray-500 mt-2">Enter at least 2 characters to search</p>
    </div>

    <!-- Loading State -->
    <div v-if="isSearching" class="w-full py-20 flex justify-center">
      <PulseLoader color="#9333EA" />
    </div>

    <!-- No Results State -->
    <div v-else-if="hasSearched && searchResults.length === 0" class="text-center py-20">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-16 w-16 mx-auto text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h2 class="text-xl font-semibold mt-4">No manga found</h2>
      <p class="text-gray-500 mt-2">Try searching with different keywords</p>
    </div>

    <div
      v-else-if="searchResults.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
    >
      <RouterLink
        :to="`/asurascans/info/${manga.id}`"
        v-for="manga in searchResults"
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

    <div v-else class="text-center py-20">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-16 w-16 mx-auto text-gray-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <h2 class="text-xl font-semibold mt-4">Search for your favorite manga</h2>
      <p class="text-gray-500 mt-2">Type a manga title in the search box above to get started</p>
    </div>
  </div>
</template>
