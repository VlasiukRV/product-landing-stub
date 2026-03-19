<template>
  <div class="py-10 text-center animate-in fade-in slide-in-from-bottom-4">
    <h3 class="text-2xl font-display mb-8 text-orange-100">Select Packaging</h3>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <button
          v-for="pack in packaging" :key="pack.id"
          @click="$emit('select', pack.id)"
          :class="['group p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3 relative overflow-hidden',
          selected === pack.id
            ? 'border-orange-600 bg-orange-900/30 ring-4 ring-orange-600/10'
            : 'border-white/5 hover:border-white/20 bg-stone-900/50']"
      >
        <div
            :class="['text-3xl mb-1 transition-transform duration-500 group-hover:scale-110',
          selected === pack.id ? 'text-orange-500' : 'text-stone-500']"
        >
          <span v-if="pack.weight === '250g'">☕</span>
          <span v-else-if="pack.weight === '500g'">📦</span>
          <span v-else>🚚</span>
        </div>

        <div class="flex flex-col">
          <span class="text-xl font-bold uppercase tracking-wider">{{ pack.label }}</span>
          <span class="text-orange-400 font-mono text-sm">{{ pack.weight }}</span>
        </div>

        <span class="text-xs text-stone-400 italic leading-relaxed px-2">
          {{ pack.desc }}
        </span>

        <div
            v-if="selected === pack.id"
            class="absolute top-3 right-3 w-2 h-2 bg-orange-600 rounded-full"
        ></div>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps(['selected', 'packaging']);
defineEmits(['select']);

</script>

<style scoped>
.animate-in {
  animation-duration: 0.5s;
}
</style>