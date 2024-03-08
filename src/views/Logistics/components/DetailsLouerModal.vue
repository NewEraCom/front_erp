<script setup lang="ts">
import { ref, computed } from 'vue';
import { Modal } from '@/ui';
import { useLogisticsStore } from '@/store';
import { formater } from '@/utils';

const logisticsStore = useLogisticsStore();


const selectedOperation = ref(computed(() => logisticsStore.selectedItem));

</script>

<template>
    <Modal id="detailsLouer" title="Détails de l'opération" size="modal-md">
        <div v-if="selectedOperation" class="modal-body">
            <div class="row">
                <div class="col-md-12 mb-3">
                    <label for="type" class="mb-2">Désignation</label>
                    <input type="text" :value="selectedOperation.designation" class="form-control" readonly />
                </div>
                <div class="col-md-12 mb-3">
                    <label for="type" class="mb-2">Montant</label>
                    <input type="text" :value="formater.number(selectedOperation.montant) + ' MAD'" class="form-control"
                        readonly />
                </div>
                <div class="col-md-12 mb-3">
                    <label for="type" class="mb-2">Récepteur</label>
                    <input type="text" :value="selectedOperation.recepteur" class="form-control" readonly />
                </div>
                <div class="col-md-12 mb-3">
                    <label for="type" class="mb-2">Type</label>
                    <input type="text" :value="selectedOperation.type" class="form-control" readonly />
                </div>
                <div class="col-md-12 mb-3">
                    <label for="type" class="mb-2">Adresse</label>
                    <input type="text" :value="selectedOperation.adresse" class="form-control" readonly />
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">Fermer</button>
        </div>
    </Modal>
</template>
