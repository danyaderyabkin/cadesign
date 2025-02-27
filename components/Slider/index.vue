<script setup lang="ts">
// Create 10 slides
const containerRef = ref(null)
const slides = ref(Array.from([
  {id: 1, title: 'Евдокимова Майя', image: 'finboss.png', short:'Генеральный директор', description: 'Цель нашей работы обеспечить высочайший сервис нашим клиентам. Дать возможность бизнесу сосредоточиться на своих ключевых задачах, передав функции управления персоналом, казначейства, финансового учёта и отчётности нам.'},
  {id: 2, title: 'Рябова Татьяна', image: 'vboss.png ', short:'Ведущий аналитик', description: 'Цель нашей работы обеспечить высочайший сервис нашим клиентам. Дать возможность бизнесу сосредоточиться на своих ключевых задачах, передав функции управления персоналом, казначейства, финансового учёта и отчётности нам.'},
  {id: 3, title: 'Васильев Дмитрий', image: 'pboss.png', short:'Специалист по привлечению клиентов', description: 'Цель нашей работы обеспечить высочайший сервис нашим клиентам. Дать возможность бизнесу сосредоточиться на своих ключевых задачах, передав функции управления персоналом, казначейства, финансового учёта и отчётности нам.'},
]))

const swiper = useSwiper(containerRef, {

})

onMounted(() => {
  // Access Swiper instance
  // Read more about Swiper instance: https://swiperjs.com/swiper-api#methods--properties
  console.log(swiper.instance)
})
</script>

<template>
  <ClientOnly>
    <swiper-container style="--swiper-pagination-color: #E9862A;" pagination="true"  ref="containerRef">
      <swiper-slide
          v-for="(slide, idx) in slides"
          :key="idx"
      >
        <div class="slider__wrapper pc">
          <img :src="`/assets/images/slider/${slide.image}`" :alt="slide.title">
          <h4>{{ slide.title }}</h4>
          <small>{{ slide.short }}</small>
          <p>{{ slide.description }}</p>
        </div>
        <div class="slider__wrapper mobile">
          <div class="slider-img">
            <img :src="`/assets/images/slider/${slide.image}`" :alt="slide.title">
          </div>
          <h4>{{ slide.title }}</h4>
          <small>{{ slide.short }}</small>
          <p>{{ slide.description }}</p>
        </div>
      </swiper-slide>
    </swiper-container>
  </ClientOnly>

  <!-- Go back one slide -->
  <button class="btn slider-btn slider-prev" @click="swiper.prev()">
    ‹
  </button>
  <!-- Go forward one slide -->
  <button class="btn slider-btn slider-next" @click="swiper.next()">
    ›
  </button>
</template>

<style>

</style>