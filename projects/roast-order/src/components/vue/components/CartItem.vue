<script setup>
defineProps(['item']);
defineEmits(['increase', 'decrease', 'remove']);
</script>

<template>
  <div class="flex justify-between items-center py-4 border-b border-white/5">
    <div>
      <p class="font-bold text-[#fff4dc]">{{ item.name }}</p>

      <div v-if="item.packag || item.roast" class="flex items-center gap-2 text-xs font-medium py-1">
        <span class="text-stone-300">
          {{ typeof item.packag === 'object' ? item.packag.weight : item.packag }}
        </span>
        <span class="text-stone-600">•</span>
        <span class="text-orange-500 uppercase tracking-widest text-[10px]">
          {{ item.roast }}
        </span>
      </div>

      <p class="text-sm text-stone-400">${{ item.price }} / unit</p>
    </div>
    <div class="flex items-center gap-4">
      <div class="flex items-center bg-stone-800 rounded-lg px-2 border border-white/5">
        <button @click="$emit('decrease')" class="p-2 hover:text-orange-400 transition">-</button>
        <span class="w-8 text-center font-sans">{{ item.quantity }}</span>
        <button @click="$emit('increase')" class="p-2 hover:text-orange-400 transition">+</button>
      </div>
      <button @click="$emit('remove')" class="text-stone-500 hover:text-red-400 transition">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
        </svg>
      </button>
    </div>
  </div>
</template>
<style scoped>
@reference "/src/styles/global.css";
</style>