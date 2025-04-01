<script setup>
import { onMounted, ref, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import Button from 'primevue/button'
import SocialShareButtons from '@/components/SocialShareButtons.vue'
import EpisodesList from '@/components/EpisodesList.vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import { useMangaStore } from '@/state/store'

const route = useRoute()
const mangaStore = useMangaStore()
const showMoreInfo = ref(false)
const toggleMoreInfo = () => {
  showMoreInfo.value = !showMoreInfo.value
}
const genres = computed(() => {
  if (!mangaStore.manga.data.genres) return []
  return mangaStore.manga.data.genres.split(', ').map((genre) => genre.trim())
})

onMounted(() => {
  if (
    route.params.id &&
    (!mangaStore.mangaId.value || mangaStore.mangaId.value !== route.params.id)
  ) {
    mangaStore.manga.loading = true
    mangaStore.manga.error = null
    mangaStore.fetchMangaInfo()
  } else if (mangaStore.mangaId.value) {
    mangaStore.fetchMangaInfo()
  }

  mangaStore.searchInput = ''
})
</script>

<template>
  <div v-if="mangaStore.manga.loading" class="w-full h-screen grid items-center">
    <PulseLoader class="m-auto" color="#9333EA" />
  </div>

  <div v-else-if="mangaStore.manga.error" class="w-full h-screen grid items-center">
    <div class="text-center">
      <h2 class="text-red-500 text-xl mb-2">Error loading manga</h2>
      <p>{{ mangaStore.manga.error }}</p>
      <Button
        label="Retry"
        icon="pi pi-refresh"
        @click="mangaStore.fetchMangaInfo()"
        class="mt-4"
      />
    </div>
  </div>

  <div v-else class="manga-info-view p-4 md:p-5">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 place-items-center md:place-items-start">
      <div class="img-wrapper w-3/4 md:w-full">
        <img
          :src="mangaStore.manga.data.images"
          :alt="mangaStore.manga.data.images"
          class="w-full object-cover rounded-lg shadow-md"
        />
      </div>

      <div class="info-wrapper text-center md:text-start md:col-span-3">
        <span class="text-2xl text-gray-800 font-bold">{{
          mangaStore.mangaId?.toLocaleUpperCase()
        }}</span>
        <div
          class="btn-container mt-8 w-full flex justify-center md:justify-start flex-wrap gap-3 mb-8"
        >
          <RouterLink
            :to="`/asurascans/pages/${mangaStore.manga.data.chapters?.length > 0 ? mangaStore.manga.data.chapters[mangaStore.manga.data.chapters?.length - 1].id : mangaStore.manga.data.chapters?.[0]?.id}`"
          >
            <Button label="Start Reading" icon="pi pi-play" iconPos="right" raised />
          </RouterLink>
          <Button
            label="Boomarks"
            icon="pi pi-bookmark"
            iconPos="right"
            severity="secondary"
            raised
          />
        </div>

        <p class="text-sm text-black mb-6 md:text-base">
          {{ mangaStore.manga.data.description }}
        </p>
        <SocialShareButtons :shareCount="42" :url="``" :title="``" />
        <div
          @click="toggleMoreInfo"
          class="mt-8 flex align-center md:justify-center text-white w-full md:w-[260px] bg-gray-800 p-2 gap-3 rounded hover:bg-violet-700 cursor-pointer hover:text-gray-100 transition-all duration-300 hover:scale-105"
        >
          <i class="pi pi-info-circle text-sm"></i>
          <span class="text-sm">More Information & Rating</span>
          <i :class="['pi text-sm', showMoreInfo ? 'pi-chevron-up' : 'pi-chevron-down']"></i>
        </div>

        <div
          class="more-info-container overflow-hidden transition-all duration-400 ease-in-out"
          :class="{
            'max-h-[500px] opacity-100': showMoreInfo,
            'max-h-0 opacity-0': !showMoreInfo,
          }"
        >
          <div class="flex flex-col w-full mt-3 mb-3">
            <div class="border-b border-gray-200 pb-4 grid gap-2">
              <div class="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 mb-2">
                <span class="text-gray-600">Author and Artist:</span>
                <span class="text-black"
                  >{{ mangaStore.manga.data.author?.map((author) => author) }},
                  {{ mangaStore.manga.data.artists?.map((artist) => artist) }}</span
                >
              </div>

              <div class="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 mb-2">
                <span class="text-gray-600">Published:</span>
                <span class="text-black">{{ mangaStore.manga.data?.year }}</span>
              </div>

              <div class="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 mb-2">
                <span class="text-gray-600 justify-center">Genres:</span>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="genre in genres"
                    :key="genre"
                    class="bg-violet-600 text-white text-sm px-3 py-1 rounded-full"
                  >
                    {{ genre }}
                  </span>
                </div>
              </div>

              <div class="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                <span class="text-gray-600">Magazines:</span>
                <span class="text-black">{{
                  mangaStore.manga.data?.serialization?.map((manga) => manga)
                }}</span>
              </div>
            </div>

            <div class="rating-section mt-4">
              <h3 class="text-lg text-gray-600 mb-2">Rating:</h3>
              <div class="flex items-center justify-center md:justify-start gap-2">
                <div class="rating-stars flex">
                  <i class="pi pi-star-fill text-yellow-400"></i>
                  <i class="pi pi-star-fill text-yellow-400"></i>
                  <i class="pi pi-star-fill text-yellow-400"></i>
                  <i class="pi pi-star-fill text-yellow-400"></i>
                  <i class="pi pi-star text-yellow-400"></i>
                </div>
                <span class="text-gray-700 font-bold">4.5/5</span>
                <span class="text-gray-600">(1,254 votes)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <EpisodesList />
  </div>
</template>
