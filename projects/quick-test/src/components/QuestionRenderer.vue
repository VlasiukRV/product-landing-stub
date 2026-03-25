<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  question: Object,
  modelValue: String
})

const emit = defineEmits(['update:modelValue', 'next'])
const answerInput = ref(null);

// Автофокус при смене вопроса
watch(() => props.question.id, () => {
  if (props.question.type === 'input') {
    setTimeout(() => answerInput.value?.focus(), 50);
  }
});

function selectAnswer(id) {
  emit('update:modelValue', id)
  // Автопереход для кнопок через 200мс
  setTimeout(() => {
    emit('next');
  }, 200);
}

const handleInput = (e) => {
  emit('update:modelValue', e.target.value)
}

onMounted(() => {
  if (props.question.type === 'input') {
    answerInput.value?.focus()
  }
});
</script>

<template>
  <div class="py-4">
    <h3 class="text-xl font-bold mb-6 text-slate-800">{{ question.text }}</h3>

    <div v-if="question.image" class="mb-8 flex justify-center p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
      <img
          :src="question.image"
          :alt="question.text"
          class="max-h-56 w-auto object-contain drop-shadow-xl transition-all hover:scale-105"
      />
    </div>

    <div v-if="question.type === 'single'" class="grid gap-3">
      <button
          v-for="ans in question.answers"
          :key="ans.id"
          @click="selectAnswer(ans.id)"
          class="w-full p-4 text-left border-2 rounded-2xl transition-all font-medium"
          :class="modelValue === ans.id
            ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md'
            : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'"
      >
        <span class="inline-block w-8 text-slate-400 font-mono">{{ ans.id.toUpperCase() }}.</span>
        {{ ans.text }}
      </button>
    </div>

    <div v-else-if="question.type === 'input'" class="mt-4">
      <input
          type="text"
          :value="modelValue"
          ref="answerInput"
          @input="handleInput"
          @keyup.enter="$emit('next')"
          placeholder="Enter state name..."
          class="w-full p-5 border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-xl font-mono text-center"
      />
      <div class="mt-3 flex justify-between text-[10px] uppercase tracking-widest font-bold text-slate-400 px-2">
        <span>Press Enter to submit</span>
        <span>Case insensitive</span>
      </div>
    </div>
  </div>
</template>