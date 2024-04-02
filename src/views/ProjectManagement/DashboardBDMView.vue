<script lang="ts" setup>
import { financeService, pmService, sharedService } from '@/services';
import { useFinanceStore, usePMStore, useSharedStore } from '@/store';
import { ref, computed, onMounted } from 'vue';
import { CautionDashTable, ProjectDash } from './components';
import { ListItem, CardTwo, ListItemSkeleton } from '@/ui';

const PMStore = usePMStore();
const FinanceStore = useFinanceStore();
const sharedStore = useSharedStore();

const projects = ref(computed(() => sharedStore.projects.data));

const caution = ref(computed(() => FinanceStore.caution));
const stats = ref(computed(() => FinanceStore.stats));

const preProject = ref(computed(() => PMStore.preproject.data));
const stats1 = ref(computed(() => PMStore.preproject.stats));

onMounted(async () => {
  await pmService.getPreProject();
  await financeService.getCaution();
  await sharedService.getProjects();
});

const statsObject = computed(() => {
  const statsArray = FinanceStore.stats;
  let tempStatsObject = {};

  for (let stat of statsArray) {
    tempStatsObject[stat.type] = stat.total;
  }
  return tempStatsObject;
});
</script>

<template>
  <div class="flex-grow-1 container-fluid mt-3">
    <h5 class="py-3 mb-4 fw-medium text-dark">Dashboard / <span class="text-dark">PM</span></h5>
    <div v-if="stats" class="row g-3">
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardTwo title="Avant Projet En attente" :count="String(stats1.total_waiting)" color="bg-label-warning"
          icon="ti ti-bolt" card-color="card-border-shadow-warning" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardTwo title="Avant Projet En Cours" :count="String(stats1.total_in_progress)" color="bg-label-info"
          icon="ti ti-bolt" card-color="card-border-shadow-info" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-3">
        <CardTwo title="Projet" :count="String(stats1.total_win)" color="bg-label-success" icon="ti-bolt"
          card-color="card-border-shadow-success" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-3">
        <CardTwo title="Caution Recupere" :count="String(statsObject.def_in) + ' MAD'" color="bg-label-danger"
          icon="ti ti-bolt" card-color="card-border-shadow-danger" />
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 mb-4">
        <div class="card h-100 card-border-shadow-primary">
          <div class="card-header">
            <div class="card-title mb-0">
              <h5 class="m-0 me-2 fw-bold">Derniers avant-projets</h5>
              <small class="text-muted">Les derniers avant-projets</small>
            </div>
          </div>
          <div v-if="preProject != null" class="card-body">
            <div v-if="preProject.length != 0">
              <ul v-for="item in preProject.slice(0, 5)" :key="item.id" class="p-0 m-0">
                <ListItem :pre-project="item" />
              </ul>
            </div>
            <div v-else class="text-center p-4">
              <img src="/src/assets/img/no_pre_project.png" class="empty_stats_img_md" alt="" />
              <p class="mt-5 fw-bold">Aucun avant-projet créé pour le moment.</p>
              <small class="text-muted">
                Il n'y a pas encore d'avant-projet. Vous pouvez créer ou importer un
                avant-projet dans la section Avant Projets.
              </small>
            </div>
          </div>
          <div v-else class="card-body">
          </div>
        </div>
      </div>

      <div class="col-6">
        <div class="card">
          <div class="card card-border-shadow-primary">
            <div class="card-header d-flex align-items-center">
              <div class="me-auto">
                <h5 class="m-0 me-2 fw-bold">Statistiques des cautions</h5>
                <small class="text-muted">Statistiques et états des cautions</small>
              </div>
            </div>
            <div class="card-body pb-0">
              <ul class="p-0 m-0">
                <li class="d-flex mb-3">
                  <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                    <div v-if="caution != null" class="card-body border-top pt-4">
                      <CautionDashTable :caution="caution" />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-12">
        <div class="card">
          <div class="card card-border-shadow-primary">
            <div class="card-header d-flex align-items-center">
              <div class="me-auto">
                <h5 class="fw-bold mb-1">Liste des projets</h5>
                <small class="fw-bold mb-1 text-muted">Liste de tous les projets</small>
              </div>
            </div>
            <div v-if="projects != null" class="card-body border-top pt-4">
              <ProjectDash :projects="projects" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
