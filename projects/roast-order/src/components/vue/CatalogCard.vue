<script setup>
defineProps(['product']);
defineEmits(['add']);
</script>

<template>
  <div class="bg-stone-900 rounded-xl overflow-hidden border border-white/10 hover:border-orange-700 transition-all group">

    <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover group-hover:scale-105 transition duration-500" />

    <div class="p-4">
        {{ product.name }}
      <p class="text-sm text-stone-400 mt-1 mb-4">
        {{ product.description }}
        <a :href="`/shop/${product.slug}`" class=" text-orange-700 hover:text-orange-400 transition">
          ... more
        </a>
      </p>

      <div class="flex justify-between items-center">
        <span class="text-lg font-bold text-coffee-cream">${{ product.price.toFixed(2) }}</span>
        <button @click="$emit('add', product)" class="bg-orange-700 hover:bg-orange-800 px-4 py-2 rounded-lg text-sm font-bold uppercase">
          Add
        </button>
      </div>
    </div>
  </div>
</template>