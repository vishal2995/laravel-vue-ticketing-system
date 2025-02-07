<template>
  <div
    v-if="showDeleteModal"
    tabindex="-1"
    class="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50"
  >
    <div class="relative w-full max-w-md p-4">
      <div class="bg-white rounded-lg shadow-lg">
        <!-- Modal Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b rounded-t-xl">
          <h3 class="text-xl font-semibold text-black">Delete Confirmation</h3>
          <button
            type="button"
            @click="cancelDelete"
            class="flex items-center justify-center w-8 h-8 text-gray-400 hover:text-gray-700 rounded-full transition"
          >
            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="px-6 py-5">
          <p class="text-sm font-medium text-gray-700 ">
            Are you sure you want to delete this? This action cannot be undone.
          </p>
          <div class="mt-10 flex justify-end space-x-3">
            <button
              @click="confirmDelete"
              class="block text-center text-sm font-medium text-white bg-red-600 rounded-lg shadow-md hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 px-10 py-3 transition"
            >
              Delete
            </button>
            <button
              @click="cancelDelete"
              class="block text-center text-sm font-medium text-gray-600 hover:text-white bg-gray-200 hover:bg-gray-600 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 px-10 py-3 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "DeleteModal",
  props: {
    showDeleteModal: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["deleteConfirmed", "closeModal"],
  methods: {
    confirmDelete() {
      this.$emit("deleteConfirmed");
    },
    cancelDelete() {
      this.$emit("closeModal");
    },
  },
};
</script>
