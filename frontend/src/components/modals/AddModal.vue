<template>
    <div
        v-if="show"
        tabindex="-1"
        class="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50"
    >
        <div class="relative w-full max-w-lg p-4">
            <div class="bg-white rounded-lg shadow-lg p-6">
                <!-- Modal Header -->
                <div class="flex items-center justify-between border-b pb-3">
                    <h3 class="text-xl font-semibold text-black">
                        {{ id === null ? "Add" : "Edit" }}
                    </h3>
                    <button
                        @click="closeModal"
                        class="flex items-center justify-center w-8 h-8 text-gray-400 hover:text-gray-700 rounded-full transition"
                    >
                    <svg
                        class="w-4 h-4"
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
                    </button>
                </div>

                <!-- Form -->
                 <div class="pt-5">
                     <form @submit.prevent="onSubmit()" class="w-full">
                         <div class="mb-5">
                             <label for="title" class="block text-base font-medium text-gray-600 mb-1.5">
                                 Title
                             </label>
                             <input
                                 type="text"
                                 id="title"
                                 v-model="formData.title"
                                 class="w-full text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 p-2.5"
                             />
                            <span v-if="v$.title.$error" class="text-red-500">{{ v$.title.$errors[0].$message }}</span>
                         </div>
     
                         <div class="mb-5">
                             <label for="description" class="block text-base font-medium text-gray-600 mb-1.5">
                                 Description
                             </label>
                             <input
                                 type="text"
                                 id="description"
                                 v-model="formData.description"
                                 class="w-full text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 p-2.5"
                             />
                            <span v-if="v$.description.$error" class="text-red-500">{{ v$.description.$errors[0].$message }}</span>
                         </div>
                         <div class="mb-5">
                             <label for="status" class="block text-base font-medium text-gray-600 mb-1.5">
                                 Status
                             </label>
                             <select
                                 id="status"
                                 v-model="formData.status"
                                 class="w-full text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 p-2.5"
                             >
                                 <option value="open">Open</option>
                                 <option value="in_progress">In Progress</option>
                                 <option value="closed">Closed</option>
                             </select>
                            <span v-if="v$.status.$error" class="text-red-500">{{ v$.status.$errors[0].$message }}</span>
                         </div>
     
                         <!-- Buttons -->
                         <div class="flex gap-x-5 justify-end pt-5">
                             <button
                                 type="button"
                                 @click="closeModal"
                                 class="block text-center text-sm font-medium text-gray-600 hover:text-white bg-gray-200 hover:bg-gray-600 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 px-10 py-3 transition"
                             >
                                 Cancel
                             </button>
                             <button
                                 type="submit"
                                 class="block text-center text-sm font-medium bg-blue-600 hover:bg-gray-600 text-white rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 px-10 py-3 transition"
                             >
                                 Submit
                             </button>
                         </div>
                     </form>
                 </div>
            </div>
        </div>
    </div>
</template>

  
<script lang="ts">
import { ref, watch, type PropType } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import ModalButton from "../buttons/ModalButton.vue";
  
interface FormData {
  title: string;
  description: string;
  status: string;
}
  
export default {
  components: { ModalButton },
  props: {
    show: Boolean,
    id: {
      type: [String, Number, null] as PropType<string | number | null>,
      default: null,
    },
    initialData: {
      type: Object as () => FormData,
      default: () => ({ title: "", description: "", status: "open" }),
    },
  },
  emits: ["close", "submit"],
  setup(props, { emit }) {
    const formData = ref<FormData>({
      title: "",
      description: "",
      status: "open",
    });

    const validations = {
      title: {required: helpers.withMessage('Title is required.', required)},
      description: {required: helpers.withMessage('Description is required.', required)},
      status: {required: helpers.withMessage('Status is required.', required)}
    }


    const v$ = useVuelidate(validations, formData);
  
    watch(
      () => props.initialData,
      (newData) => {
        formData.value = { ...newData };
      },
      { immediate: true }
    );
  
    const onSubmit = async () => {
      const isValid = await v$.value.$validate();
      if (!isValid) return;
      emit("submit", { formData: { ...formData.value }, id: props.id });
      closeModal();
    };
  
    const closeModal = () => {
      v$.value.$reset();
      emit("close");
      formData.value = { title: "", description: "", status: "open" };
    };
  
    return {
      formData,
      v$,
      onSubmit,
      closeModal,
    };
  },
};
</script>
