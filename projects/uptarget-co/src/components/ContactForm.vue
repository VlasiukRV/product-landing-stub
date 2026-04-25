<template>
  <div v-if="loading" class="text-center py-10 font-golos text-orange animate-pulse">
    Loading form...
  </div>

  <form v-else @submit.prevent="handleSubmit" class="flex flex-col gap-4">
    <template v-for="(field, fieldName) in fields" :key="fieldName">

      <input
          v-if="field.hidden"
          type="hidden"
          :name="fieldName"
          :value="formData[fieldName]"
      />

      <div v-else class="w-full">
        <textarea
            v-if="field.type === 'text' || fieldName === 'message'"
            v-model="formData[fieldName]"
            :placeholder="field.placeholder"
            class="w-full min-h-[120px] p-4 bg-white border border-[#e4e4e4] rounded-none font-sans text-sm outline-none focus:border-orange transition-colors resize-none"
            :required="field.required"
        ></textarea>

        <input
            v-else
            v-model="formData[fieldName]"
            :type="field.type === 'str' ? 'text' : field.type"
            :placeholder="field.placeholder"
            class="w-full h-[50px] px-4 bg-white border border-[#e4e4e4] rounded-none font-sans text-sm outline-none focus:border-orange transition-colors"
            :required="field.required"
        />
      </div>
    </template>

    <button
        v-if="Object.keys(fields).length > 0"
        type="submit"
        :disabled="submitting"
        class="button-form-custom group"
    >
      <span class="relative z-10">
        {{ submitting ? 'Working on it..' : submitButtonText }}
      </span>
    </button>

    <div v-if="statusMessage"
         :class="['mt-4 p-4 flex items-center gap-3 font-sans text-sm transition-all',
                  isSuccess ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700']">
      <img v-if="isSuccess" src="https://cdn.prod.website-files.com/65a13d5213646f4a614e2266/65b6d56156a7619c20188ce8_Check.svg" class="w-5 h-5">
      {{ statusMessage }}
    </div>

    <p v-if="privacyText" class="mt-6 text-xs text-gray-400 text-center leading-relaxed" v-html="privacyText">
    </p>

  </form>
</template>

<style scoped>
@reference "../styles/global.css";

.button-form-custom {
  @apply w-full h-[62px] flex items-center justify-center;
  @apply bg-orange text-white font-golos font-semibold text-[22px] leading-[34px] uppercase tracking-[1px];
  @apply rounded-[40px] border-none transition-all duration-300;
  @apply hover:bg-[#e63d00] disabled:opacity-50;
}
input, textarea { transition: border-color 0.2s ease; }
</style>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  apiUrl: { type: String, default: '/api/v1/synapse' },
  formName: { type: String, required: true },
  initialData: { type: Object, default: () => ({}) },
  submitButtonText: { type: String, default: 'Send' },
  privacyText: {
    type: String,
    default: 'By clicking "Send", you agree to our privacy policy and terms of service.'
  }
});

const emit = defineEmits(['success']); // Событие для модалки, если нужно закрыть её после успеха

const fields = ref({});
const formData = ref({});
const loading = ref(true);
const submitting = ref(false);
const statusMessage = ref('');
const isSuccess = ref(false);

const fetchSchema = async () => {
  try {
    const response = await fetch(`${props.apiUrl}/schema?form_name=${props.formName}`);
    const data = await response.json();
    fields.value = data.fields;
    formData.value = Object.fromEntries(
        Object.keys(data.fields).map(k => [k, props.initialData[k] || ''])
    );
  } catch (err) {
    statusMessage.value = 'Error loading form.';
  } finally {
    loading.value = false;
  }
};

const handleSubmit = async () => {
  if (formData.value.confirm_email) return;
  submitting.value = true;
  statusMessage.value = '';

  try {
    const response = await fetch(`${props.apiUrl}/signal?form_name=${props.formName}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData.value)
    });

    const result = await response.json();

    if (response.ok) {
      isSuccess.value = true;
      statusMessage.value = 'Thank you! Your submission has been received!';
      formData.value = Object.fromEntries(Object.keys(fields.value).map(k => [k, '']));
      emit('success', result.actions_executed);
    } else {
      const errorMessage = result.detail || 'Oops! Something went wrong while submitting.';
      throw new Error(errorMessage);
    }
  } catch (err) {
    isSuccess.value = false;
    statusMessage.value = err.message;
  } finally {
    submitting.value = false;
  }
};

onMounted(fetchSchema);
</script>