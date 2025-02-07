<template>
  <div class="mt-4 flex justify-end space-x-3">
    <button
      type="submit"
      class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition duration-200 ease-in-out"
    >
      Submit
    </button>
    <button
      type="button"
      @click="closeModal"
      class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 transition duration-200 ease-in-out"
    >
      Cancel
    </button>
  </div>
</template>

<script lang="ts">
export default {
  name: "ModalButton",
  emits: ["close-modal"],
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
  },
};
</script>
