<script setup>
import { computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import CatalogCard from "./CatalogCard.vue";

const props = defineProps({
  categories: { type: Array, default: () => [] },
  selectedCategory: { type: String, default: null }
});

const emit = defineEmits(['add']);

const modules = [Pagination, Navigation];

const activeCategoryData = computed(() => {
  console.log('Categories:', props.categories);
  console.log('Searching for:', props.selectedCategory);

  const found = props.categories.find(cat => {
    // Принудительно приводим к строке и обрезаем пробелы для теста
    return String(cat.name).trim() === String(props.selectedCategory).trim();
  });

  console.log('Found:', found);
  return found;
});

</script>

<template>
  <div class="space-y-12 animate-in fade-in pb-24">
    <div v-if="activeCategoryData" class="category-section">

      <h2 class="text-3xl font-display text-orange-200 mb-6 border-l-4 border-orange-700 pl-4">
        {{ activeCategoryData.name }}
      </h2>

      <div class="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-8">
        <CatalogCard
            v-for="p in activeCategoryData.products"
            :key="p.id"
            :product="p"
            @add="emit('add', p)"
        />
      </div>

      <div class="sm:hidden -mx-4 overflow-x-hidden">
        <swiper
            :modules="modules"
            :space-between="16"
            :slides-per-view="1.3"
            :centered-slides="false"
            :slides-offset-before="16"
            :slides-offset-after="16"
            :pagination="{ clickable: true }"
            class="pb-10"
        >
          <swiper-slide v-for="p in activeCategoryData.products" :key="'swipe-' + p.id">
            <CatalogCard
                :product="p"
                @add="emit('add', p)"
            />
          </swiper-slide>
        </swiper>
      </div>
    </div>

    <div v-else class="text-center py-10 text-stone-500">
      No products found in this category.
    </div>

  </div>
</template>

<style>

.swiper-pagination-bullet {
  @apply bg-orange-200 opacity-50;
}
.swiper-pagination-bullet-active {
  @apply bg-orange-700 opacity-100;
}

</style>