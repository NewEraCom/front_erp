<script setup>
import { ref, computed } from 'vue';
import { helpers, formatters } from '@/utils';
import { LoaderView } from '@/ui';
import { useAuthStore } from '@/stores';

const store = useAuthStore();

const employee = ref(computed(() => store.getUser));

const env = import.meta.env.VITE_UPLOADS_URL;

</script>

<template>
    <div class="flex-grow-2 container-md mt-3 mb-5" v-if="employee">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link :to="{ name: 'DashboardPortal' }">Dashboard</router-link>
                </li>
                <li class="breadcrumb-item active">Informations personnelles</li>
            </ol>
        </nav>

        <div class="row gy-4 mb-4" v-if="employee">
            <div class="col-12 d-flex align-items-center">
                <h6 class="m-0">Informations personnelles</h6>
                <button class="btn btn-outline-primary btn-sm ms-auto" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#personalInfo" aria-controls="offcanvasEnd">
                    <i class="ti ti-pencil me-2"></i>
                    Modifier
                </button>
            </div>
        </div>
        <div class="col-12 mt-4">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-12 d-flex justify-content-between align-items-center">
                            <div>
                                <h6 class="text-primary">Compte bancaire</h6>
                                <span class="fw-medium">RIB : {{ formatters.formatRIB(String(employee.rib)) }}</span>
                            </div>
                            <div>
                                <img :src="helpers.bankName(employee.bank_name)[0]" height="92px" width="100px"
                                    style="object-fit: contain" />
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-12 d-flex justify-content-between align-items-center">
                            <div>
                                <h6 class="text-primary">Matricule CNSS</h6>
                                <span class="fw-medium">{{ employee.cnss ?? 'N/A' }}</span>
                            </div>
                            <div>
                                <img src="@/assets/img/brands/logo_cnss.jpeg" height="92px" width="80px"
                                    style="object-fit: contain" />
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class=" row">
                        <div class="col-12">
                            <h6 class="text-primary">Etat Civil</h6>
                            <span class="fw-medium">{{ employee.situation_familiale ?? 'N/A' }}</span>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-12">
                            <h6 class="text-primary">Numéro CIN</h6>
                            <span class="fw-medium">{{ employee.cin ?? 'N/A' }}</span>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-12">
                            <h6 class="text-primary">Date de naissance</h6>
                            <span class="fw-medium">{{ employee.date_of_birth ?? 'N/A' }}</span>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-12">
                            <h6 class="text-primary">Genre</h6>
                            <span class="fw-medium">{{ employee.sexe ? formatters.firstUpperCase(employee.sexe) :
                                'N/A'
                                }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 d-flex align-items-center mt-4">
            <h6 class="m-0">Adresse</h6>
            <button class="btn btn-outline-primary btn-sm ms-auto" data-bs-toggle="offcanvas"
                data-bs-target="#addressInfo" aria-controls="offcanvasEnd">
                <i class="ti ti-pencil me-2"></i>
                Modifier
            </button>
        </div>
        <div class="col-12 mt-4">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-12">
                            <h6 class="text-primary">Adresse du domicile</h6>
                            <p class="mb-2 fw-medium">{{ employee.address ?? 'N/A' }}</p>
                            <p class="mb-0 fw-medium">{{ employee.city }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 d-flex align-items-center mt-4">
            <h6 class="m-0">Coordonnées</h6>
            <button class="btn btn-outline-primary btn-sm ms-auto" data-bs-toggle="offcanvas"
                data-bs-target="#coordonneesInfo" aria-controls="offcanvasEnd">
                <i class="ti ti-pencil me-2"></i>
                Modifier
            </button>
        </div>
        <div class="col-12 mt-4">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-12">
                            <h6 class="text-primary">Adresse email de travail</h6>
                            <span class="fw-medium">{{ employee.user.email ?? 'N/A' }}</span>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-12">
                            <h6 class="text-primary">Adresse email personnel</h6>
                            <span class="fw-medium">{{ employee.email ?? 'N/A' }}</span>
                        </div>
                    </div>
                    <hr>

                    <div class="row">
                        <div class="col-12">
                            <h6 class="text-primary">Téléphone de travail</h6>
                            <span class="fw-medium">{{ formatters.phoneNumber(employee.flotte) ?? 'N/A' }}</span>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-12">
                            <h6 class="text-primary">Téléphone personnel</h6>
                            <span class="fw-medium">{{ formatters.phoneNumber(employee.phone_no) ?? 'N/A' }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 d-flex align-items-center mt-4">
            <h6 class="m-0">Documents</h6>
            <button class="btn btn-outline-primary btn-sm ms-auto" data-bs-toggle="offcanvas"
                data-bs-target="#uploadDocument" aria-controls="offcanvasEnd">
                <i class="ti ti-pencil me-2"></i>
                Modifier
            </button>
        </div>
        <div class="col-12 mt-4">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-12">
                            <h6 class="text-primary">Copie de la CIN recto</h6>
                            <a :href="env + 'uploads/documents/' + employee.copie_cin" class="fw-medium" target="_blank"
                                v-if="employee.copie_cin != 'null'"> <i class="ti ti-upload me-2"></i> {{
                                    employee.copie_cin }}</a>
                            <span v-else>
                                Copie de la CIN recto non disponible
                            </span>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-12">
                            <h6 class="text-primary">Copie de la CIN verso</h6>
                            <a :href="env + 'uploads/documents/' + employee.copie_cin_verso" class="fw-medium"
                                target="_blank" v-if="employee.copie_cin_verso != 'null'"> <i
                                    class="ti ti-upload me-2"></i> {{
                                        employee.copie_cin_verso }}</a>
                            <span v-else>
                                Copie de la CIN verso non disponible
                            </span>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-12">
                            <h6 class="text-primary">Copie de CNSS</h6>
                            <a :href="env + 'uploads/documents/' + employee.copie_cnss" class="fw-medium"
                                target="_blank" v-if="employee.copie_cnss != 'null'"> <i class="ti ti-upload me-2"></i>
                                {{
                                    employee.copie_cnss }}</a>
                            <span v-else>
                                Copie de CNSS non disponible
                            </span>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-12">
                            <h6 class="text-primary">Copie de RIB</h6>
                            <a :href="env + 'uploads/documents/' + employee.copie_rib" class="fw-medium" target="_blank"
                                v-if="employee.copie_rib != 'null'"> <i class="ti ti-upload me-2"></i>
                                {{
                                    employee.copie_rib }}</a>
                            <span v-else>
                                Copie de RIB non disponible
                            </span>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-12">
                            <h6 class="text-primary">Copie apptitude médicale</h6>
                            <a :href="env + 'uploads/documents/' + employee.copie_appt" class="fw-medium"
                                target="_blank" v-if="employee.copie_appt != 'null'"> <i class="ti ti-upload me-2"></i>
                                {{
                                    employee.copie_appt }}</a>
                            <span v-else>
                                Copie de RIB non disponible
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <LoaderView v-else />
</template>

<style>
.btn-link {
    color: rgb(166, 0, 0);
    text-decoration: none;
    cursor: pointer;
    border: none;
    font-weight: 700;
}

.container-md {
    padding-right: 0rem;
    padding-left: 0rem;
    width: 100% !important;
}
</style>