<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 py-10">
    <button
        v-for="cat in categories"
        :key="cat.name"
        @click="$emit('select', cat.name)"
        class="group p-8 bg-stone-900/40 border border-white/5 rounded-2xl hover:border-orange-500/50 transition-all text-left"
    >
      <h3 class="text-2xl font-bold text-orange-100 group-hover:text-orange-400 transition-colors">
        {{ cat.name }}
      </h3>
      <p class="text-sm text-stone-400 mt-2">Explore our collection of {{ cat.name.toLowerCase() }}</p>
    </button>
  </div>
</template>

<script setup>
defineProps(['categories']);
defineEmits(['select']);
</script>