<script setup>
import { reactive } from 'vue'
const props = defineProps({
  chapters: {
    type: Array,
  },
})

const isChapterHovered = reactive({
  active: false,
  chapter: {},
  index: null,
})

const handleChapterHover = (index) => {
  isChapterHovered.index = index
  if (isChapterHovered.index === index) {
    isChapterHovered.active = !isChapterHovered.active
  }
}
const handleRemoveChapterHover = (index) => {
  isChapterHovered.index = index
  if (isChapterHovered.index === index) {
    isChapterHovered.index = null
  }
}
</script>

<template>
  <div class="bg-gray-800 text-gray-100 mt-5 rounded">
    <div class="mx-auto p-4">
      <div class="flex justify-between items-center mb-6 py-3 border-b border-gray-400">
        <div class="flex items-center hover:text-violet-400">
          <i class="pi pi-globe mr-2"></i>
          <span>Language: EN</span>
        </div>
        <div class="relative">
          <input
            type="text"
            placeholder="Chapter number..."
            class="bg-gray-800 rounded-lg px-4 py-2 text-sm w-56 pr-10 focus:outline-none focus:ring-2 focus:ring-violet-800"
          />
          <i class="pi pi-search absolute right-3 top-2.5 text-gray-400 hover:text-violet-400"></i>
        </div>
      </div>

      <ul class="divide-y divide-gray-600 overflow-y-scroll h-[500px]">
        <RouterLink
          v-for="(chapter, index) of props.chapters"
          :key="chapter.id"
          :to="`/asurascans/pages/${chapter.id}`"
        >
          <li
            @mouseover="handleChapterHover(index)"
            @mouseleave="handleRemoveChapterHover(index)"
            :class="[
              'py-4 px-2 cursor-pointer border-b border-gray-600 flex justify-between items-center hover:text-violet-400 transition duration-150 ease-in-out',
              { 'text-violet-400': isChapterHovered.index === index },
            ]"
          >
            <div
              class="flex items-center transition duration-[600ms] ease-in-out hover:text-violet-400 hover:scale-120"
            >
              <i v-if="isChapterHovered.index === index" class="pi pi-play-circle mr-2"></i>
              <span>{{ chapter.title }}</span>
            </div>
            <span class="text-gray-400">{{ chapter.date }}</span>
          </li>
        </RouterLink>
      </ul>
    </div>
  </div>
</template>
