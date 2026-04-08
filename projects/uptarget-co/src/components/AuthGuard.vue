<template>
  <div v-if="isChecking" class="flex justify-center items-center min-h-screen bg-white">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange"></div>
  </div>

  <div v-else-if="!isValid" class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="max-w-md w-full bg-white p-10 rounded-2xl border-t-4 border-orange shadow-xl">

      <div class="mb-8 text-center">
        <h2 class="font-unbounded text-2xl font-bold mb-2 uppercase">Private Area</h2>
        <p class="text-gray-500 text-sm">Please enter your credentials to unlock the content.</p>
      </div>

      <ContactForm
          :apiUrl="apiUrl"
          formName="page_auth_form"
          :initialData="{ page: currentPage }"
          @success="handleSuccess"
      />

      <div class="mt-8 pt-6 border-t border-gray-100 flex justify-center">
        <a href="/" class="text-orange font-medium flex items-center gap-2 group transition-colors hover:text-[#e63d00]">
          <span class="transition-transform group-hover:-translate-x-1 text-xl">←</span>
          Back to Home page
        </a>
      </div>

    </div>
  </div>

  <slot v-else></slot>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ContactForm from './ContactForm.vue';

const props = defineProps({
  apiUrl: { type: String, default: '/api/v1/synapse' }
});

const isValid = ref(false);
const isChecking = ref(true);

const currentPage = window.location.pathname.replace(/^\/|\/$/g, '') || 'home';
const storageKey = `uptarget_auth_${currentPage}`;

function isTokenValid(token) {
  if (!token) return false;
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(window.atob(base64));

    const now = Math.floor(Date.now() / 1000);

    const isExpired = payload.exp <= now;
    const isRightPage = payload.page === currentPage;

    return !isExpired && isRightPage;
  } catch (e) {
    return false;
  }
}

onMounted(() => {
  const savedToken = localStorage.getItem(storageKey);

  if (isTokenValid(savedToken)) {
    isValid.value = true;
  } else {
    localStorage.removeItem(storageKey);
  }
  isChecking.value = false;

});

function handleSuccess(actions_executed) {

  const authAction = actions_executed?.find(a => a.action === 'auth_check');
  const token = authAction?.result?.token;

  if (token) {
    localStorage.setItem(storageKey, token);
  }

  setTimeout(() => {
    isValid.value = true;
  }, 600);
}
</script>