<script setup>
import { ref, computed } from 'vue';
import { LoaderView } from '@/ui';
import { useAuthStore } from '@/stores';
import { formatters, helpers } from '@/utils';

const store = useAuthStore();

const employee = ref(computed(() => store.getUser));

const env = import.meta.env.VITE_UPLOADS_URL;

</script>

<template>
    <div class="flex-grow-2 container-md mt-3 mb-5">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link :to="{ name: 'DashboardPortal' }">Dashboard</router-link>
                </li>
                <li class="breadcrumb-item active">Salaires et avantages</li>
            </ol>
        </nav>
        <div class="row" v-if="employee">
            <div class="col-12">
                <div class="card">
                    <div class="card-body d-flex align-items-center">
                        <div class="hearder-border ms-auto me-auto d-flex flex-column justify-content-center">
                            <small>{{ employee.salary ? formatters.number(employee.salary) : '0' }} MAD</small>
                            <small>Salaire par mois</small>
                            <small class="mt-4">{{ helpers.checkIfEmpty(employee.working_hours_per_week) == null ? '0' :
                                employee.working_hours_per_week }} heures</small>
                            <small>par semaine</small>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12 mt-4">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12">
                                <h6 class="text-primary">Temps de travail du jour</h6>
                                <span class="fw-medium">{{ employee.working_hours ? employee.working_hours + ' heures' :
                                    'N/A'
                                    }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 mt-4">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12">
                                <h6 class="text-primary">Solde congé</h6>
                                <span class="fw-medium">{{ employee.solde_conge ? employee.solde_conge + ' Jours' :
                                    'N/A'
                                    }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12 mt-4">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12">
                                <h6 class="text-primary">Prime de transport</h6>
                                <span class="fw-medium">{{ employee.prime_transport ?
                                    formatters.number(employee.prime_transport) : 0 }} <small>MAD</small> </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12 mt-4">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12">
                                <h6 class="text-primary">Bonus de performance</h6>
                                <span class="fw-medium">{{ employee.bonus ? formater.number(employee.bonus) : 0 }}
                                    <small>MAD</small></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12 mt-4">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12">
                                <h6 class="text-primary">CNSS éligible</h6>
                                <span class="fw-medium d-flex align-items-center">
                                    <span class="me-2 f-18 ti"
                                        :class="employee.cnss ? 'ti-circle-check text-success' : 'ti-exclamation-circle text-warning'"></span>
                                    {{ employee.cnss ? 'Oui' : 'Non' }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<style>
.btn-link {
    color: rgb(166, 0, 0);
    text-decoration: none;
    cursor: pointer;
    border: none;
    font-weight: 700;

}

.hearder-border {
    border: 15px solid #39465C;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 700;
    color: #121829;
    width: 200px;
    height: 200px;

}

.f-18 {
    font-size: 28px;
}
</style>