<script setup>
import { onMounted, ref, reactive } from 'vue'
import axios from 'axios'
import Button from 'primevue/button'
import SocialShareButtons from '@/components/SocialShareButtons.vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import EpisodesList from '@/components/EpisodesList.vue'

const mangaId = 'leviathan'
const manga = reactive({
  data: {},
  loading: true,
})

const showMoreInfo = ref(false)

const toggleMoreInfo = () => {
  showMoreInfo.value = !showMoreInfo.value
}

onMounted(async () => {
  try {
    const response = await axios.get(`/api/asurascans/info/${mangaId}`)
    const data = await response.data
    manga.data = data.results[0]
  } catch (error) {
    console.error(error)
  } finally {
    manga.loading = false
  }
})
</script>

<template>
  <div v-if="manga.loading" class="w-full h-screen grid items-center">
    <PulseLoader class="m-auto" color="#9333EA" />
  </div>

  <div v-else class="manga-info-view p-4 md:p-5">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 place-items-center md:place-items-start">
      <div class="img-wrapper w-3/4 md:w-full">
        <img
          :src="manga.data.images"
          :alt="manga.data.images"
          class="w-full object-cover rounded-lg shadow-md"
        />
      </div>

      <div class="info-wrapper text-center md:text-start md:col-span-3">
        <span class="text-2xl font-bold">{{ mangaId.toLocaleUpperCase() }}</span>
        <p class="mt-2 mb-8">Lviathan; Simhaesu; Deepwater</p>

        <div class="btn-container w-full flex justify-center md:justify-start flex-wrap gap-3 mb-8">
          <Button label="Start Reading" icon="pi pi-play" iconPos="right" raised />
          <Button
            label="Boomarks"
            icon="pi pi-bookmark"
            iconPos="right"
            severity="secondary"
            raised
          />
        </div>

        <div class="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
          <span>Status</span>
          <span>Completed</span>
          <span>Completed</span>
        </div>

        <p class="text-sm mb-6 md:text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta, dolorum! Eius rem nihil
          dolor alias esse ad illum quaerat similique. Odit ea culpa, sed ratione repudiandae
          exercitationem dolorum aut facilis? Error consequatur necessitatibus sunt quia, ipsa
          voluptate veniam delectus iste corporis impedit praesentium vero saepe officiis nemo
          beatae nisi cum a ipsam quisquam? Perspiciatis voluptate itaque nobis provident
          consequatur a. Illo maxime omnis soluta aliquam magnam perferendis tenetur ad alias ut rem
          aliquid veniam expedita sapiente quis unde, minima perspiciatis harum pariatur? Aut
          voluptate alias nesciunt dolorum quaerat consequuntur aspernatur.
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
          :class="{ 'max-h-[500px] opacity-100': showMoreInfo, 'max-h-0 opacity-0': !showMoreInfo }"
        >
          <div class="flex flex-col w-full mt-3 mb-3">
            <div class="border-b border-gray-200 pb-4 grid gap-2">
              <div class="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 mb-2">
                <span class="text-gray-600">Author:</span>
                <span class="text-black">Miyoung Noh, Gyuntak Lee</span>
              </div>

              <div class="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 mb-2">
                <span class="text-gray-600">Published:</span>
                <span class="text-black">Mar 12, 2018 to Apr 01, 2022</span>
              </div>

              <div class="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 mb-2">
                <span class="text-gray-600 justify-center">Genres:</span>
                <div class="flex flex-wrap gap-2">
                  <span class="bg-violet-600 text-white text-sm px-3 py-1 rounded-full"
                    >Action</span
                  >
                  <span class="bg-violet-600 text-white text-sm px-3 py-1 rounded-full"
                    >Adventure</span
                  >
                  <span class="bg-violet-600 text-white text-sm px-3 py-1 rounded-full"
                    >Fantasy</span
                  >
                </div>
              </div>

              <div class="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                <span class="text-gray-600">Magazines:</span>
                <span class="text-black">Toomics</span>
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

    <EpisodesList :chapters="manga.data.chapters" />
  </div>
</template>
