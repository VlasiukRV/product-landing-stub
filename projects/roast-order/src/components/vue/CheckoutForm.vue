<script setup>
defineProps(['userInfo', 'isProcessing', 'total']);
defineEmits(['back', 'pay']);
</script>

<template>
  <div class="space-y-6 animate-in fade-in">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input v-model="userInfo.name" placeholder="Full Name" class="bg-stone-800/50 p-3 rounded-lg border border-white/10" />
      <input v-model="userInfo.phone" placeholder="Phone" class="bg-stone-800/50 p-3 rounded-lg border border-white/10" />
      <input v-model="userInfo.address" placeholder="Delivery Address" class="md:col-span-2 bg-stone-800/50 p-3 rounded-lg border border-white/10" />
    </div>
    <div class="mt-8 p-4 bg-stone-900 rounded-xl border border-white/5">
      <div id="card-element"></div>
    </div>
    <div class="flex gap-4 mt-8">
      <button @click="$emit('back')" class="flex-1 py-3 border border-stone-700 rounded-xl">Back</button>
      <button @click="$emit('pay')" :disabled="isProcessing" class="flex-1 py-3 bg-green-700 rounded-xl font-bold uppercase disabled:opacity-50">
        {{ isProcessing ? 'Processing...' : `Pay $${total}` }}
      </button>
    </div>
  </div>
</template>