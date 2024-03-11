<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { CardTwo, CardTwoSkeleton, DeleteModal } from '@/ui';
import { useRhStore } from '@/store';
import { rhService } from '@/services';
import { LeavesRequestTable, AddLeaveRequest } from './components';

const rhStore = useRhStore();

let user = ref(computed(() => rhStore.employee));

let totalApprovedDays = ref(0);
let totalSickleaves = ref(0);
let data = ref(null);

onMounted(async () => {
    await rhService.getEmployeeById(JSON.parse(localStorage.getItem('user')).employee_id).then(() => {
        const approvedConges = rhStore.employee.conges.filter((conge) => conge.status === 'approved' && conge.type === 'Congé');
        totalApprovedDays.value = approvedConges.reduce((total, conge) => total + conge.duree, 0);
        const sickLeaves = rhStore.employee.conges.filter((conge) => conge.type === 'Maladie');
        totalSickleaves.value = sickLeaves.reduce((total, conge) => total + conge.duree, 0);
        data.value = user.value;
    });
});

onUnmounted(() => {
    rhStore.clearEmployee();
});

watch(user, () => {
    data.value = user.value;
}, { deep: true });

</script>

<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Demande de congé</span></h5>
        <div v-if="data" class="row">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardTwo title="Solde de congé" :count="(data.solde_conge ?? 0) + ' Jrs'" color="bg-label-primary"
                    icon="ti ti-plane-inflight" card-color=" card-border-shadow-primary" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardTwo title="Solde congé consommé" :count="(totalApprovedDays) + ' Jrs'" color="bg-label-success"
                    icon="ti ti-plane-inflight" card-color="card-border-shadow-success" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardTwo title="Congé maladie" :count="(totalSickleaves) + ' Jrs'" color="bg-label-warning"
                    icon="ti ti-plane-inflight" card-color="card-border-shadow-warning" />
            </div>
        </div>
        <div v-else class="row g-3">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardTwoSkeleton />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardTwoSkeleton />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardTwoSkeleton />
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-12">
                <div class="card">
                    <div class="card card-border-shadow-primary">
                        <div class="card-header d-flex align-items-center">
                            <div class="me-auto">
                                <h5 class="fw-bold mb-1">Liste des congés</h5>
                                <small class="fw-bold mb-1 text-muted">Liste des congés demandés par vous</small>
                            </div>
                            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addNewLeave">
                                <i class="ti ti-square-rounded-plus-filled me-2"></i>
                                Ajouter un congé
                            </button>
                        </div>
                        <div v-if="user != null" class="card-body border-top pt-4">
                            <LeavesRequestTable :leaves="data.conges" />
                        </div>
                        <div v-else class="card-body border-top pt-4 d-flex align-items-center justify-content-center"
                            style="height: 650px;">
                            <div class="row mt-5">
                                <div class="col-12 text-center">
                                    <h5>Chargement des données...</h5>
                                    <div class="spinner-border text-primary mt-4" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <AddLeaveRequest v-if="user != null" :user_id="user.id" />
        <DeleteModal title="Supprimer un demande de congé"
            text="Voulez-vous vraiment supprimer cette demande de congé ?" textButton="Oui, Supprimer"
            :action="() => console.log('delete')" message="La demande de congé a été supprimée avec succès" />
    </div>
</template>

<style scoped>
.f-45 {
    font-size: 45px;
}
</style>
