<script setup>
defineProps(['product']);
defineEmits(['add']);
</script>

<template>
  <div class="bg-stone-900 rounded-xl overflow-hidden border border-white/10 hover:border-orange-700 transition-all group">
    <a :href="`/shop/${product.slug}`" class="block">
      <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover group-hover:scale-105 transition duration-500" />
    </a>

    <div class="p-4">
      <a :href="`/shop/${product.slug}`" class="text-xl font-display hover:text-orange-400 transition">
        {{ product.name }}
      </a>
      <p class="text-sm text-stone-400 mt-1 mb-4">{{ product.description }}</p>

      <div class="flex justify-between items-center">
        <span class="text-lg font-bold text-coffee-cream">${{ product.price.toFixed(2) }}</span>
        <button @click="$emit('add', product)" class="bg-orange-700 hover:bg-orange-800 px-4 py-2 rounded-lg text-sm font-bold uppercase">
          Add
        </button>
      </div>
    </div>
  </div>
</template>