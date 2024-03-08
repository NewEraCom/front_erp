<script setup>
import { Modal } from '@/ui';

defineProps({
    id:String,
    method: Function,
    isLoading: Boolean,
    itemid: String,
    title : String,
    message : String
});


</script>

<template>
   
                <Modal :id="id" :title="title">
                <form @submit.prevent="method">
                    <div class="modal-body">
                        <input type="text" id="PotInput" hidden :value="itemid">
                        <p>{{ message }}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
                            Fermer
                        </button>
                        <button type="submit" class="btn btn-primary" :disabled="isLoading">
                            <span v-if="isLoading" class="d-flex align-items-center">
                                <div class="spinner-border spinner-border-sm text-white" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </span>
                            <span v-else>Oui</span>
                        </button>
                    </div>
                </form>
            </Modal>
            <!-- </div>
        </div>
    </div> -->
</template>

<style></style>