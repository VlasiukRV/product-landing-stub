<template>
  <div class="synapse-form-container w-full max-w-2xl mx-auto min-h-[600px]">
    <div v-if="loading" class="flex flex-col items-center justify-center py-12 space-y-4">
      <div class="w-10 h-10 border-4 border-brand-purple/20 border-t-brand-purple rounded-full animate-spin"></div>
      <p class="text-brand-purple/60 text-sm font-medium tracking-widest uppercase">Initializing Form...</p>
    </div>

    <form v-else @submit.prevent="handleSubmit" class="space-y-6 bg-[rgb(244,244,244)] p-8 md:p-10 rounded-2xl border border-transparent hover:border-purple-100 transition-all duration-500 shadow-sm hover:shadow-xl">

      <h2 class="text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] text-gray-900 mb-10">
        Want to collaborate, or learn more?<br/>
        <span class="text-brand-purple">Let’s Connect</span>
      </h2>


      <div class="grid grid-cols-1 gap-5">
        <template v-for="(field, fieldName) in fields" :key="fieldName">

          <div
              v-if="fieldName !== 'confirm_email'"
              class="field-group flex flex-col gap-2 group"
          >
            <label :for="fieldName" class="text-xs font-bold uppercase tracking-wider text-gray-500 group-focus-within:text-brand-purple transition-colors">
              {{ field.label }} <span v-if="field.required" class="text-brand-purple">*</span>
            </label>

            <template v-if="field.type === 'text' || fieldName === 'message'">
              <textarea
                  :id="fieldName"
                  v-model="formData[fieldName]"
                  :placeholder="field.placeholder"
                  class="w-full bg-white border border-gray-200 rounded-xl p-4 text-gray-900 outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition-all placeholder:text-gray-400"
                  rows="4"
                  :required="field.required"
              ></textarea>
            </template>

            <template v-else>
              <input
                  :id="fieldName"
                  v-model="formData[fieldName]"
                  :type="field.type === 'str' ? 'text' : field.type"
                  :placeholder="field.placeholder"
                  class="w-full bg-white border border-gray-200 rounded-xl p-4 text-gray-900 outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition-all placeholder:text-gray-400"
                  :required="field.required"
              />
            </template>
          </div>
        </template>
      </div>

      <input v-model="formData.confirm_email" type="text" tabindex="-1" autocomplete="off" class="hidden" />

      <button
          v-if="Object.keys(fields).length > 0"
          type="submit"
          :disabled="submitting"
          class="w-full relative overflow-hidden group/btn py-4 px-6 rounded-xl font-bold tracking-wide transition-all duration-500 bg-brand-purple text-white hover:bg-brand-purple/90 hover:shadow-[0_20px_40px_-15px_rgba(107,33,168,0.4)] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3"
      >
        <span class="relative z-10 transform group-hover/btn:-translate-y-0.5 transition-transform">
            {{ submitting ? 'Processing ...' : 'Transmit Form' }}
        </span>
        <svg v-if="!submitting" class="w-5 h-5 relative z-10 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
        <div class="absolute -bottom-4 -right-4 w-16 h-16 bg-white/10 rounded-full blur-2xl group-hover/btn:bg-white/20 transition-colors"></div>
      </button>

      <Transition name="fade">
        <div
            v-if="statusMessage"
            :class="[
                'p-4 rounded-xl text-sm font-semibold flex items-center gap-3 transition-all',
                isSuccess ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
              ]"
        >
          <span v-if="isSuccess" class="text-xl">✓</span>
          <span v-else class="text-xl">!</span>
          {{ statusMessage }}
        </div>
      </Transition>

    </form>
  </div>
</template>

<style scoped>
  .fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease; }
  .fade-enter-from, .fade-leave-to { opacity: 0; }
</style>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  apiUrl: { type: String, default: '/api/v1/synapse' }
});

const fields = ref({});
const formTitle = ref('');
const formData = ref({});
const loading = ref(true);
const submitting = ref(false);
const statusMessage = ref('');
const isSuccess = ref(false);

const fetchSchema = async () => {
  try {
    const response = await fetch(`${props.apiUrl}/schema`, {

    });

    if (!response.ok) throw new Error('Schema load failed');

    const data = await response.json();
    fields.value = data.fields;
    formTitle.value = data.form_title;

    formData.value = Object.fromEntries(Object.keys(data.fields).map(key => [key, '']));
  } catch (err) {
    statusMessage.value = 'Failed to load form structure.';
    isSuccess.value = false;
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const handleSubmit = async () => {

  if (formData.value.confirm_email) {
    statusMessage.value = 'Spam detected!';
    isSuccess.value = false;
    return;
  }

  submitting.value = true;
  statusMessage.value = '';

  try {
    const response = await fetch(`${props.apiUrl}/signal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData.value)
    });

    const result = await response.json();

    if (response.ok) {
      statusMessage.value = 'Success! Your message has been sent.';
      isSuccess.value = true;

      // Очистка формы
      formData.value = Object.fromEntries(Object.keys(fields.value).map(key => [key, '']));
    } else {
      const errorDetail = Array.isArray(result.detail)
          ? result.detail.map(e => `${e.loc[1]}: ${e.msg}`).join(', ')
          : result.detail;
      throw new Error(errorDetail || 'Server error');
    }
  } catch (err) {
    statusMessage.value = `Error: ${err.message}`;
    isSuccess.value = false;
  } finally {
    submitting.value = false;
  }
};

onMounted(fetchSchema);
</script>