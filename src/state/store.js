import { reactive, ref, computed } from 'vue'
import { defineStore } from 'pinia'
import apiClient from '@/services/api'
import { useRoute } from 'vue-router'

export const useMangaStore = defineStore('manga', () => {
  const route = useRoute()
  const page = ref(1)
  const mangaId = computed(() => route.params.id || '')
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
      const response = await apiClient.get(`/asurascans/info/${mangaId.value}`)
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

  const fetchPopularManga = async () => {
    try {
      const response = await apiClient.get('/asurascans/popular')
      const data = response.data
      if (data && data.results) {
        return data.results[0]
      } else {
        manga.error = 'Invalid response data format'
      }
    } catch (error) {
      manga.error = error.message || 'Failed to fetch popular manga'
    } finally {
      manga.loading = false
    }
  }

  const fetchLatestManga = async () => {
    try {
      const response = await apiClient.get(`/asurascans/latest/${page.value}`)
      const data = response.data
      if (data && data.results) {
        return data.results[0]
      } else {
        manga.error = 'Invalid response data format'
      }
    } catch (error) {
      manga.error = error.message || 'Failed to fetch latest manga'
    } finally {
      manga.loading = false
    }
  }

  const searchManga = async (query) => {
    try {
      const response = await apiClient.get(`/asurascans/search/${query}`)
      const data = response.data
      if (data && data.results) {
        return data.results[0]
      } else {
        return []
      }
    } catch (error) {
      console.error('Search error:', error.message || 'Failed to search manga')
      return []
    }
  }

  return {
    mangaId,
    manga,
    fetchMangaInfo,
    searchInput,
    searchChapter,
    fetchPopularManga,
    fetchLatestManga,
    searchManga,
    page,
  }
})
