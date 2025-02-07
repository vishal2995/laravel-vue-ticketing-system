<template>
    <nav class="w-full bg-white shadow">
      <div class="sm:container xl:container mx-auto px-5 xl:px-0">
        <div class="flex justify-between h-16">
          <div class="flex">
            <a
              href="#"
              class="flex-shrink-0 flex items-center text-xl font-bold text-gray-800"
            >
              Tickets
            </a>
          </div>
          <div class="flex items-center space-x-4">
            <button
              class="block text-center text-sm font-medium bg-blue-600 hover:bg-gray-600 text-white rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 px-10 py-3"
                @click="logout"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAuthStore } from "@/stores/authStore";

export default defineComponent({
  name: 'Header',
  setup() {
    const authStore = useAuthStore();

    const logout = () => {
      authStore.logout();
    };

    return { logout };
  },
});
</script>