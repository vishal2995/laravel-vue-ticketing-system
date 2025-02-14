<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <!-- Title -->
      <h2 class="text-3xl font-semibold text-center text-blue-600 mb-4">
        Sign Up
      </h2>

      <!-- Login Form -->
      <form @submit.prevent="onSubmit">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Name</label
          >
          <input
            v-model="formData.name"
            type="text"
            id="name"
            name="name"
            class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
          <span v-if="v$.name.$error" class="text-red-500">{{ v$.name.$errors[0].$message }}</span>
        </div>

        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            v-model="formData.email"
            type="email"
            id="email"
            name="email"
            class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
          <span v-if="v$.email.$error" class="text-red-500">{{ v$.email.$errors[0].$message }}</span>
        </div>

        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Password</label
          >
          <input
            v-model="formData.password"
            type="password"
            id="password"
            name="password"
            class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
          <span v-if="v$.password.$error" class="text-red-500">{{ v$.password.$errors[0].$message }}</span>
        </div>

        <div class="mb-4">
          <label
            for="confirm_password"
            class="block text-sm font-medium text-gray-700"
            >Confirm password</label
          >
          <input
            v-model="formData.confirm_password"
            type="password"
            id="confirm_password"
            name="confirm_password"
            class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your confirm password"
          />
          <span v-if="v$.confirm_password.$error" class="text-red-500">{{ v$.confirm_password.$errors[0].$message }}</span>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-center mb-4">
          <button
            type="submit"
            class="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </div>
      </form>
      <!-- Footer -->
      <div class="text-center text-sm text-gray-500">
        <p>
          Already have an account?
          <a href="/login" class="text-blue-600 hover:underline"
            >Click here to Sign in</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
	import { ref, computed } from "vue";
	import { useAuthStore } from "@/stores/authStore";
	import useVuelidate from "@vuelidate/core";
	import { required, email, minLength, sameAs } from "@vuelidate/validators";
  import { useRouter } from "vue-router";
  
	const authStore = useAuthStore();
  
  const formData = ref({ email: "", name: "", password: "", confirm_password: "" });
  
  const rules = computed(() =>({
      email: { required, email },
      name: { required },
      password: { required, minLength: minLength(8) },
      confirm_password: { required, sameAs: sameAs(formData.value.password) },
    }));
  
  const router = useRouter();
  const v$ = useVuelidate(rules, formData);
  
  const onSubmit = async () => {
      v$.value.$validate();
      if (v$.value.$error) return;

      await authStore.register({
        email: formData.value.email,
        name: formData.value.name,
        password: formData.value.password,
        password_confirmation: formData.value.confirm_password,
      })
      .then((response) => {
        if(response.success == true) {
          router.push({ name: 'tickets' })
        }
      })
    };
</script>
