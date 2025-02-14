<template>
    <div class="flex items-center gap-3">
        <span class="text-gray-500 dark:text-gray-400"> Show </span>
        <div class="relative z-20 bg-white rounded-lg">
            <select
                class="w-full py-2 pl-3 pr-8 text-sm text-gray-800 bg-transparent border border-gray-300 rounded-lg appearance-none dark:bg-dark-900 h-9 bg-none shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                v-model="selectedPerPage" @change="changeLimit">
                <option value="5" class="text-gray-500 dark:bg-gray-900 dark:text-gray-400">5</option>
                <option value="10" class="text-gray-500 dark:bg-gray-900 dark:text-gray-400">10</option>
                <option value="20" class="text-gray-500 dark:bg-gray-900 dark:text-gray-400">20</option>
                <option value="50" class="text-gray-500 dark:bg-gray-900 dark:text-gray-400">50</option>
                <option value="100" class="text-gray-500 dark:bg-gray-900 dark:text-gray-400">100</option>
            </select>
            <span class="absolute z-30 text-gray-500 -translate-y-1/2 right-2 top-1/2 dark:text-gray-400">
                <svg class="stroke-current" width="16" height="16" viewBox="0 0 16 16" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.8335 5.9165L8.00016 10.0832L12.1668 5.9165" stroke="" stroke-width="1.2"
                        stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </span>
        </div>
        <span class="text-gray-500 dark:text-gray-400"> entries </span>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

// Props
const props = defineProps({
    perPage: Number,
})

// Emits
const emit = defineEmits(['change-limit'])

// Local State
const selectedPerPage = ref<number | undefined>(props.perPage ?? 10);

// Watch for prop changes and update local state
watch(() => props.perPage, (newValue) => {
    selectedPerPage.value = newValue;
});

// Methods
const changeLimit = () => {
    emit('change-limit', Number(selectedPerPage.value));
};
</script>