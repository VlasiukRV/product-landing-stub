<script setup>
import {ref, onMounted} from 'vue';

const count = ref(0);
const cart = ref([]);

const updateCart = () => {
  const data = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.value = data;
  count.value = data.reduce((sum, item) => sum + item.quantity, 0);
};

const navigateToCart = () => {
  const url = '/cart?step=cart';

  if (window.location.pathname !== '/cart') {
    window.location.href = url;
  } else {
    window.history.pushState({}, '', url);
    window.dispatchEvent(new Event('popstate'));
    window.dispatchEvent(new Event('open-cart-step'));
  }
};

onMounted(() => {
  updateCart();
  window.addEventListener('storage', updateCart);
  window.addEventListener('cart-updated', updateCart);
});
</script>

<template>
  <a href="/cart"
     class="group relative p-2 hover:bg-white/10 rounded-full transition"
     @click.prevent="navigateToCart">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-coffee-cream" fill="none" viewBox="0 0 24 24"
         stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
    </svg>
    <span v-if="count > 0"
          class="absolute -top-1 -right-1 bg-orange-700 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center text-white">
          {{ count }}
    </span>

    <div v-if="count > 0"
         class="absolute right-0 top-10 w-64 bg-stone-900 border border-orange-700/50 p-4 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
      <h4 class="text-sm font-bold text-orange-200 mb-2">You order:</h4>
      <ul class="text-xs text-white space-y-1 mb-3 max-h-60 overflow-y-auto">
        <li v-for="item in cart" :key="item.name" class="flex justify-between">
          <span>{{ item.quantity }}x {{ item.name }}</span>
          <span>{{ item.roast }}</span>
        </li>
      </ul>

      <button
          @click.stop.prevent="navigateToCart"
          class="w-full block text-center text-[10px] uppercase tracking-widest bg-orange-700 py-1 rounded text-white"
      >
        View cart
      </button>

    </div>

  </a>
</template>
<style scoped>
@reference "/src/styles/global.css";
</style>