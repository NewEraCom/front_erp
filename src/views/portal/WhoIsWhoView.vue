<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useHrStore } from '@/stores'
import { portalService } from '@/services'
import { LoaderView } from '@/ui'
import router from '@/router';
const hrStore = useHrStore()

const employees = ref(computed(() => hrStore.employees))
const filteredEmployees = ref(null)

const env = import.meta.env.VITE_UPLOADS_URL

onMounted(async () => {
  await portalService.getEmployees()
  filteredEmployees.value = employees.value
})

onUnmounted(() => {
  hrStore.clearEmployees()
})

const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = ref(10)

const filter = () => {
  filteredEmployees.value = employees.value.filter((item) => {
    const combinedFields = `${item.first_name} ${item.last_name} ${item.poste}`.toLowerCase()
    const searchWords = searchQuery.value.toLowerCase().split(' ')
    return searchWords.every((word) => combinedFields.includes(word))
  })
}

const pageCount = computed(() => {
  let data = null
  if (filteredEmployees.value) {
    data = Math.ceil(filteredEmployees.value.length / pageSize.value)
  }
  return data
})

const paginatedItems = computed(() => {
  let data = []
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  if (filteredEmployees.value) {
    data = filteredEmployees.value.slice(start, end)
  }
  return data
})

const pages = computed(() => {
  let pages = []
  for (let i = 1; i <= pageCount.value; i++) {
    pages.push(i)
  }
  return pages
})

function nextPage() {
  if (currentPage.value < pageCount.value) {
    currentPage.value++
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

function changePage(page) {
  currentPage.value = page
}
</script>

<template>
  <div class="flex-grow-2 container-md mt-3 mb-5" v-if="employees">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link :to="{ name: 'DashboardPortal' }">Dashboard</router-link>
        </li>
        <li class="breadcrumb-item active">Qui est qui</li>
      </ol>
    </nav>

    <div class="row">
      <div class="col-12">
        <div class="input-group input-group-merge">
          <span class="input-group-text cursor-pointer"><i class="ti ti-search"></i></span>
          <input v-model="searchQuery" type="text" class="form-control" placeholder="Rechercher une personne"
            @input="filter" />
        </div>
      </div>
    </div>

    <div class="card mt-3" v-if="paginatedItems.length > 0">
      <div class="card-body m-0 p-0">
        <div class="row p-0 m-0 p-0">
          <div class="col-12 border-bottom item-clicable p-3" v-for="item in paginatedItems" :key="item.id">
            <div class="d-flex align-items-center">
              <div class="align-items-center d-flex justify-content-center rounded-circle">
                <img :src="env + 'uploads/pictures/' + item.user.profile_picture" class="rounded border"
                  style="object-fit: cover" height="45px" width="45px" />
              </div>
              <div class="d-block align-items-center ms-3">
                <h6 class="mb-0 fw-medium">
                  {{ item.first_name + ' ' + item.last_name }}
                </h6>
                <small class="text-muted">{{ item.poste }}</small>
              </div>
              <i class="bg-secondary rounded-circle p-2 ti ti-chevron-right text-white ms-auto"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="row mt-3">
        <div class="col-12">
          <div class="card">
            <div class="card-body text-center">
              <img src="@/assets/img/user-not-found.jpeg" width="200px" alt="" />
              <h5 class="mt-3">Aucun résultat trouvé</h5>
              <p class="text-muted">Essayez de rechercher avec un autre mot clé</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="pagination mt-3 d-flex justify-content-center" v-if="paginatedItems.length > 0">
      <button class="btn btn-primary btn-xs me-2" @click="prevPage" :disabled="currentPage <= 1">
        <i class="ti ti-chevron-left"></i>
      </button>
      <button v-for="page in pages" :key="page" @click="changePage(page)" class="btn btn-primary btn-sm"
        :class="{ 'active-page': currentPage === page }">
        {{ page }}
      </button>
      <button class="btn btn-primary btn-xs ms-2" @click="nextPage" :disabled="currentPage >= pageCount">
        <i class="ti ti-chevron-right"></i>
      </button>
    </div>
  </div>
  <LoaderView v-else />
</template>

<style></style>
