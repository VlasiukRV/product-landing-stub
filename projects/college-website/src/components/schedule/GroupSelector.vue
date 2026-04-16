<script setup>
const props = defineProps({ groups: Array });
</script>

<template>
  <div class="flex gap-2 flex-wrap">
    <a
        v-for="g in groups"
        :key="g.id"
        :href="`/schedule/${g.id}`"
        class="px-4 py-2 bg-white border rounded-lg hover:bg-gray-100"
    >
      {{ g.name }}
    </a>
  </div>
</template>