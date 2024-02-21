<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { CardOne, Modal } from '@/ui';
import { EmployeesTable } from './components';
import { rhService } from '@/services';
import { useRhStore } from '@/store';

const RhStore = useRhStore();

const employees = ref(computed(() => RhStore.employees));
const stats = ref(computed(() => RhStore.stats));

onMounted(async () => {
  await rhService.getEmployees();
});

</script>
<template>
  <div class="flex-grow-1 container-fluid mt-3">
    <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Employés</span> </h5>
    <div v-if="stats" class="row">
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardOne title="Employés CDI" :count="String(stats.cdi)" color="bg-label-warning" icon="ti-bolt"
          card-color="card-border-shadow-warning" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardOne title="Employés CDD" :count="String(stats.cdd)" color="bg-label-success" icon="ti-bolt"
          card-color="card-border-shadow-success" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-3">
        <CardOne title="Employés Chantier" :count="String(stats.chantier)" color="bg-label-info" icon="ti-bolt"
          card-color="card-border-shadow-info" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-3">
        <CardOne title="Employés Contrat Commercial" :count="String(stats.commercial)" color="bg-label-danger"
          icon="ti-bolt" card-color="card-border-shadow-danger" />
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-12">
        <div class="card">
          <div class="card card-border-shadow-primary">
            <div class="card-header">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h5 class="fw-bold mb-1">Employés</h5>
                  <small class="fw-bold mb-1 text-muted">Liste des employés de l'entreprise</small>
                </div>
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addNewEmployee">
                  <i class="ti ti-square-rounded-plus-filled me-2"></i>
                  Ajouter un employé
                </button>
              </div>
            </div>
            <div v-if="employees != null" class="card-body border-top pt-4">
              <EmployeesTable :employees="employees" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal id="addNewEmployee" title="Ajouter un employé" size="modal-xl">
      <form @submit.prevent="submit" enctype="multipart/form-data">
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-12">
              <div class="mb-3">
                <label for="nameEx" class="form-label">Nom</label>
                <input class="form-control" placeholder="Entrez le numéro de l'offre" type="text" tabindex="0" id="nameEx"
                  v-model="first_name" autofocus required />
              </div>
            </div>
            <div class="col-sm-6">
              <div class="mb-3">
                <label for="nameEx" class="form-label">Prenom</label>
                <input class="form-control" placeholder="Entrez le nom de client" type="text" tabindex="0" id="nameEx"
                  v-model="last_name" required />
              </div>
            </div>
            <div class="col-sm-6">
              <div class="mb-3">
                <label for="nameEx" class="form-label">Tel</label>
                <input class="form-control" placeholder="Entre " type="text" tabindex="0" id="nameEx" v-model="phone_no"
                  required />
              </div>
            </div>
            <div class="col-sm-6">
              <div class="mb-3">
                <label for="nameEx" class="form-label">matricule</label>
                <input class="form-control" placeholder="" type="text" tabindex="0" id="nameEx" v-model="matricule"
                  required />
              </div>
            </div>
            <div class="col-sm-6">
              <div class="mb-3">
                <label for="nameEx" class="form-label">Cin</label>
                <input class="form-control" placeholder="" type="text" tabindex="0" id="nameEx" v-model="cin" required />
              </div>
            </div>
            <div class="col-sm-6">
              <div class="mb-3">
                <label for="copie_cin" class="form-label">Copie Cin</label>
                <input class="form-control" placeholder="" type="file" tabindex="0" id="copie_cin" name="copie_cin"
                  @change="handleFileChange" required />
              </div>
            </div>
            <div class="col-sm-6">
              <div class="mb-3">
                <label for="nameEx" class="form-label">Date de naissance</label>
                <input class="form-control" placeholder="" type="date" tabindex="0" id="nameEx" v-model="birthdate"
                  required />
              </div>
            </div>
            <div class="col-sm-6">
              <div class="mb-3">
                <label for="nameEx" class="form-label">Sexe</label>

                <select name="" id="" class="form-select" required v-model="sexe">
                  <option value="m">homme</option>
                  <option value="f">femme</option>
                </select>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="mb-3">
                <label for="nameEx" class="form-label">Adresse mail</label>
                <input class="form-control" placeholder="Entre les qualifications demandé" type="email" tabindex="0"
                  id="nameEx" v-model="email" required />
              </div>
            </div>
            <div class="col-sm-6">
              <div class="mb-3">
                <label for="nameEx" class="form-label">Adresse </label>
                <input class="form-control" placeholder="Entre les qualifications demandé" type="text" tabindex="0"
                  id="nameEx" v-model="adresse" required />
              </div>
            </div>
            <div class="col-sm-6">
              <div class="mb-3">
                <label for="nameEx" class="form-label">Date d'embauche</label>
                <input class="form-control" placeholder="" type="date" tabindex="0" id="nameEx" v-model="date_embauche"
                  required />
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
            Fermer
          </button>
          <button type="submit" :disabled="isLoading" class="btn btn-primary">
            <span v-if="isLoading" class="d-flex align-items-center">
              <div class="spinner-border spinner-border-sm text-white me-2" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              Chargement...
            </span>
            <span v-else> Terminer</span>
          </button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<style scoped></style>
