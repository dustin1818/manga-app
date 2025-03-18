<script setup>
import { reactive, computed, defineProps } from 'vue'
const props = defineProps({
  shareCount: {
    type: Number,
    default: 38,
  },
  url: {
    type: String,
    default: window.location.href,
  },
  title: {
    type: String,
    default: document.title,
  },
})

const buttons = reactive([
  {
    name: 'facebook',
    color: '#3b5998',
    icon: 'pi-facebook',
    hideOnMobile: false,
  },
  {
    name: 'twitter',
    color: '#000000',
    icon: 'pi-twitter',
    hideOnMobile: false,
  },
  {
    name: 'messenger',
    color: '#0084ff',
    icon: 'pi-send',
    count: 13,
    hideOnMobile: false,
  },
  {
    name: 'reddit',
    color: '#ff4500',
    icon: 'pi-reddit',
    hideOnMobile: false,
  },
  {
    name: 'whatsapp',
    color: '#25d366',
    icon: 'pi-whatsapp',
    hideOnExtraSmall: true,
  },
  {
    name: 'telegram',
    color: '#0088cc',
    icon: 'pi-telegram',
    hideOnMobile: true,
  },
])

const visibleButtons = computed(() => {
  return buttons
})

const shareContent = (platform) => {
  let shareUrl = ''

  switch (platform) {
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(props.url)}`
      break
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(props.url)}&text=${encodeURIComponent(props.title)}`
      break
    case 'reddit':
      shareUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(props.url)}&title=${encodeURIComponent(props.title)}`
      break
    case 'whatsapp':
      shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(props.title + ' ' + props.url)}`
      break
    case 'telegram':
      shareUrl = `https://t.me/share/url?url=${encodeURIComponent(props.url)}&text=${encodeURIComponent(props.title)}`
      break
  }

  if (shareUrl) {
    window.open(shareUrl, '_blank')
  }
}
</script>

<style scoped>
.social-btn {
  @apply text-white p-1.5 md:p-2 rounded flex-1 min-w-8 md:min-w-10 flex items-center justify-center transition-all hover:opacity-90;
}
</style>

<template>
  <div class="social-share-container flex flex-wrap items-center">
    <!-- Share count - hidden on mobile -->
    <div class="text-center mr-2 hidden sm:block">
      <div class="text-gray-400 text-lg md:text-xl font-bold">{{ shareCount }}</div>
      <div class="text-gray-400 text-xs">Shares</div>
    </div>

    <!-- Social buttons - responsive grid -->
    <div class="flex flex-1 flex-wrap gap-1 sm:gap-2">
      <button
        v-for="(button, index) in visibleButtons"
        :key="index"
        :class="[
          'social-btn',
          button.hideOnMobile ? 'hidden sm:flex' : '',
          button.hideOnExtraSmall ? 'hidden xs:flex' : '',
        ]"
        :style="{ backgroundColor: button.color }"
        @click="shareContent(button.name)"
      >
        <i :class="`pi ${button.icon}`"></i>
        <span v-if="button.count" class="ml-1 text-sm md:text-base">{{ button.count }}</span>
      </button>
    </div>
  </div>
</template>
