<template>
  <div class="flex justify-between mb-8">
    <div v-for="s in steps" :key="s.id"
         class="flex flex-col items-center flex-1">

      <div :class="['w-8 h-8 rounded-full flex items-center justify-center font-bold mb-2 transition-colors',
             s.id <= currentStep ? 'bg-orange-700 text-white' : 'bg-stone-800 text-stone-500']">
        {{ s.id }}
      </div>

      <span :class="['text-xs uppercase', s.id <= currentStep ? 'text-orange-200' : 'text-stone-600']">
        {{ s.label }}
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  steps: Array,
  currentStep: Number
});
</script>