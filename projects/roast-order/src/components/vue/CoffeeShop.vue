<script setup>
import { ref, onMounted, computed, provide } from 'vue';
import StepProgress from './StepProgress.vue';
import ShopCatalog from "./ShopCatalog.vue";
import CartView from "./CartView.vue";
import CheckoutForm from "./CheckoutForm.vue";
import RoastSelection from "./RoastSelector.vue"

const props = defineProps({ initialProducts: { type: Array, default: () => [] } });

const notification = ref({ show: false, message: '' });
const cart = ref([]);
const step = ref(1);
const isProcessing = ref(false);
const userInfo = ref({ name: '', phone: '', email: '', address: '' });

const pendingProduct = ref(null);
const roastLevel = ref('Medium');
const roasts = ['Light', 'Medium', 'Dark'];

const steps = [
  { id: 1, label: 'Select' },
  { id: 2, label: 'Roast' },
  { id: 3, label: 'Cart' },
  { id: 4, label: 'Payment' }
];

// 1. Вычисляемые данные
const categories = computed(() => {
  const groups = props.initialProducts.reduce((acc, product) => {
    const key = product.category || 'Other';
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(product);
    return acc;
  }, {});

  return Object.keys(groups).map(name => ({
    name,
    products: groups[name]
  }));
});

const total = computed(() => cart.value.reduce((s, i) => s + (i.price * i.quantity), 0).toFixed(2));

// 2. Методы корзины
const addToCart = (product) => {
  pendingProduct.value = product;
  step.value = 2;
};

const confirmRoastSelection = () => {
  if (!pendingProduct.value) return;

  const newItem = {
    ...pendingProduct.value,
    quantity: 1,
    roast: roastLevel.value
  };

  const item = cart.value.find(i => i.name === newItem.name && i.roast === newItem.roast);

  if (item) {
    item.quantity++;
  } else {
    cart.value.push(newItem);
  }

  save();
  notify(`${newItem.name} (${newItem.roast}) added!`);

  pendingProduct.value = null;
  step.value = 3;
};

const updateQuantity = (idx, delta) => {
  cart.value[idx].quantity = Math.max(1, cart.value[idx].quantity + delta);
  save();
};

const removeFromCart = (idx) => { cart.value.splice(idx, 1); save(); };
const save = () => {
  localStorage.setItem("cart", JSON.stringify(cart.value));
  window.dispatchEvent(new Event('cart-updated'));
}

// 3. Платежи
let stripe = null;
let cardElement = null;

const notify = (msg) => {
  notification.value = { show: true, message: msg };
  setTimeout(() => notification.value.show = false, 3000);
};

onMounted(() => {
  cart.value = JSON.parse(localStorage.getItem("cart")) || [];
  if (window.Stripe) {
    stripe = window.Stripe('pk_test_your_key');
    cardElement = stripe.elements().create('card');
  }
});

const initStripeUI = () => {
  step.value = 4;
  setTimeout(() => cardElement?.mount('#card-element'), 100);
};

const handlePayment = async () => {
  isProcessing.value = true;
  await new Promise(r => setTimeout(r, 2000));
  alert("Success!");
  cart.value = [];
  save();
  step.value = 1;
  isProcessing.value = false;
};
</script>

<template>
  <section class="max-w-4xl mx-auto mt-10 p-6 bg-black/65 rounded-2xl shadow-2xl text-[#fff4dc]">
    <header class="flex justify-between items-center mb-8 border-b border-orange-900/30 pb-4">
      <h2 class="text-3xl font-bold font-serif">Coffee Order</h2>
    </header>

    <StepProgress :steps="steps" :currentStep="step" />

    <div>
      <ShopCatalog
          v-if="step === 1"
          :categories="categories"
          :showCartButton="true"
          @add="addToCart"
          @goToCart="step = 3"
      />

      <RoastSelection
          v-if="step === 2"
          :roasts="roasts"
          :selected="roastLevel"
          @select="roastLevel = $event"
          @next="confirmRoastSelection"
          @back="step = 1"
      />

      <CartView v-if="step === 3" :cart="cart" :total="total"
                @increase="updateQuantity($event, 1)"
                @decrease="updateQuantity($event, -1)"
                @remove="removeFromCart"
                @back="step = 1" @checkout="initStripeUI" />

      <CheckoutForm v-if="step === 4" :userInfo="userInfo" :isProcessing="isProcessing" :total="total"
                    @back="step = 3" @pay="handlePayment" />

      <Transition name="fade">
        <div v-if="notification.show" class="fixed top-10 right-10 z-50 p-4 bg-orange-700 text-white rounded-lg shadow-xl font-sans">
          {{ notification.message }}
        </div>
      </Transition>

    </div>
  </section>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>