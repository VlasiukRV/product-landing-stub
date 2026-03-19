<script setup>
import {ref, onMounted, computed, provide} from 'vue';
import StepProgress from './StepProgress.vue';
import ShopCatalog from "./ShopCatalog.vue";
import CartView from "./CartView.vue";
import CheckoutForm from "./CheckoutForm.vue";
import RoastSelection from "./RoastSelector.vue"
import PackagingSelector from "./PackagingSelector.vue";

const props = defineProps({initialProducts: {type: Array, default: () => []}});

const notification = ref({show: false, message: ''});
const cart = ref([]);
const step = ref(1);
const isProcessing = ref(false);
const userInfo = ref({name: '', phone: '', email: '', address: ''});

const pendingProduct = ref(null);

const steps = [
  {id: 1, name:"1", label: 'Coffee type'},
  {id: 2, name:"1.1", label: 'Set Roast'},
  {id: 3, name:"1.2", label: 'Set Weight'},
  {id: 4, name:"2", label: 'My Cart'},
  {id: 5, name:"3", label: 'Payment'}
];

const roasts = [
  { level: 'Light', desc: 'Bright, acidic, floral notes' },
  { level: 'Medium', desc: 'Balanced, sweet, rounded' },
  { level: 'Dark', desc: 'Bold, smoky, chocolatey' }
];
const roastLevel = ref('Medium');

const packaging = [
  {
    id: 'standard',
    label: 'Retail Bag',
    weight: '250g',
    desc: 'Perfect for home brewing. Valve-sealed for freshness.'
  },
  {
    id: 'value',
    label: 'Standard Pack',
    weight: '500g',
    desc: 'Great balance of price and volume for daily drinkers.'
  },
  {
    id: 'bulk',
    label: 'Eco Bulk',
    weight: '1kg',
    desc: 'Eco-friendly bulk packaging. Maximum savings.'
  }
];
const packag = ref('standard');

// 1. Вычисляемые данные
const categoryOrder = ['Roasted Coffee', 'Green Coffee', 'Equipment', 'Other'];

const categories = computed(() => {
  const groups = props.initialProducts.reduce((acc, product) => {
    const key = product.category || 'Other';
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(product);
    return acc;
  }, {});

  return Object.keys(groups)
      .sort((a, b) => {
        let indexA = categoryOrder.indexOf(a);
        let indexB = categoryOrder.indexOf(b);

        // Если категории нет в списке, ставим её в конец (индекс 999)
        if (indexA === -1) indexA = 999;
        if (indexB === -1) indexB = 999;

        return indexA - indexB;
      })
      .map(name => ({
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
    roast: roastLevel.value,
    packag: packag.value,
  };

  const item = cart.value.find(i =>
      i.name === newItem.name &&
      i.roast === newItem.roast &&
      i.packag === newItem.packag
  );

  if (item) {
    item.quantity++;
  } else {
    cart.value.push(newItem);
  }

  save();
  notify(`${newItem.name} ${newItem.weight} (${newItem.roast}) added!`);

  pendingProduct.value = null;
  step.value = 4;
};

const updateQuantity = (idx, delta) => {
  cart.value[idx].quantity = Math.max(1, cart.value[idx].quantity + delta);
  save();
};

const removeFromCart = (idx) => {
  cart.value.splice(idx, 1);
  save();
};
const save = () => {
  localStorage.setItem("cart", JSON.stringify(cart.value));
  window.dispatchEvent(new Event('cart-updated'));
}

let stripe = null;
let cardElement = null;

const notify = (msg) => {
  notification.value = {show: true, message: msg};
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
  step.value = 5;
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

    <StepProgress :steps="steps" :currentStep="step"/>

    <div class="flex flex-col h-[50vh]">

      <div class="overflow-y-auto flex-1">

        <ShopCatalog
            v-if="step === 1"
            :categories="categories"
            :showCartButton="true"
            @add="addToCart"
        />

        <RoastSelection
            v-if="step === 2"
            :roasts="roasts"
            :selected="roastLevel"
            @select="roastLevel = $event"
        />

        <PackagingSelector
            v-if="step === 3"
            :packaging="packaging"
            :selected="packag"
            @select="packag = $event"
        />

        <CartView v-if="step === 4" :cart="cart" :total="total"
                  @increase="updateQuantity($event, 1)"
                  @decrease="updateQuantity($event, -1)"
                  @remove="removeFromCart"
        />

        <CheckoutForm v-if="step === 5" :userInfo="userInfo" :isProcessing="isProcessing" :total="total"
                      @back="step = 4" @pay="handlePayment"/>

      </div>

      <div>

        <div v-if="step === 1"
             class="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent sm:relative sm:bg-none sm:p-0 sm:mt-8 z-50">
          <button @click="step = 4"
                  class="w-full py-4 bg-orange-700 hover:bg-orange-600 text-white rounded-xl font-bold uppercase shadow-2xl transition-colors">
            View Cart
          </button>
        </div>

        <div v-if="step === 2" class="flex gap-4 mt-8">
          <button @click.stop="step = 1" type="button" class="flex-1 py-3 border border-stone-700 rounded-xl">Back
          </button>
          <button @click="step = 3" class="flex-1 py-3 bg-orange-700 rounded-xl font-bold uppercase">
            Continue
          </button>
        </div>

        <div v-if="step === 3" class="flex gap-4 mt-8">
          <button @click.stop="step = 2" type="button" class="flex-1 py-3 border border-stone-700 rounded-xl">Back
          </button>
          <button @click="confirmRoastSelection" class="flex-1 py-3 bg-orange-700 rounded-xl font-bold uppercase">
            Continue
          </button>
        </div>

        <div v-if="step === 4" class="flex gap-4 mt-8">
          <button @click="step = 1" class="flex-1 py-3 border border-stone-700 rounded-xl">I want more</button>
          <button @click="initStripeUI" class="flex-1 py-3 bg-orange-700 rounded-xl font-bold uppercase">Checkout</button>
        </div>

      </div>

    </div>

    <Transition name="fade">
      <div v-if="notification.show"
           class="fixed top-10 right-10 z-50 p-4 bg-orange-700 text-white rounded-lg shadow-xl font-sans">
        {{ notification.message }}
      </div>
    </Transition>

  </section>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>