<script setup>
import { useRoute } from 'vue-router'
import { reactive, computed, watch } from 'vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import ScrollTop from 'primevue/scrolltop'
import Button from 'primevue/button'
import apiClient from '@/services/api'

const route = useRoute()

// Use reactive to create a single state object
const state = reactive({
  chapterId: route.params.id,
  pages: [],
  loading: true,
  error: null,
})

// Create a reactive object for currentPage
const currentPage = computed(() => {
  const chapterNum = parseInt(state.chapterId.split('-').pop())
  return {
    current: chapterNum,
    previous: chapterNum - 1,
    next: chapterNum + 1,
  }
})

const getPages = async () => {
  state.loading = true
  state.error = null

  try {
    console.log('Fetching pages for chapter:', state.chapterId)
    const response = await apiClient.get(`/asurascans/pages/${state.chapterId}`)
    console.log('Response received:', response)

    if (response.data && response.data.results) {
      state.pages = response.data.results
      console.log('Pages loaded:', state.pages.length)
    } else {
      console.error('Invalid response format:', response.data)
      state.error = 'Invalid response data format'
    }
  } catch (err) {
    console.error('Error fetching pages:', err)
    state.error = err.message || 'Failed to fetch manga pages'
  } finally {
    state.loading = false
  }
}

// Update chapterId when route changes
watch(
  () => route.params.id,
  (newId) => {
    state.chapterId = newId
    getPages()
  },
  { immediate: true },
)

const chapterUrl = (chapter) => `/asurascans/pages/leviathan-chapter-${chapter}`

const previousChapterUrl = computed(() =>
  currentPage.value.previous !== 0 ? chapterUrl(currentPage.value.previous) : 0,
)

const nextChapterUrl = computed(() =>
  currentPage.value.current !== 214 ? chapterUrl(currentPage.value.next) : 214,
)

// No need for the onMounted API call since watch with immediate:true
// will handle the initial API call
</script>

<template>
  <div class="flex flex-col items-center">
    <div v-if="state.loading" class="h-screen w-full flex justify-center items-center">
      <PulseLoader color="#9333EA" />
    </div>

    <div v-else-if="state.error" class="h-screen w-full flex justify-center items-center flex-col">
      <div class="text-center">
        <h2 class="text-red-500 text-xl mb-2">Error loading pages</h2>
        <p>{{ state.error }}</p>
        <Button label="Retry" icon="pi pi-refresh" @click="getPages()" class="mt-4" />
        <div class="mt-4">
          <RouterLink to="/asurascans/info/leviathan">
            <Button iconPos="left" label="Back to Info page" icon="pi pi-arrow-left" size="small" />
          </RouterLink>
        </div>
      </div>
    </div>

    <div
      v-else-if="state.pages.length === 0"
      class="h-screen w-full flex justify-center items-center flex-col"
    >
      <div class="text-center">
        <h2 class="text-yellow-500 text-xl mb-2">No pages found</h2>
        <p>This chapter may not be available</p>
        <RouterLink to="/asurascans/info/leviathan">
          <Button
            iconPos="left"
            label="Back to Info page"
            icon="pi pi-arrow-left"
            size="small"
            class="mt-4"
          />
        </RouterLink>
      </div>
    </div>

    <div v-else class="w-full flex justify-center items-center flex-col">
      <img
        v-for="(page, index) in state.pages"
        :key="index"
        :src="`${page}`"
        alt="page"
        class="object-cover"
      />

      <div class="button-container flex flex-wrap justify-center items-center mt-5 gap-5">
        <RouterLink to="/asurascans/info/leviathan">
          <Button iconPos="left" label="Info page" icon="pi pi-book" size="large" />
        </RouterLink>
        <RouterLink v-if="previousChapterUrl" :to="previousChapterUrl">
          <Button iconPos="left" label="Previous" icon="pi pi-arrow-left" size="large" />
        </RouterLink>

        <RouterLink v-if="nextChapterUrl" :to="nextChapterUrl">
          <Button iconPos="right" label="Next" icon="pi pi-arrow-right" size="large" />
        </RouterLink>
      </div>
    </div>
    <i
      class="pi pi-angle-down animate-fadeout animate-duration-1000 animate-infinite text-[2rem]"
    ></i>
    <ScrollTop />
  </div>
</template>
