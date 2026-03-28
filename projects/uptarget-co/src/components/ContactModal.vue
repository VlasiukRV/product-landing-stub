<template>
  <div class="fixed inset-0 z-[1000] flex items-center justify-center bg-yellow-50 backdrop-blur-sm overflow-auto p-4">
    <div class="relative w-full max-w-[500px] bg-white p-8 md:p-[58px_90px] shadow-2xl animate-in fade-in zoom-in duration-300">

      <button @click="closeModal" class="absolute top-0 right-0 w-[72px] h-[72px] flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity">
        <img src="https://cdn.prod.website-files.com/65a13d5213646f4a614e2266/65d3a5296011d3835f9f3c74_Close.svg" class="w-6 h-6" alt="Close">
      </button>

      <div class="font-unbounded text-[28px] leading-[38px] text-black mb-3">
        Contact Us
      </div>

      <p class="font-sans text-base leading-[22px] text-black mb-8">
        How can we help you? Send us a note from here or write an email
        <a href="mailto:hello@uptarget.co?subject=Contact%20Us%20form" class="text-orange no-underline hover:underline">hello@uptarget.co</a>
      </p>

      <ContactForm
          :apiUrl="apiUrl"
          :formName="formName"
          @success="onFormSuccess"
      />

    </div>
  </div>
</template>

<script setup>
import ContactForm from './ContactForm.vue';

const props = defineProps({
  apiUrl: { type: String, default: '/api/v1/synapse' },
  formName: { type: String, default: 'contact_form' },
  initialData: { type: Object, default: () => ({}) }
});

const closeModal = () => {
  window.dispatchEvent(new CustomEvent('close-contact'));
};

const onFormSuccess = () => {
  setTimeout(closeModal, 2000);
};
</script>