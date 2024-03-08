<script setup lang="ts">
import { CardOne } from '@/ui';
import { ref, computed, onMounted ,watch} from 'vue';
import { RecruitmentTable, AddNewRecruitmentModal } from './components';
import { rhService ,sharedService} from '@/services';
import { useRhStore ,useSharedStore} from '@/store';
import { DeleteDocModal ,RecruitementDetailsModal} from './components/modals';


const isLoading = ref(false);
const rhStore = useRhStore();
const sharedStore = useSharedStore();

const recrutement = ref(computed(() => rhStore.recrutement));

onMounted(async () => {
  await rhService.getRecrutement();
});

const DeleteLeave = async () => {
     isLoading.value = true;

    await sharedService.deleteRecruitment(rhStore.ItemId).then(() => {
     isLoading.value = false;
      $('#delete-doc').modal('hide');
    
   });
};
watch(() => rhStore.recrutement, (newValue) => {
  recrutement.value = newValue;
    },{ deep: true });
</script>
<template>
  <div class="flex-grow-1 container-fluid mt-3">
    <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Recrutement</span> </h5>
    <div v-if="recrutement.stats != null" class="row g-3">
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
        <CardOne title="Total Demande" :count="String(recrutement.stats.total)" color="bg-label-primary"
          icon="ti-zoom-filled" card-color="card-border-shadow-primary" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
        <CardOne title="Total Demande Traitée" :count="String(recrutement.stats.accepted)" color="bg-label-success"
          icon="ti-zoom-filled" card-color="card-border-shadow-success" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
        <CardOne title="Total Demande Non Traitée" :count="String(recrutement.stats.pending)" color="bg-label-danger"
          icon="ti-zoom-filled" card-color="card-border-shadow-danger" />
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-12">
        <div class="card">
          <div class="card card-border-shadow-primary">
            <div class="card-header d-flex align-items-center">
              <div class="me-auto">
                <h5 class="fw-bold mb-1">Recrutement</h5>
                <small class="fw-bold mb-1 text-muted">Liste des demandes de recrutement</small>
              </div>
              <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addNewRecruitment">
                <i class="ti ti-square-rounded-plus-filled me-2"></i>
                Ajouter une demande de recrutement
              </button>
            </div>
            <div v-if="recrutement.data != null" class="card-body border-top pt-4">
              <RecruitmentTable :recruitments="recrutement.data" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <AddNewRecruitmentModal />
    <DeleteDocModal id="delete-doc" :isLoading="isLoading"
                :method="DeleteLeave"
                title="Supprimer Ce Recrutement"
                message="Êtes-vous sûr de supprimer ce Recrutement ?"
                />
    <RecruitementDetailsModal />
   
  </div>
</template>

<style scoped></style>
