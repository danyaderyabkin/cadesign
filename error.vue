<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
 <TheHeader/>
  <main>
    <section class="error">
      <div class="container">
        <h1>404</h1>
        <p>Страница не найдена!</p>
        <button class="btn btn-primary" @click="handleError">На главную</button>
      </div>
    </section>
  </main>
  <TheFooter/>
</template>

<style scoped>

</style>