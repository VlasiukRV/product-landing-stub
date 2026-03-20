<script setup>
import {ref, computed, onMounted} from 'vue';
import {useFlow} from './composables/useFlow.js';
import {FLOW_CONFIG} from './flows';

import StepProgress from './components/StepProgress.vue';
import ShopCatalog from './components/ShopCatalog.vue';
import CartView from './components/CartView.vue';
import CheckoutForm from './components/CheckoutForm.vue';
import RoastSelection from './components/RoastSelector.vue';
import PackagingSelector from './components/PackagingSelector.vue';
import CategorySelector from "./components/CategorySelector.vue";

const props = defineProps({
  initialProducts: {type: Array, default: () => []}
});

const componentMap = {
  CategorySelector,
  ShopCatalog,
  CartView,
  CheckoutForm,
  RoastSelection,
  PackagingSelector
};

const notification = ref({show: false, message: ''});

const context = {
  cart: ref([]),
  pendingProduct: ref(null),

  selectedCategory: ref(null),
  roastLevel: ref('Medium'),
  packag: ref('standard'),

  userInfo: ref({
    name: '',
    phone: '',
    email: '',
    address: ''
  }),

  isProcessing: ref(false),

  // 📦 данные
  roasts: [
    {level: 'Light', desc: 'Bright, acidic, floral notes'},
    {level: 'Medium', desc: 'Balanced, sweet, rounded'},
    {level: 'Dark', desc: 'Bold, smoky, chocolatey'}
  ],

  packaging: [
    {
      id: 'standard',
      label: 'Retail Bag',
      weight: '250g',
      desc: 'Perfect for home brewing'
    },
    {
      id: 'value',
      label: 'Standard Pack',
      weight: '500g'
    },
    {
      id: 'bulk',
      label: 'Eco Bulk',
      weight: '1kg'
    }
  ],

  categories: computed(() => {
    const categoryOrder = ['Roasted Coffee', 'Green Coffee', 'Equipment', 'Other'];

    const groups = props.initialProducts.reduce((acc, product) => {
      const key = product.category || 'Other';
      if (!acc[key]) acc[key] = [];
      acc[key].push(product);
      return acc;
    }, {});

    return Object.keys(groups)
        .sort((a, b) => {
          let indexA = categoryOrder.indexOf(a);
          let indexB = categoryOrder.indexOf(b);

          if (indexA === -1) indexA = 999;
          if (indexB === -1) indexB = 999;

          return indexA - indexB;
        })
        .map(name => ({
          name,
          products: groups[name]
        }));
  }),

  total: computed(() =>
      context.cart.value.reduce((s, i) => s + (i.price * i.quantity), 0).toFixed(2)
  ),

  save: () => {
    localStorage.setItem("cart", JSON.stringify(context.cart.value));
    window.dispatchEvent(new Event('cart-updated'));
  },

  confirmSelection: () => {
    if (!context.pendingProduct.value) return;

    const selectedPackageObject = context.packaging.find(p => p.id === context.packag.value);

    const newItem = {
      ...context.pendingProduct.value,
      quantity: 1,
      roast: context.roastLevel.value,
      packag: selectedPackageObject ? selectedPackageObject.weight : context.packag.value
    };

    const item = context.cart.value.find(i =>
        i.name === newItem.name &&
        i.roast === newItem.roast &&
        i.packag === newItem.packag
    );

    if (item) {
      item.quantity++;
    } else {
      context.cart.value.push(newItem);
    }

    context.save();

    notify(`${newItem.name} added`);

    context.pendingProduct.value = null;
  },

  updateQuantity: (idx, delta) => {
    context.cart.value[idx].quantity = Math.max(
        1,
        context.cart.value[idx].quantity + delta
    );
    context.save();
  },

  removeFromCart: (idx) => {
    context.cart.value.splice(idx, 1);
    context.save();
  },

  handlePayment: async () => {
    context.isProcessing.value = true;

    await new Promise(r => setTimeout(r, 2000));

    alert("Success!");

    context.cart.value = [];
    context.save();

    context.isProcessing.value = false;
  }
};

const notify = (msg) => {
  notification.value = {show: true, message: msg};
  setTimeout(() => (notification.value.show = false), 3000);
};

const nextLabel = computed(() => {
  return currentStep.value?.navigation?.nextLabel || "Continue";
});

const handleNext = () => {
  const nav = currentStep.value?.navigation;

  if (nav?.next) {
    nav.next({
      ...context,
      goToStep,
      nextStep,
      prevStep
    });
  } else if (nav?.nextTo) {
    goToStep(nav.nextTo);
  } else {
    nextStep();
  }
};

const backLabel = computed(() => {
  return currentStep.value?.navigation?.backLabel || "Back";
});

