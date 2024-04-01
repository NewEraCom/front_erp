<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { Modal } from '@/ui'
import { useToast } from 'vue-toastification'
import { logisticsService, sharedService } from '@/services'
import { useSharedStore } from '@/store'

const toast = useToast()

const sharedStore = useSharedStore()
const project = ref(computed(() => sharedStore.projects.data))

onMounted(async () => {
  await sharedService.getProjects()
})

const isLoading = ref(false)

const brands = [
  { name: 'Dacia', id: 1 },
  { name: 'Renault', id: 2 },
  { name: 'Hyundai', id: 3 },
  { name: 'Peugeot', id: 4 },
  { name: 'Volkswagen', id: 5 },
  { name: 'Opel', id: 6 },
  { name: 'Fiat', id: 7 },
  { name: 'Toyota', id: 8 },
  { name: 'Citroen', id: 9 },
  { name: 'Kia', id: 10 },
  { name: 'Land Rover', id: 11 },
  { name: 'ford', id: 12 },
  { name: 'Chevrolet', id: 13 },
  { name: 'Nissan', id: 14 },
  { name: 'Honda', id: 15 },
  { name: 'BMW', id: 16 },
  { name: 'Mercedes-Benz', id: 17 },
  { name: 'Audi', id: 18 },
  { name: 'Mazda', id: 20 },
  { name: 'Mitsubishi', id: 22 },
  { name: 'Skoda', id: 23 },
  { name: 'Volvo', id: 24 },
  { name: 'Jaguar', id: 25 },
  { name: 'Autre', id: 26 }
]

const car = ref({
  brand: brands[0].name,
  model: '',
  num_chassis: '',
  matricule: '',
  matricule_w: '',
  km: '',
  date_entree: '',
  id_projet: null,
  rented: 0
})

const submit = async () => {
  console.log("projet :"+project.value[0].code)
  
  await logisticsService
    .createCar(car.value)
    .then(() => {
      $('#addVehicule').modal('hide')
      toast.success('Vehicule ajouté avec succès')
    })
    .catch((error) => {
      console.log(error)
      toast.error(error)
    })
    .finally(() => {
      isLoading.value = false
    })
}
</script>

<template>
  <Modal id="addVehicule" title="Nouvelle Voiture" extra-class="modal-lg">
    <form @submit.prevent="submit">
      <div class="modal-body">
        <div class="row">
          <div class="col-6 mb-3">
            <label for="brand" class="mb-2">Brand <span class="text-danger">*</span></label>
            <select class="form-select" v-model="car.brand" required>
              <option v-for="brand in brands" :key="brand.id" :value="brand.name">
                {{ brand.name }}
              </option>
            </select>
          </div>
          <div class="col-6 mb-3">
            <label for="id_projet" class="mb-2">Projet <span class="text-danger">*</span></label>
            <select
              class="form-select"
              v-model="car.id_projet"
              required
              :data="project ? project.map((item) => ({ key: item.id, value: item.code })) : []"
            >
              <option v-for="id_projet in project" :key="id_projet.id" :value="id_projet.id">
                {{ id_projet.code }}
              </option>
            </select>
          </div>
          <div class="col-6 mb-3">
            <label for="model" class="mb-2"
              >Entrez la marque de la voiture <span class="text-danger">*</span></label
            >
            <input
              type="text"
              class="form-control"
              v-model="car.model"
              placeholder="Entrez la marque de la voiture"
              required
            />
          </div>
          <div class="col-6 mb-3">
            <label for="num_chassis" class="mb-2"
              >Entrez le numéro de châssis <span class="text-danger">*</span></label
            >
            <input
              type="text"
              class="form-control"
              v-model="car.num_chassis"
              placeholder="Entrez le numéro de châssis"
              required
            />
          </div>
          <div class="col-6 mb-3">
            <label for="matricule" class="mb-2"
              >Entrez Matricule <span class="text-danger">*</span></label
            >
            <input
              type="text"
              class="form-control"
              v-model="car.matricule"
              placeholder="Ex : 80888/A/1"
              required
            />
          </div>
          <div class="col-6 mb-3">
            <label for="matricule_w" class="mb-2"
              >Entrez Matricule WW <span class="text-danger">*</span></label
            >
            <input
              type="text"
              class="form-control"
              v-model="car.matricule_w"
              placeholder="Ex : WW147300"
              required
            />
          </div>
          <div class="col-6 mb-3">
            <label for="km" class="mb-2"
              >Entrez le kilométrage <span class="text-danger">*</span></label
            >
            <input
              type="number"
              class="form-control"
              v-model="car.km"
              placeholder="10000"
              required
            />
          </div>
          <div class="col-6 mb-3">
            <label for="date_entree" class="mb-2"
              >Date Debut <span class="text-danger">*</span></label
            >
            <input type="date" class="form-control" v-model="car.date_entree" required />
          </div>
          <div class="form-check">
            <input
              type="checkbox"
              class="form-check-input"
              v-model="car.rented"
              true-value="1"
              false-value="0"
            />
            <label class="form-check-label" for="rented"> Voiture Louer </label>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
          Fermer
        </button>
        <button type="submit" :disabled="isLoading" class="btn btn-primary">
          <span v-if="isLoading" class="d-flex align-items-center">
            <div class="spinner-border spinner-border-sm text-white" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </span>
          <span v-else> Terminer</span>
        </button>
      </div>
    </form>
  </Modal>
</template>
