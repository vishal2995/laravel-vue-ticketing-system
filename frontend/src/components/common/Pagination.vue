<template>
    <div class="flex flex-col xl:flex-row xl:items-center xl:justify-between">
        <div class="pb-3 xl:pb-0">
        <p class="pb-3 text-center text-gray-500 border-b border-gray-100 dark:border-gray-800 dark:text-gray-400 xl:border-b-0 xl:pb-0 xl:text-left">Showing {{ startEntry }} to {{ endEntry }} of {{ totalEntries }} entries</p>
        </div>
        <div class="flex items-center justify-center">
            <div class="pagination-row flex">
                <div class="page-number">
                    <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mx-1" @click="prevPage">Prev</button>
        
                    <span v-for="(item, index) in new Array(totalPages)" :key="index">
                        <button class="hover:bg-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mx-1" 
                        :class="{
                            'bg-transparent text-blue-700': index + 1 !== currentPage,
                            'bg-blue-500 text-white': index + 1 === currentPage
                        }"
                        @click="fetchData(index + 1)">{{ index + 1 }}</button>
                    </span>
        
                    <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mx-1" @click="nextPage">Next</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { toRefs, computed } from 'vue';

// Props
const props = defineProps({
  totalPages: {
    type: Number,
    default: 0,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  perPage: {
    type: Number,
    default: 10,
  },
  totalEntries: {
    type: Number,
    default: 0,
  }
});

// Emits
const emit = defineEmits(['page-change'])

// Reactives
const { totalPages, currentPage, perPage, totalEntries } = toRefs(props);

// Computed
const startEntry = computed(() => ((currentPage.value - 1) * perPage.value) + 1);
const endEntry = computed(() => Math.min(currentPage.value * perPage.value, totalEntries.value));

// Methods
const fetchData = async(pageNumber:number) => {
    emit('page-change', pageNumber);
}

const prevPage = async() => {
    if (currentPage.value > 1) {
        emit('page-change', currentPage.value - 1);
    }
}

const nextPage = async() => {
    if (currentPage.value < totalPages.value) {
        emit('page-change', currentPage.value + 1);
    }
}
</script>