<script setup>
import CatalogCard from "./CatalogCard.vue";
defineProps({
  categories: Array,
  showCartButton: { type: Boolean, default: true }
});
defineEmits(['add', 'goToCart']);
</script>

<template>
  <div class="space-y-12 animate-in fade-in">
    <div v-for="cat in categories" :key="cat.name">
      <h2 class="text-3xl font-display text-orange-200 mb-8 border-l-4 border-orange-700 pl-4">
        {{ cat.name }}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <CatalogCard v-for="p in cat.products" :key="p.id" :product="p" @add="$emit('add', p)" />
      </div>
    </div>
    <div v-if="showCartButton" class="flex gap-4 mt-8">
        <button @click="$emit('goToCart')" class="flex-1 py-3 bg-orange-700 rounded-xl font-bold uppercase">View Cart</button>
    </div>
  </div>
</template>