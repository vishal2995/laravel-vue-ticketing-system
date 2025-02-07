
import { defineStore } from "pinia";
import { toast } from "vue3-toastify";
import api from "@/utils/axios";

export const useTicketStore = defineStore("ticket", {
  state: () => ({
    tickets: [],
    current_page: 1,
    last_page: 1,
    next_page_url: null,
    prev_page_url: null,
    ticket: null,
    isLoading: false,
  }),

  actions: {
    async fetchData() {
      this.isLoading = true;
      try {
        const response = await api.get('/tickets');
        this.tickets = response.data.payload.data.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        this.isLoading = false;
      }
    },

    async addForm(formData: any) {
      try {
        const response = await api.post(
          `${import.meta.env.VITE_APP_API_URL}/tickets`,
          formData
        );
        toast.success(response.data.message);
        await this.fetchData();
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Failed to submit form");
      }
    },

    async updateForm(formData: any, id: any) {
      try {
        const response = await api.patch(
          `${import.meta.env.VITE_APP_API_URL}/tickets/${id}`,
          formData
        );
        toast.success(response.data.message);
        await this.fetchData();
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Failed to submit form");
      }
    },

    async viewData(id: any) {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_APP_API_URL}/tickets/${id}`
        );
        this.ticket = response.data.payload.data;
      } catch (error) {
        console.error("Error viewing ticket:", error);
      }
    },

    async deleteTicket(ticketId: any) {
      try {
        await api.delete(`${import.meta.env.VITE_APP_API_URL}/tickets/${ticketId}`);
        toast.success("ticket deleted successfully!");
        await this.fetchData();
      } catch (error) {
        console.error("Error deleting ticket:", error);
        toast.error("Failed to delete ticket");
      }
    },
  },
});
