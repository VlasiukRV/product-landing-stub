<template>
  <div class="py-10 text-center">
    <h3 class="text-2xl font-display mb-8">Select Roast Level</h3>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <button
          v-for="roast in roastDetails" :key="roast.level"
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

    <div class="flex gap-4 mt-8">
      <button @click.stop="$emit('back')" type="button" class="flex-1 py-3 border border-stone-700 rounded-xl">Back</button>
      <button @click="$emit('next')" class="flex-1 py-3 bg-orange-700 rounded-xl font-bold uppercase">Continue</button>
    </div>

  </div>
</template>

<script setup>
defineProps(['selected']);
defineEmits(['select', 'next', 'back']);

const roastDetails = [
  { level: 'Light', desc: 'Bright, acidic, floral notes' },
  { level: 'Medium', desc: 'Balanced, sweet, rounded' },
  { level: 'Dark', desc: 'Bold, smoky, chocolatey' }
];
</script>