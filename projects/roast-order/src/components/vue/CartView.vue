<script setup>
import CartItem from './CartItem.vue';
defineProps(['cart', 'total']);
defineEmits(['back', 'checkout', 'increase', 'decrease', 'remove']);
</script>

<template>
  <div class="space-y-6 animate-in fade-in">
    <div v-if="cart.length === 0" class="text-center py-10 opacity-50">Your cart is empty</div>
    <div v-else>
      <CartItem v-for="(item, idx) in cart" :key="`${item.name}-${item.roast}`" :item="item"
                @increase="$emit('increase', idx)"
                @decrease="$emit('decrease', idx)"
                @remove="$emit('remove', idx)" />
      <div class="text-right mt-6 text-2xl font-bold">Total: <span class="text-orange-400">${{ total }}</span></div>
    </div>
    <div class="flex gap-4 mt-8">
      <button @click="$emit('back')" class="flex-1 py-3 border border-stone-700 rounded-xl">Back</button>
      <button @click="$emit('checkout')" class="flex-1 py-3 bg-orange-700 rounded-xl font-bold uppercase">Checkout</button>
    </div>
  </div>
</template>