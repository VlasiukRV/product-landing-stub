<template>
  <div class="booking-container bg-slate-900 p-6 rounded-xl text-white shadow-2xl max-w-md mx-auto">
    <h2 class="text-2xl font-bold mb-4 text-orange-500">Book Your Body Repair</h2>

    <!-- Имя -->
    <div class="mb-4">
      <label class="block mb-2 font-semibold text-sm">Full Name:</label>
      <input
          v-model="fullName"
          type="text"
          placeholder="John Doe"
          class="w-full p-2 bg-slate-800 rounded border border-slate-700 outline-none focus:border-orange-500 transition"
      />
    </div>

    <!-- Телефон -->
    <div class="mb-4">
      <label class="block mb-2 font-semibold text-sm">Phone:</label>
      <input
          v-model="phone"
          type="tel"
          placeholder="(123) 456-7890"
          class="w-full p-2 bg-slate-800 rounded border border-slate-700 outline-none focus:border-orange-500 transition"
      />
    </div>

    <!-- Email -->
    <div class="mb-4">
      <label class="block mb-2 font-semibold text-sm">Email:</label>
      <input
          v-model="email"
          type="email"
          placeholder="you@example.com"
          class="w-full p-2 bg-slate-800 rounded border border-slate-700 outline-none focus:border-orange-500 transition"
      />
    </div>

    <!-- Тип сервиса -->
    <div class="mb-4">
      <label class="block mb-2 font-semibold text-sm">Service Type:</label>
      <select v-model="selectedService" class="w-full p-2 bg-slate-800 rounded border border-slate-700 outline-none focus:border-orange-500 transition">
        <option value="dent">Dent Repair</option>
        <option value="paint">Full Body Painting</option>
        <option value="scratch">Scratch Removal</option>
        <option value="insurance">Insurance Claim Inspection</option>
      </select>
    </div>

    <!-- Фото -->
    <div class="mb-4">
      <label class="block mb-2 font-semibold text-sm">Upload Damage Photos:</label>
      <div class="relative border-2 border-dashed border-slate-700 rounded-lg p-4 text-center hover:border-orange-500 transition">
        <input
            type="file"
            multiple
            accept="image/*" @change="handleFileUpload"
            class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-labelledby="upload-label"
        />
        <div v-if="previews.length === 0" class="text-slate-400">
          <span class="text-orange-500">Click to upload</span> or drag and drop
        </div>
        <div v-else class="grid grid-cols-4 gap-2">
          <div v-for="(src, index) in previews" :key="index" class="relative">
            <img :src="src" class="h-16 w-16 object-cover rounded-md border border-slate-600" />
            <button
                @click.stop="removeImage(index)"
                class="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 text-[10px] flex items-center justify-center"
                aria-label="Remove this image"
                title="Remove image"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Слот времени -->
    <div class="mb-6">
      <label class="block mb-2 font-semibold text-sm">Select Arrival Time:</label>
      <div
          class="grid grid-cols-3 gap-2"
          role="radiogroup"
          aria-labelledby="time-label"
        >
        <button
            v-for="time in availableSlots"
            :key="time"
            @click="selectTime(time)"
            type="button"
            :aria-pressed="slot === time"
            :aria-label="'Select arrival time ' + time"
            :class="['p-2 text-[12px] font-bold rounded transition border',
                  slot === time ? 'bg-orange-600 border-orange-400 shadow-[0_0_10px_rgba(234,88,12,0.4)]' : 'bg-slate-800 border-slate-700 hover:border-slate-500']"
        >
          {{ time }}
        </button>
      </div>
    </div>

    <!-- Confirm Button -->
    <button
        @click="confirmBooking"
        :disabled="!slot || isUploading || !fullName || !phone || !email"
        :aria-label="isUploading ? 'Processing your booking' : 'Confirm your booking'"
        class="w-full bg-orange-600 hover:bg-orange-700 disabled:opacity-50 py-3 rounded-lg font-bold uppercase tracking-wider transition-all active:scale-95 mb-2"
    >
      <span aria-hidden="true">
        {{ isUploading ? 'Processing...' : 'Confirm Booking' }}
      </span>
    </button>

    <!-- Calendly Integration -->
    <div class="mt-4 text-center">
      <p class="mb-2 text-sm text-slate-400">Or schedule directly with Calendly:</p>
      <a
          href="https://calendly.com/YOUR_USERNAME/auto-repair"
          target="_blank"
          class="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition"
      >
        Schedule on Calendly
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from '@nanostores/vue';
import { $selectedSlot } from '../stores/bookingStore';

const slot = useStore($selectedSlot);

const fullName = ref('');
const phone = ref('');
const email = ref('');
const selectedService = ref('dent');
const availableSlots = ['09:00 AM', '11:00 AM', '01:30 PM', '03:30 PM', '05:00 PM'];
const selectedFiles = ref([]);
const previews = ref([]);
const isUploading = ref(false);

const selectTime = (time) => {
  $selectedSlot.set(time);
};

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

const confirmBooking = async () => {
  if (!fullName.value || !phone.value || !email.value || !slot.value) {
    alert("Please fill all required fields!");
    return;
  }

  isUploading.value = true;

  const formData = new FormData();
  formData.append('name', fullName.value);
  formData.append('phone', phone.value);
  formData.append('email', email.value);
  formData.append('service', selectedService.value);
  formData.append('slot', slot.value);
  selectedFiles.value.forEach((file, i) => formData.append(`photo_${i}`, file));

  console.log('Final Data:', {
    name: fullName.value,
    phone: phone.value,
    email: email.value,
    service: selectedService.value,
    slot: slot.value,
    filesCount: selectedFiles.value.length
  });

  setTimeout(() => {
    alert(`Success! Booked for ${slot.value}.`);
    isUploading.value = false;
    $selectedSlot.set(null);
    fullName.value = '';
    phone.value = '';
    email.value = '';
    selectedFiles.value = [];
    previews.value = [];
  }, 1500);
};
</script>