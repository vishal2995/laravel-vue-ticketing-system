<template>
  <div class="flex justify-end pb-5">
    <button
      class="block text-center text-sm font-medium bg-blue-600 hover:bg-gray-600 text-white rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 px-10 py-3"
      @click="openModal"
      type="button"
    >
      Add
    </button>
</div>
</template>
  
<script lang="ts">
  export default {
    name: "AddButton",
    methods: {
      openModal() {
        this.$emit("open-modal");
      }
    }
  };
</script>