const handleBack = () => {
  const nav = currentStep.value?.navigation;

  if (nav?.back) {
    nav.back({
      ...context,
      goToStep,
      nextStep,
      prevStep
    });
  } else if (nav?.backTo) {
    goToStep(nav.backTo);
  } else {
    prevStep();
  }
};

const currentSelectionSummary = computed(() => {
  const product = context.pendingProduct.value;
  if (!product) return null;

  const pkg = context.packaging.find(p => p.id === context.packag.value);
  const weight = pkg ? pkg.weight : context.packag.value;

  return {
    name: product.name,
    price: product.price,
    roast: context.roastLevel.value,
    weight: weight
  };
});

const cancelSelection = () => {
  context.pendingProduct.value = null;
  goToStep("catalog");
};

const checkUrlAndOpen = async () => {
  const params = new URLSearchParams(window.location.search);

  if (params.get('step') === 'cart') {

    if (context.cart.value.length === 0) {
      context.cart.value = JSON.parse(localStorage.getItem("cart")) || [];
    }

    const lastItem = context.cart.value[context.cart.value.length - 1];
    const categoryToOpen = lastItem?.category || 'Roasted Coffee';

    await setCategory(categoryToOpen);
    goToStep('cart');
  }
};

onMounted(async () => {
  context.cart.value = JSON.parse(localStorage.getItem("cart")) || [];

  checkUrlAndOpen();

  window.addEventListener('popstate', checkUrlAndOpen);
  window.addEventListener('open-cart-step', checkUrlAndOpen);

});

// 🚀 FLOW
const {
  currentComponent,
  stepIndex,
  steps,
  nextStep,
  prevStep,
  goToStep,
  setCategory,
  getStepProps,
  getStepEvents,
  selectedCategory,
  currentFlow,
  currentStep
} = useFlow({
  flowConfig: FLOW_CONFIG,
  componentMap,
  context
});

context.selectedCategory = selectedCategory;

</script>

<template>
  <section
      class="max-w-4xl mx-auto mt-10 p-6 bg-black/65 rounded-2xl shadow-2xl text-[#fff4dc] flex flex-col min-h-[60vh]">

    <header class="mb-8 border-b border-orange-900/30 pb-4 flex justify-between items-center">
      <h2 class="text-3xl font-bold font-serif">
        {{ !selectedCategory ? 'Choose Category' : selectedCategory }}
      </h2>
      <button v-if="selectedCategory" @click="selectedCategory = null"
              class="text-xs text-stone-500 hover:text-orange-400 uppercase tracking-widest">
        Change Category
      </button>
    </header>

    <div v-if="!selectedCategory" class="animate-in fade-in zoom-in-95 duration-500">
      <CategorySelector
          :categories="context.categories.value"
          @select="setCategory"
      />
    </div>

    <div v-else class="flex flex-col flex-1">
      <StepProgress
          v-if="steps.length > 1"
          :steps="steps"
          :currentStep="stepIndex"
          class="mb-8"
      />

      <div v-if="currentSelectionSummary"
           class="mb-6 flex items-center gap-3 px-2 py-1 border-l-2 border-orange-700/50 animate-in fade-in duration-500">

        <span class="font-serif font-bold text-[#fff4dc] text-sm md:text-base tracking-wide">
          {{ currentSelectionSummary.name }}
        </span>

        <span class="text-stone-700">/</span>

        <div class="flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-widest font-medium">
          <span class="text-stone-400">
            {{ currentSelectionSummary.weight }}
          </span>

          <span class="text-orange-600/50">•</span>

          <span class="text-orange-500">
            {{ currentSelectionSummary.roast }} Roast
          </span>
        </div>

        <span class="ml-auto text-[10px] text-stone-500 font-mono">
          ${{ currentSelectionSummary.price }}
        </span>

        <button
            @click="cancelSelection"
            class="p-1 hover:bg-white/10 rounded-full transition-colors group"
            title="Reset selection"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-stone-500 group-hover:text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

      </div>

      <div class="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <component
            :is="currentComponent"
            v-bind="getStepProps()"
            v-on="getStepEvents()"
        />
      </div>

      <div class="flex gap-4 mt-8 shrink-0">
        <button class="flex-1 py-3 border border-stone-700 rounded-xl hover:bg-white/5 transition-colors"
                v-if="stepIndex > 0"
                @click="handleBack"

        >
          {{ backLabel }}
        </button>

        <button class="flex-1 py-3 bg-orange-700 hover:bg-orange-600 rounded-xl font-bold uppercase transition-all"
                v-if="stepIndex < currentFlow.length - 1 && !currentStep?.navigation?.hideNext "
                @click="handleNext"
        >
          {{ nextLabel }}
        </button>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="notification.show"
           class="fixed top-10 right-10 z-50 p-4 bg-orange-700 text-white rounded-lg shadow-xl">
        {{ notification.message }}
      </div>
    </Transition>
  </section>
</template>