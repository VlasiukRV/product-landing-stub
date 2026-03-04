<template>
    <div class="relative group overflow-hidden rounded-xl bg-black border border-white/10 shadow-2xl"
         @mouseenter="stopAutoplay"
         @mouseleave="startAutoplay">

        <div class="relative aspect-[4/3] w-full overflow-hidden">
            <div
                    v-for="(pair, index) in slides"
                    :key="index"
                    v-show="currentIndex === index"
                    class="relative w-full h-full cursor-crosshair group/slide"
            >
                <img
                        :src="pair.after"
                        class="w-full h-full object-cover"
                        alt="After repair"
                />

                <img
                        :src="pair.before"
                        class="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out group-hover/slide:opacity-0"
                        alt="Before repair"
                />

                <div class="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
                    Case #0{{ index + 1 }}
                </div>
            </div>
        </div>

        <div class="absolute inset-y-0 w-full flex justify-between items-center px-4 pointer-events-none">
            <button
                    @click="prev"
                    class="pointer-events-auto w-10 h-10 rounded-full bg-black/40 hover:bg-orange-600 border border-white/20 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
            >
                ←
            </button>
            <button
                    @click="next"
                    class="pointer-events-auto w-10 h-10 rounded-full bg-black/40 hover:bg-orange-600 border border-white/20 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
            >
                →
            </button>
        </div>

        <div class="absolute bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent w-full pt-8 pb-4 px-6">
            <p class="text-center text-sm font-medium mb-3 text-gray-300">
                <span class="group-hover:hidden italic">Hover to see "After" results</span>
                <span class="hidden group-hover:inline text-orange-500 font-bold uppercase tracking-widest italic">Result of our master work</span>
            </p>

            <div class="flex justify-center gap-2">
                <button
                        v-for="(_, idx) in slides"
                        :key="idx"
                        @click="currentIndex = idx"
                        :class="['w-8 h-1 transition-all rounded-full', currentIndex === idx ? 'bg-orange-500' : 'bg-white/20 hover:bg-white/40']"
                ></button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  slides: {
    type: Array,
    required: true,
  }
});

const currentIndex = ref(0);
let interval = null;
const autoplayDelay = 5000; // 5 секунд

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % props.slides.length;
};

const prev = () => {
  currentIndex.value =
      (currentIndex.value - 1 + props.slides.length) % props.slides.length;
};

const startAutoplay = () => {
  stopAutoplay();
  interval = setInterval(() => {
    next();
  }, autoplayDelay);
};

const stopAutoplay = () => {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
};

onMounted(() => {
  startAutoplay();

  // Пауза если вкладка не активна
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  });
});

onUnmounted(() => {
  stopAutoplay();
});
</script>