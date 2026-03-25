<script setup>
import { ref, computed } from 'vue'
import QuestionRenderer from './QuestionRenderer.vue'
import ResultView from './ResultView.vue'

const props = defineProps({
  test: Object
})

const answers = ref({})
const finished = ref(false)
const currentIndex = ref(0)

// Get the actual question object based on index
const currentQuestion = computed(() => props.test.questions[currentIndex.value])

// Calculate the progress percentage for the progress bar
const progress = computed(() => {
  return ((currentIndex.value + 1) / props.test.questions.length) * 100
})

const score = computed(() => {
  let s = 0
  for (const q of props.test.questions) {
    const userAns = String(answers.value[q.id] || '').trim().toLowerCase()
    const correctAns = String(q.correct).trim().toLowerCase()

    if (q.type === 'single') {
      if (userAns === correctAns) s++
    } else {
      if (userAns === correctAns) s++
    }
  }
  return s
})

const isLastQuestion = computed(() => {
  return currentIndex.value === props.test.questions.length - 1
})

function next() {
  if (!isLastQuestion.value) {
    currentIndex.value++
  }
}

function prev() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

function submit() {
  finished.value = true
}

function nextStep() {

  if ( !isLastQuestion.value )  {
    next();
  } else {
    submit();
  }

}

</script>

<template>
  <div class="max-w-xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">
      {{ test.title }}
    </h1>

    <div v-if="!finished">
      <div class="w-full bg-gray-200 rounded-full h-1.5 mb-6">
        <div
            class="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
            :style="{ width: progress + '%' }"
        ></div>
      </div>

      <div class="mb-4 text-sm text-gray-500 uppercase tracking-wider font-semibold">
        Question {{ currentIndex + 1 }} of {{ test.questions.length }}
      </div>

      <div class="min-h-[200px]">
        <QuestionRenderer
            :key="currentQuestion.id"
            :question="currentQuestion"
            v-model="answers[currentQuestion.id]"
            @next="nextStep"
        />
      </div>

      <div class="mt-8 flex gap-4">
        <button
            v-if="currentIndex > 0"
            class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            @click="prev"
        >
          Back
        </button>

        <button
            v-if="!isLastQuestion"
            :disabled="!answers[currentQuestion.id]"
            class="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
            :class="{ 'opacity-50 cursor-not-allowed': !answers[currentQuestion.id] }"
            @click="next"
        >
          Next
        </button>

        <button
            v-else
            :disabled="!answers[currentQuestion.id]"
            class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold transition-all"
            :class="{ 'opacity-50 cursor-not-allowed': !answers[currentQuestion.id] }"
            @click="submit"
        >
          Complete Test
        </button>
      </div>
    </div>

    <ResultView
        v-else
        :score="score"
        :total="test.questions.length"
        :questions="test.questions"
        :userAnswers="answers"
    />

  </div>
</template>