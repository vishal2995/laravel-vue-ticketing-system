<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        
        <!-- Title -->
        <h2 class="text-3xl font-semibold text-center text-blue-600 mb-4">Login</h2>
  
        <!-- Login Form -->
        <form @submit.prevent="handleLogin">
          
          <!-- Email Input -->
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              v-model="form.email"
              type="text"
              id="email"
              name="email"
              class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
            <span v-if="v$.email.$error" class="text-red-500">{{ v$.email.$errors[0].$message }}</span>
          </div>
  
          <!-- Password Input -->
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              v-model="form.password"
              type="password"
              id="password"
              name="password"
              class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
            <span v-if="v$.password.$error" class="text-red-500" >{{ v$.password.$errors[0].$message }}</span >
          </div>
  
          <!-- Submit Button -->
          <div class="flex justify-center mb-4">
            <button
              type="submit"
              class="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Log In
            </button>
          </div>
        </form>
  
        <!-- Footer -->
        <div class="text-center text-sm text-gray-500">
          <p>Don't have an account? <a href="/register" class="text-blue-600 hover:underline">Sign up</a></p>
        </div>
      </div>
    </div>
  </template>
  
<script setup lang="ts">
	import { ref } from "vue";
	import { useAuthStore } from "@/stores/authStore";
	import useVuelidate from "@vuelidate/core";
	import { required, email, helpers } from "@vuelidate/validators";
  import { useRouter } from "vue-router";
  
	const authStore = useAuthStore();
  
	const form = ref({
		email: "vishal1@yopmail.com",
		password: "abcd@1234",
	});
  
  const validations = {
    email: {
      required: helpers.withMessage('Email is required.', required),
      email: helpers.withMessage('Email is invalid.', email)
    },
    password: {
      required: helpers.withMessage('Password is required.', required)
    }
  }

  const router = useRouter();
	const v$ = useVuelidate(validations, form);
  
	const handleLogin = async () => {
		v$.value.$validate();
		if (v$.value.$error) return;
	
		await authStore.login({
			email: form.value.email,
			password: form.value.password,
		})
    .then((response) => {
      if(response.success == true) {
        router.push({'name': 'tickets'}).catch((e) => console.log(e))
      }
    })
  };
</script>
  