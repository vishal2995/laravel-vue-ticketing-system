<template>
    <div class="min-h-screen bg-gray-100">
        <Header />
        <div class="w-full py-5 lg:py-10">
            <div class="sm:container xl:container mx-auto px-5">
                <AddButton @open-modal="openModal" />
                <div
                    class="flex flex-col gap-2 pb-4 border border-b-0 border-gray-100 dark:border-white/[0.05] rounded-t-xl sm:flex-row sm:items-center sm:justify-between">
                    <limit-pagination :per-page="ticketStore.per_page" @changeLimit="handleLimitChange" />
                    <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <search @onSearch="handleSearch" />
                    </div>
                </div>
                <TicketsTable v-if="ticketStore.tickets" :tickets="ticketStore.tickets"
                    :total-pages="ticketStore.last_page" :current-page="ticketStore.current_page"
                    :per-page="ticketStore.per_page" :total-tickets="ticketStore.total_tickets ?? 0"
                    @confirm-delete="confirmDelete" @handleEdit="handleEdit" @handleView="handleView"
                    @pageChange="handlePagination" />
            </div>
        </div>
        <AddModal :show="showModal" :initialData="ticketStore.ticket || { title: '', description: '', status: 'open' }"
            :id="id" @submit="handleSubmit" @close="closeModal" />
        <ViewModal :show="showViewModal" :ticket="ticketStore.ticket || { title: '', description: '', status: 'open' }"
            @close="showViewModal = false" />
        <DeleteModal :showDeleteModal="showDeleteModal" @deleteConfirmed="handleDelete"
            @closeModal="showDeleteModal = false" />
    </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useTicketStore } from "@/stores/ticketStore";
import DeleteModal from "../modals/DeleteModal.vue";
import ViewModal from "../modals/ViewModal.vue";
import AddModal from "../modals/AddModal.vue";
import Header from "../header/Header.vue";
import AddButton from "../buttons/AddButton.vue";
import TicketsTable from "../table/TicketTable.vue";
import LimitPagination from "@/components/common/LimitPagination.vue";
import Search from "@/components/common/Search.vue";
import "vue3-toastify/dist/index.css";

interface Ticket {
    id: string | number;
    title: string;
    description: string;
    status: string;
}

interface FormData {
    title: string;
    description: string;
    status: string;
}

export default {
    name: "Tickets",
    components: {
        DeleteModal,
        ViewModal,
        AddModal,
        Header,
        AddButton,
        TicketsTable,
        LimitPagination,
        Search,
    },

    setup() {
        const ticketStore = useTicketStore();

        const id = ref<string | number | null>(null);
        const showModal = ref(false);
        const showViewModal = ref(false);
        const showDeleteModal = ref(false);
        const ticketToDelete = ref<Ticket | null>(null);
        const pageNumber = ref(1);
        const limit = ref(10);
        const search = ref('');

        const fetchTickets = async () => {
            await ticketStore.fetchData(pageNumber.value, limit.value, search.value);
        };

        const openModal = () => {
            showModal.value = true;
        };

        const closeModal = () => {
            showModal.value = false;
            id.value = null;
        };

        const handleSubmit = async (formData: { formData: FormData }) => {
            if (id.value) {
                await ticketStore.updateForm(formData.formData, id.value);
            } else {
                await ticketStore.addForm(formData.formData);
            }
            closeModal();
        };

        const handleEdit = async (ticketId: number | string) => {
            id.value = ticketId;
            await ticketStore.viewData(ticketId);
            showModal.value = true;
        };

        const handleView = async (ticketId: number | string) => {
            showViewModal.value = true;
            await ticketStore.viewData(ticketId);
        };

        const confirmDelete = (ticket: Ticket) => {
            ticketToDelete.value = ticket;
            showDeleteModal.value = true;
        };

        const handleDelete = async () => {
            if (ticketToDelete.value) {
                await ticketStore.deleteTicket(ticketToDelete.value.id);
                showDeleteModal.value = false;
                ticketToDelete.value = null;
            }
        };

        const handlePagination = async (currentPage: number) => {
            pageNumber.value = currentPage;
            fetchTickets();
        }

        const handleLimitChange = async (pageLimit: number) => {
            limit.value = pageLimit;
            fetchTickets();
        }

        const handleSearch = async (value: string) => {
            search.value = value;
            fetchTickets();
        }

        return {
            ticketStore,
            id,
            showModal,
            openModal,
            closeModal,
            showViewModal,
            showDeleteModal,
            ticketToDelete,
            fetchTickets,
            handleSubmit,
            handleEdit,
            handleView,
            confirmDelete,
            handleDelete,
            handlePagination,
            pageNumber,
            limit,
            handleLimitChange,
            handleSearch,
            search,
        };
    },

    mounted() {
        this.fetchTickets();
    },
};
</script>
