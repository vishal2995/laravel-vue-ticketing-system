<template>
    <div class="min-h-screen bg-gray-100">
        <Header />

        <div class="w-full py-5 lg:py-10">
            <div class="sm:container xl:container mx-auto px-5 xl:px-0">
                <AddButton @open-modal="openModal" />
                <TicketsTable
                    :tickets="ticketStore.tickets"
                    @confirm-delete="confirmDelete"
                    @handleEdit="handleEdit"
                    @handleView="handleView"
                />
            </div>
        </div>

        <AddModal
            :show="showModal"
            :initialData="ticketStore.ticket || { title: '', description: '', status: 'open' }"
            :id="id"
            @submit="handleSubmit"
            @close="closeModal"
        />
        <ViewModal
            :show="showViewModal"
            :ticket="ticketStore.ticket || { title: '', description: '', status: 'open' }"
            @close="showViewModal = false"
        />
        <DeleteModal
            :showDeleteModal="showDeleteModal"
            @deleteConfirmed="handleDelete"
            @closeModal="showDeleteModal = false"
        />
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
    },

    setup() {
        const ticketStore = useTicketStore();

        const id = ref<string | number | null>(null);
        const showModal = ref(false);
        const showViewModal = ref(false);
        const showDeleteModal = ref(false);
        const ticketToDelete = ref<Ticket | null>(null);

        const fetchTickets = async () => {
            await ticketStore.fetchData();
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
        };
    },

    mounted() {
        this.fetchTickets();
    },
};
</script>
