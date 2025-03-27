import { reactive, ref, computed } from 'vue'
import { defineStore } from 'pinia'
import apiClient from '@/services/api'

export const useMangaStore = defineStore('manga', () => {
  const mangaId = 'leviathan'
  const manga = reactive({
    data: {},
    loading: true,
    error: null,
  })
  const searchInput = ref('')
  const searchChapter = computed(() => {
    return manga.data.chapters.filter((chapter) => chapter.title.includes(searchInput.value))
  })

  const fetchMangaInfo = async () => {
    try {
      const response = await apiClient.get(`/asurascans/info/${mangaId}`)
      const data = response.data
      if (data && data.results && data.results[0]) {
        manga.data = data.results[0]
      } else {
        manga.error = 'Invalid response data format'
      }
    } catch (error) {
      manga.error = error.message || 'Failed to fetch manga information'
    } finally {
      manga.loading = false
    }
  }

  return {
    mangaId,
    manga,
    fetchMangaInfo,
    searchInput,
    searchChapter,
  }
})
