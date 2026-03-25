<script setup>
import { computed } from 'vue'

const props = defineProps({
  score: Number,
  total: Number,
  questions: Array,
  userAnswers: Object
})

const mistakes = computed(() => {
  return props.questions.filter(q => props.userAnswers[q.id] !== q.correct)
})

const percentage = computed(() => Math.round((props.score / props.total) * 100))

const handleRestart = () => {
  if (typeof window !== 'undefined') {
    window.location.reload();
  }
}

</script>

<template>
  <div class="mt-10">
    <div class="text-center p-8 bg-white/5 rounded-2xl border border-gray-200 mb-8">
      <h2 class="text-3xl font-bold mb-2">Test Completed!</h2>
      <div class="text-5xl font-mono font-bold text-blue-600 mb-2">
        {{ score }} / {{ total }}
      </div>
      <p class="text-gray-500 uppercase tracking-widest text-sm">
        Your score: {{ percentage }}%
      </p>
    </div>

    <div v-if="mistakes.length > 0">
      <h3 class="text-xl font-bold mb-4 text-red-600 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        Review your mistakes:
      </h3>

      <div class="space-y-4">
        <div
            v-for="q in mistakes"
            :key="q.id"
            class="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl"
        >
          <p class="font-bold text-gray-900 mb-2">{{ q.text }}</p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div class="flex items-center gap-2">
              <span class="text-gray-500">Your answer:</span>
              <span class="text-red-600 font-semibold line-through">
                {{ userAnswers[q.id] || 'Skipped' }}
              </span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-gray-500">Correct answer:</span>
              <span class="text-green-600 font-bold">
                {{ q.correct }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center p-10 bg-green-50 rounded-2xl border border-green-200">
      <p class="text-green-700 font-bold text-xl">Perfect! No mistakes found. 🏆</p>
    </div>

    <button
        @click="handleRestart"
        class="w-full mt-10 py-3 text-gray-500 hover:text-blue-600 transition-colors text-sm uppercase tracking-widest font-bold"
    >
      Try Again
    </button>
  </div>
</template>