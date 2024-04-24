<script setup lang="ts">
import { ref, computed } from 'vue';
import { Modal } from '@/ui';
import { useLogisticsStore } from '@/store';
import { formater } from '@/utils';

const logisticsStore = useLogisticsStore();


const selectedOperation = ref(computed(() => logisticsStore.selectedItem));

</script>

<template>
    <Modal id="detailsOperation" title="Détails de l'opération" size="modal-lg">
        <div v-if="selectedOperation" class="modal-body">
            <div class="row">
                <div class="col-md-12 mb-3">
                    <label for="type" class="mb-2">Type d'opération</label>
                    <input type="text" class="text-white form-control border-none fw-bold"
                        :class="selectedOperation.operation == 'sortie' ? 'bg-warning' : 'bg-success'"
                        :value="selectedOperation.operation == 'sortie' ? 'Sortie' : 'Entree'" readonly>
                </div>
                <div class="col-md-12 mb-3">
                    <label for="type" class="mb-2">Montant</label>
                    <input type="text" class="form-control fw-bold"
                        :value="formater.number(selectedOperation.montant) + ' MAD'" readonly>
                </div>
                <div class="col-md-12 mb-3">
                    <label for="type" class="mb-2">Montant</label>
                    <input type="text" class="form-control fw-bold"
                        :value="formater.dateTime(selectedOperation.date_operation)" readonly>
                </div>
                <div v-if="selectedOperation.operation == 'sortie'" class="col-md-12 mb-3">
                    <label for="type" class="mb-2">Recepteur</label>
                    <input type="text" class="form-control fw-bold"
                        :value="selectedOperation.recepteur.first_name + ' ' + selectedOperation.recepteur.last_name"
                        readonly>
                </div>
                <div v-else class="col-md-12 mb-3">
                    <label for="type" class="mb-2">Emetteur</label>
                    <input type="text" class="form-control fw-bold" :value="selectedOperation.emetteur" readonly>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">Fermer</button>
        </div>
    </Modal>
</template>
