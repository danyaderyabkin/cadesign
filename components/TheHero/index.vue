<script setup lang="ts">
const emit = defineEmits(['openModal'])
</script>
<template>
  <section class="hero">
    <div class="hero__container container">
      <h1>Энергия твоего роста! -<br> заряжаем твою карьеру</h1>
      <button @click.prevent="emit('openModal')" class="btn btn-primary">Стать частью команды</button>
      <div class="hero__people"></div>
      <div class="hero__bg"></div>
    </div>
  </section>
</template>
