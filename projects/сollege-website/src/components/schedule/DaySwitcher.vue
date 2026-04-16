<script setup>
import { ref } from 'vue'

const days = ["Пн", "Вт", "Ср", "Чт", "Пт"]
const active = ref(0)
</script>

<template>
  <div>
    <div class="flex gap-2 mb-4">
      <button
          v-for="(d,i) in days"
          :key="i"
          @click="active = i"
          class="px-3 py-1 border rounded"
      >
        {{ d }}
      </button>
    </div>

    <slot :day="active"></slot>
  </div>
</template>