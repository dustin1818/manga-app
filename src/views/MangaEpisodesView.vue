<script setup>
import { useRoute } from 'vue-router'
import { ref, watch, computed } from 'vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import ScrollTop from 'primevue/scrolltop'
import Button from 'primevue/button'
import apiClient from '@/services/api'

const route = useRoute()
const chapterId = ref(route.params.id)
const pages = ref([])
const loading = ref(true)

// Create a reactive object for currentPage
const currentPage = computed(() => {
  const chapterNum = parseInt(chapterId.value.split('-').pop())
  return {
    current: chapterNum,
    previous: chapterNum - 1,
    next: chapterNum + 1,
  }
})

const getPages = async () => {
  loading.value = true
  try {
    const response = await apiClient.get(`/asurascans/pages/${chapterId.value}`)
    pages.value = response.data.results
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

// Update chapterId when route changes
watch(
  () => route.params.id,
  (newId) => {
    chapterId.value = newId
    getPages()
  },
  { immediate: true },
)

const chapterUrl = (chapter) => `/asurascans/pages/leviathan-chapter-${chapter}`

const previousChapterUrl = computed(() =>
  currentPage.value.previous === 0 ? chapterUrl(currentPage.value.previous) : 0,
)

const nextChapterUrl = computed(() =>
  currentPage.value.current !== 214 ? chapterUrl(currentPage.value.next) : 214,
)

// No need for the onMounted API call since watch with immediate:true
// will handle the initial API call
</script>

<template>
  <div class="flex flex-col items-center">
    <div v-if="loading" class="h-screen w-full flex justify-center items-center">
      <PulseLoader color="#9333EA" />
    </div>

    <div v-else class="w-full flex justify-center items-center flex-col">
      <img
        v-for="(page, index) in pages"
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
