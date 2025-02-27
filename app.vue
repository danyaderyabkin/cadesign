<template>
  <NuxtLoadingIndicator color="#CFBC00"/>
  <TheHeader/>
  <main class="main">
    <TheHero @open-modal="openModal"/>
    <NuxtLayout/>
  </main>
  <TheFooter @open-modal="openModal"/>
  <MainForm :opened="modal" @close-modal="closeModal"/>
</template>
<script setup lang="ts">
const modal = ref(false)
const openModal = () => {
  modal.value = true
}
const closeModal = () => {
  modal.value = false
}
</script>