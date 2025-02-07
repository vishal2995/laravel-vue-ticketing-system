<template>
  <div
    v-if="show"
    tabindex="-1"
    class="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50"
  >
    <div class="relative p-6 w-full max-w-lg">
      <div class="bg-white rounded-lg shadow-2xl">
        <!-- Modal Header -->
        <div class="flex items-center justify-between border-b border-gray-600 px-6 py-4 rounded-t-xl">
          <h3 class="text-xl font-semibold text-black">
            View Data
          </h3>
          <button
            type="button"
            @click="$emit('close')"
            class="flex items-center justify-center w-8 h-8 text-gray-400 hover:text-gray-700 rounded-full transition"
          >
            <svg
              class="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal Content -->
        <div class="w-full">
          <table class="min-w-full text-sm text-left text-gray-700 divide-y divide-gray-600">
            <tbody>
              <tr class="border-b border-solid border-black/[0.15] hover:bg-gray-700/10 transition">
                <th class="font-medium text-gray-600 px-6 py-3">
                  Title
                </th>
                <td class="px-6 py-3">
                  {{ ticket?.title || "" }}
                </td>
              </tr>
              <tr class="border-b border-solid border-black/[0.15] hover:bg-gray-700/10 transition">
                <th class="font-medium text-gray-600 px-6 py-3">
                  Description
                </th>
                <td class="px-6 py-3">
                  {{ ticket?.description || "" }}
                </td>
              </tr>
              <tr class="hover:bg-gray-700/10 transition">
                <th class="font-medium text-gray-600 px-6 py-3">
                  Status
                </th>
                <td class="px-6 py-3">
                  {{ getStatusLabel(ticket?.status || "") }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
interface FormData {
  title: string;
  description: string;
  status: string;
}
export default {
  name: "ViewModal",
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    ticket: {
      type: Object as () => FormData | null,
      required: true,
    },
  },
  methods: {
    getStatusLabel(status: string): string {
      const statusMap: { [key: string]: string } = {
        open: 'Open',
        closed: 'Closed',
        in_progress: 'In Progress',
      };
      return statusMap[status] || 'Unknown';
    }
  }
};
</script>
