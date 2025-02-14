
import { defineStore } from "pinia";
import api from "@/utils/axios";
import Cookies from "js-cookie";
import router from "@/router";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: null,
        token: null,
    }),

    actions: {
        async login(credentials: { email: string; password: string }) {
            try {
                const response = await api.post("/login", credentials);
                this.user = response.data.user;
                const token = response.data.token;
                if (token) {
                    Cookies.set("auth_token", token, { expires: 1 });
                }

                return {
                    success: true,
                }
            } catch (error : any) {
                throw new Error(error.response?.data?.message || error.message);
            }
        },
        async register(data: { email: string, name: string, password: string, password_confirmation: string  }) {
            try {
                const response = await api.post("/register", data);
                this.user = response.data.user;
                const token = response.data.token;
                if (token) {
                    Cookies.set("auth_token", token, { expires: 1 });
                }

                return {
                    success: true,
                }
            } catch (error :any) {
                throw new Error(error.response?.data?.message || error.message);
            }
        },
        logout(){
            Cookies.remove('auth_token');
            router.push('/login');
        }
  },
});
