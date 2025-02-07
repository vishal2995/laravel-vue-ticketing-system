
import { defineStore } from "pinia";
import api from "@/utils/axios";
import { toast } from "vue3-toastify";
import Cookies from "js-cookie";
import router from "@/router";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: null,
        token: null,
        loading: false,
        error: null,
    }),

    actions: {
        async login(credentials: { email: string; password: string }) {
            this.loading = true;
            this.error = null;
            try {
                const response = await api.post("/login", credentials);
                this.user = response.data.user;
                const token = response.data.token;
                if (token) {
                    Cookies.set("auth_token", token, { expires: 1 });
                }
                toast.success(response.data.message);
            } catch (error) {
                console.error("Error submitting form:", error);
            } finally {
                this.loading = false;
            }
        },
        async register(data: { email: string, name: string, password: string, password_confirmation: string  }) {
            this.loading = true;
            this.error = null;
            try {
                const response = await api.post("/register", data);
                toast.success(response.data.message);
            } catch (error) {
                console.error("Error submitting form:", error);
            } finally {
                this.loading = false;
            }
        },
        logout(){
            Cookies.remove('auth_token');
            router.push('/login');
        }
  },
});
