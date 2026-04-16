<script setup>
const props = defineProps({
  initialData: { type: Array, default: () => [] },
  isSidebar: { type: Boolean, default: false }
});

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('uk-UA', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
};
</script>

<template>
  <div :class="isSidebar ? 'flex flex-col gap-6' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'">
    <div
        v-for="item in initialData"
        :key="item.id"
        class="group flex flex-col bg-white border border-slate-100 rounded-3xl overflow-hidden hover:shadow-card transition-all duration-300"
    >
      <div v-if="item.image" :class="isSidebar ? 'aspect-[21/9]' : 'aspect-video'" class="relative overflow-hidden">
        <img :src="item.image" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>

      <div class="p-5 flex-1 flex flex-col">
        <div class="flex items-center gap-2 mb-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          <span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
          {{ formatDate(item.date) }}
        </div>

        <p class="text-slate-600 text-xs leading-relaxed mb-4 flex-1 line-clamp-3">
          {{ item.text }}
        </p>

        <a :href="item.link" target="_blank" class="text-blue-600 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
          Facebook <span class="text-lg">→</span>
        </a>
      </div>
    </div>
  </div>
</template>