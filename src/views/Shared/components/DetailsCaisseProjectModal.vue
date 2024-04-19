<script setup lang="ts">
import { ref, computed ,watch} from 'vue';
import { Modal } from '@/ui';
import { useSharedStore } from '@/store';
import { helpers } from '@/utils';


const sharedStore = useSharedStore();

const caisse_project = ref(computed(() => sharedStore.selectedCaisse));

watch(sharedStore.selectedCaisse, (newValue: any) => {
    caisse_project.value = newValue;
}, { deep: true });
</script>
<template>
    <Modal id="detailsCaisseModal" title="Détails de la demande" size="modal-lg">
        <div class="modal-body">
            <div v-if="caisse_project" class="row">
                <div class="col-12">
                            <table class="table">
                                <thead class="table-light">
                                    <tr>
                                        <th class="fw-bold">Designation</th>
                                        <th class="fw-bold text-center">Mois</th>
                                        <th class="fw-bold text-center">Montant</th>
                                        <th class="fw-bold text-center">Crée Par</th>
                                        <th class="fw-bold text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody v-if="caisse_project != 0">
                                    <tr v-for="item in caisse_project" :key="item.id">
                                        <td>
                                            {{ item.designation }}
                                        </td>
                                        <td class="text-center">
                                            {{ item.mois }}
                                        </td>
                                        <td class="text-center">
                                            {{ item.montant }} MAD
                                        </td>

                                        <td class="text-center">
                                            {{ item.created_by.employee.first_name + " " + item.created_by.employee.last_name }}
                                        </td>
                                        <td class="text-center">
                                                <small class="fw-bold" :class="helpers.returnBadge(String(item.status))[0]">{{
                                                    helpers.returnBadge(String(item.status))[1] }}
                                                </small>
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr>
                                        <td colspan="4" class="text-center">
                                            Aucun historique trouvé
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
                Fermer
            </button>
        </div>
    </Modal>
</template>