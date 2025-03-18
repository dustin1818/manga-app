<script setup>
import { reactive } from 'vue'
import Button from 'primevue/button'
import { RouterLink } from 'vue-router'

const state = reactive({
  mangaId: 'leviathan',
})
</script>

<template>
  <div class="w-full h-screen flex justify-center items-center">
    <router-link :to="`/asurascans/info/${state.mangaId}`">
      <Button label="Start Reading" icon="pi pi-check" iconPos="right" />
    </router-link>
  </div>
</template>
