<script setup>
const props = defineProps({ groups: Array });

// Групуємо по курсах для кращої структури
const groupsByYear = props.groups.reduce((acc, g) => {
  const year = g.year || 'Інші';
  if (!acc[year]) acc[year] = [];
  acc[year].push(g);
  return acc;
}, {});
</script>

<template>
  <div class="space-y-12">
    <div v-for="(yearGroups, year) in groupsByYear" :key="year" class="space-y-6">
      <div class="flex items-center gap-4">
        <span class="px-4 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
          {{ year }} Курс
        </span>
        <div class="h-px flex-1 bg-slate-200"></div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <a
            v-for="g in yearGroups"
            :key="g.id"
            :href="`/schedule/${g.id}`"
            class="group relative bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm hover:shadow-xl hover:border-blue-100 transition-all overflow-hidden"
        >
          <div class="relative z-10 flex justify-between items-start">
            <div>
              <p class="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Група</p>
              <h3 class="text-2xl font-black text-slate-800 italic group-hover:text-blue-700 transition-colors">
                {{ g.name }}
              </h3>
            </div>
            <div class="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-xl group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
              →
            </div>
          </div>

          <div class="absolute -right-2 -bottom-2 text-6xl font-black text-slate-50 opacity-0 group-hover:opacity-100 transition-all italic">
            {{ g.name }}
          </div>
        </a>
      </div>
    </div>
  </div>
</template>