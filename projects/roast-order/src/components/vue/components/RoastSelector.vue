<template>
  <div class="py-10 text-center">
    <h3 class="text-2xl font-display mb-8">Select Roast Level</h3>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <button
          v-for="roast in roasts" :key="roast.level"
          @click="$emit('select', roast.level)"
          :class="['p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-2',
          selected === roast.level
            ? 'border-orange-600 bg-orange-900/20'
            : 'border-white/5 hover:border-white/20 bg-stone-900/50']"
      >
        <span class="text-xl font-bold">{{ roast.level }}</span>
        <span class="text-xs text-stone-400 italic">{{ roast.desc }}</span>
      </button>
    </div>

  </div>
</template>

<script setup>
defineProps(['selected', 'roasts']);
defineEmits(['select']);

</script>