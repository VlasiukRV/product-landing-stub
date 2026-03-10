<template>
  <div class="video-call-form bg-surface/50 backdrop-blur-md p-8 rounded-2xl text-white border border-white/10 shadow-2xl">
    <div class="mb-8">
      <span class="text-primary uppercase tracking-widest text-xs font-bold">Direct Consultation</span>
      <h2 class="text-3xl font-heading mt-2 text-white">Schedule a Video Call</h2>
    </div>

    <!-- Contact Info -->
    <div class="mb-5">
      <label class="block mb-2 font-semibold text-sm text-gray-400">Full Name</label>
      <input v-model="fullName" type="text" placeholder="John Doe"
             class="w-full p-3 bg-black/40 rounded-xl border border-white/10 outline-none focus:border-primary/50 focus:bg-black/60 transition-all duration-300 placeholder:text-gray-600"/>
    </div>

    <div class="grid md:grid-cols-2 gap-4 mb-5">
      <div>
        <label class="block mb-2 font-semibold text-sm text-gray-400">Phone</label>
        <input v-model="phone" type="tel" placeholder="(123) 456-7890"
               class="w-full p-3 bg-black/40 rounded-xl border border-white/10 outline-none focus:border-primary/50 focus:bg-black/60 transition-all duration-300 placeholder:text-gray-600"/>
      </div>
      <div>
        <label class="block mb-2 font-semibold text-sm text-gray-400">Email</label>
        <input v-model="email" type="email" placeholder="you@example.com"
               class="w-full p-3 bg-black/40 rounded-xl border border-white/10 outline-none focus:border-primary/50 focus:bg-black/60 transition-all duration-300 placeholder:text-gray-600"/>
      </div>
    </div>

    <!-- Available Time Slots -->
    <div class="mb-5">
      <label class="block mb-2 font-semibold text-sm text-gray-400">Available Time Slots</label>
      <div v-for="(slot, index) in preferredSlots" :key="index" class="flex mb-3 gap-2">
        <input
            v-model="preferredSlots[index]"
            type="text"
            placeholder="e.g. 03/05 10:00-11:00"
            class="flex-1 p-3 bg-black/40 rounded-xl border border-white/10 outline-none focus:border-primary/50 focus:bg-black/60 transition-all duration-300 placeholder:text-gray-700 font-mono text-sm"
        />
        <button
            @click="removeSlot(index)"
            type="button"
            aria-label="Remove time slot"
            class="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white w-12 rounded-xl border border-red-500/20 transition-all flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <button @click="addSlot" type="button"
              class="group mt-2 flex items-center gap-2 text-primary font-bold text-sm hover:text-white transition-colors">
        <span class="bg-primary/10 group-hover:bg-primary group-hover:text-black p-1 rounded transition-all">+</span>
        Add Another Slot
      </button>
    </div>

    <!-- Preferred Platform -->
    <div class="mb-8">
      <label class="block mb-2 font-semibold text-sm text-gray-400">Preferred Platform</label>
      <div class="relative">
        <select v-model="platform" class="w-full p-3 bg-black/40 rounded-xl border border-white/10 outline-none focus:border-primary/50 focus:bg-black/60 transition-all appearance-none cursor-pointer">
          <option value="zoom">Zoom Video</option>
          <option value="telegram">Telegram Call</option>
          <option value="whatsapp">WhatsApp Video</option>
        </select>
        <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Upload Photos -->
    <div class="mb-8">
      <label class="block mb-2 font-semibold text-sm text-gray-400">Upload Photos (optional)</label>
      <div class="relative border-2 border-dashed border-slate-700 rounded-xl p-4 text-center hover:border-primary transition">
        <input type="file" multiple accept="image/*" @change="handleFileUpload" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/>
        <div v-if="previews.length === 0" class="text-gray-500">
          <span class="text-primary">Click or drag to upload</span>
        </div>
        <div v-else class="grid grid-cols-4 gap-2">
          <div v-for="(src, index) in previews" :key="index" class="relative">
            <img :src="src" class="h-16 w-16 object-cover rounded-md border border-slate-600"/>
            <button @click.stop="removeImage(index)" class="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 text-[10px] flex items-center justify-center">×</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Submit -->
    <button @click="submitRequest"
            :disabled="isSubmitting || !fullName || !phone || !email || preferredSlots.length === 0 || !preferredSlots[0]"
            class="group w-full bg-primary hover:bg-white text-black py-4 rounded-xl font-bold uppercase tracking-widest transition-all duration-300 active:scale-95 disabled:opacity-30 disabled:grayscale">
      <span class="flex items-center justify-center gap-2">
        {{ isSubmitting ? 'Sending Request...' : 'Request Video Consultation' }}
        <svg v-if="!isSubmitting" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </span>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const fullName = ref('');
const phone = ref('');
const email = ref('');
const preferredSlots = ref(['']);
const platform = ref('zoom');
const isSubmitting = ref(false);

const selectedFiles = ref([]);
const previews = ref([]);

const addSlot = () => preferredSlots.value.push('');
const removeSlot = (index) => preferredSlots.value.splice(index, 1);

const handleFileUpload = (event) => {
  const files = Array.from(event.target.files);
  files.forEach(file => {
    selectedFiles.value.push(file);
    const reader = new FileReader();
    reader.onload = (e) => previews.value.push(e.target.result);
    reader.readAsDataURL(file);
  });
};

const removeImage = (index) => {
  selectedFiles.value.splice(index, 1);
  previews.value.splice(index, 1);
};

const submitRequest = async () => {
  if (!fullName.value || !phone.value || !email.value || preferredSlots.value.length === 0) return;
  isSubmitting.value = true;

  // Создаем FormData для отправки на сервер
  const formData = new FormData();
  formData.append('fullName', fullName.value);
  formData.append('phone', phone.value);
  formData.append('email', email.value);
  formData.append('platform', platform.value);
  preferredSlots.value.forEach((slot, i) => formData.append(`slot_${i}`, slot));
  selectedFiles.value.forEach((file, i) => formData.append(`photo_${i}`, file));

  // Имитация отправки
  setTimeout(() => {
    alert('Thank you! We will confirm your video call shortly.');
    isSubmitting.value = false;
    fullName.value = '';
    phone.value = '';
    email.value = '';
    preferredSlots.value = [''];
    platform.value = 'zoom';
    selectedFiles.value = [];
    previews.value = [];
  }, 1500);
};
</script>