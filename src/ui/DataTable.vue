<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { formater, helpers } from '@/utils';

const role = localStorage.getItem('role');
type Item = {
    [key: string]: any; // This allows any number of properties with any type
}

type ActionButton = {
    icon?: string;
    class: string;
    type?: string;
    text?: string;
    onClick: (item: Item) => void;
};

const props = defineProps<{
    items: Item[],
    headers: Array<{ text: string, value: string, isComplex?: boolean, type?: string }>,
    buttonType?: string,
    pageSize: number,
    disabled?: string,
    actionsConfig: ActionButton[];
}>();

const currentPage = ref(1);
const sortKey = ref('');
const sortOrder = ref('asc');

const sortedItems = computed(() => {
    return [...props.items].sort((a, b) => {
        let modifier = 1;
        if (sortOrder.value === 'desc') modifier = -1;
        if (a[sortKey.value] < b[sortKey.value]) return -1 * modifier;
        if (a[sortKey.value] > b[sortKey.value]) return 1 * modifier;
        return 0;
    });
});

const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * props.pageSize;
    const end = start + props.pageSize;
    return sortedItems.value.slice(start, end);
});

const totalPageNumbers = computed(() => {
    return Math.ceil(props.items.length / props.pageSize);
});

function sortTable(key: string) {
    if (sortKey.value === key) {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    } else {
        sortKey.value = key;
        sortOrder.value = 'asc';
    }
}

function changePage(page: number) {
    currentPage.value = page;
}

const visiblePageNumbers = computed(() => {
    const pages = [];
    const totalPages = totalPageNumbers.value;
    const currentPageNum = currentPage.value;
    const pageRangeDisplayed = 2; // Number of pages shown before and after the current page

    let startPage = currentPageNum - pageRangeDisplayed;
    let endPage = currentPageNum + pageRangeDisplayed;

    if (startPage <= 1) {
        startPage = 1;
        endPage = Math.min(startPage + pageRangeDisplayed * 2, totalPages);
    }

    if (endPage >= totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - pageRangeDisplayed * 2);
    }

    // Ensure startPage is always 1 or more
    startPage = Math.max(startPage, 1);

    for (let number = startPage; number <= endPage; number++) {
        pages.push(number);
    }

    return pages;
});

watch(() => props.pageSize, () => {
    currentPage.value = 1;
});

const getFileUrl = (attachment) => {
    console.log(attachment);

    return helpers.baseUrl() + `uploads/${attachment}`;
};
</script>

<template>
    <div>
        <table class="table" id="data-table">
            <thead class="table-light">
                <tr>
                    <th v-for="(header, index) in headers" @click="sortTable(header.value)" :key="header.value"
                        :class="index == 0 ? 'text-start' : 'text-center'" style="cursor: pointer" class="fw-bold">
                        {{ header.text }}
                        <span v-if="sortKey === header.value">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
                    </th>
                    <th></th>
                </tr>
            </thead>
            <tbody v-if="paginatedItems.length > 0">
                <tr v-for="item in paginatedItems" :key="item.id">
                    <template v-for="(header, index) in headers" :key="header.value">
                        <td v-if="header.isComplex && header.type === 'employee'"
                            :class="index == 0 ? 'text-start' : 'text-center'">
                            <router-link :to="{ name: 'ProfileEmployee', params: { id: item.id } }">
                                <h6 class="mb-1 fw-bold text-primary">{{ item.first_name + ' ' + item.last_name }}</h6>
                            </router-link>
                            <small class="fw-bold text-muted">Matricule : {{ item.matricule }}</small>
                        </td>
                        <td v-if="header.isComplex && header.type === 'fullname'"
                            :class="index == 0 ? 'text-start' : 'text-center'">
                            <router-link :to="{ name: 'StagiaireProfile', params: { id: item.id } }">
                                <h6 class="mb-1 fw-bold text-primary">{{ item.prenom + ' ' + item.nom }}</h6>
                            </router-link>
                            <small class="fw-bold text-muted">Email : {{ item.email }}</small>
                        </td>
                        <td v-if="header.isComplex && header.type === 'workers'"
                            :class="index == 0 ? 'text-start' : 'text-center'">
                            <router-link :to="{ name: 'WorkerEmployee', params: { id: item.id } }">
                                <h6 class="mb-1 fw-bold text-primary">{{ item.first_name + ' ' + item.last_name }}</h6>
                            </router-link>
                            <small class="fw-bold text-muted">Matricule : {{ item.matricule }}</small>
                        </td>
                        <td v-if="header.isComplex && header.type === 'project'"
                            :class="index == 0 ? 'text-start' : 'text-center'">
                            <!-- <h6 class="mb-1 fw-bold">{{ item.name }}</h6> -->
                            <small class="fw-bold text-muted">Code : {{ item.project.code }}</small>
                        </td>
                        <td v-if="header.isComplex && header.type === 'preProjects'">
                            <router-link :to="{
                        name: 'PreProjectDetail',
                        params: { id: item.id }
                    }">
                                <h6 class="mb-1 text-primary fw-bold">{{ item.maitre_ouvrage }}</h6>
                            </router-link>
                            <small class="fw-bold text-muted">
                                Code : {{ helpers.limitedClientName(item.project_code) }}
                                <i v-if="item.type_project != 'simple' &&
                        item.lots.length == 0
                        " class="ti ti-alert-circle-filled text-danger" />
                            </small>
                        </td>
                        <td v-if="header.isComplex && header.type === 'preproject'"
                            :class="index == 0 ? 'text-start' : 'text-center'">
                            <h6 class="mb-1 fw-bold">{{ item.pre_project.maitre_ouvrage }}</h6>
                            <small class="fw-bold text-muted">Code : {{ item.pre_project.project_code }}</small>
                        </td>
                        <td v-if="header.isComplex && header.type === 'leave'"
                            :class="index == 0 ? 'text-start' : 'text-center'">
                            <div v-if="role == helpers.roles.RH">

                                <router-link :to="{ name: 'ProfileEmployee', params: { id: item.employe.id } }">
                                    <h6 class="mb-1 fw-bold text-primary">{{ item.employe.first_name + ' ' +
                        item.employe.last_name
                                        }}</h6>
                                </router-link>
                                <small class="fw-bold text-muted">Matricule : {{ item.employe.matricule }}</small>
                            </div>
                            <div v-else>
                                <h6 class="mb-1 fw-bold text-primary">{{ item.employe.first_name + ' ' +
                        item.employe.last_name
                                    }}</h6>
                                <small class="fw-bold text-muted">Matricule : {{ item.employe.matricule }}</small>

                            </div>
                        </td>
                        <td v-if="header.isComplex && header.type === 'SousTraitant'"
                            :class="index == 0 ? 'text-start' : 'text-center'">
                            <router-link :to="{ name: 'ProfileSoustraitant', params: { id: item.id } }">
                                <h6 class="mb-1 fw-bold text-primary">{{ item.raison_social
                                    }}</h6>
                            </router-link>

                        </td>
                        <td v-if="header.isComplex && header.type === 'recrute'"
                            :class="index == 0 ? 'text-start' : 'text-center'">

                            <h6 class="mb-1 fw-bold">{{ item.user.employee.first_name + ' '
                        + item.user.employee.last_name }}</h6>
                        </td>
                        <td v-if="!header.isComplex" :class="index == 0 ? 'text-start' : 'text-center'">
                            <span v-if="header.type == 'badge'">
                                <small class="fw-bold" :class="helpers.returnBadge(item[header.value])[0]">{{
                        helpers.returnBadge(item[header.value])[1] }}
                                </small>
                            </span>
                            <small v-else>
                                <span v-if="header.type === 'datetime'">
                                    {{ formater.dateTime(item[header.value]) }}
                                </span>
                                <span v-if="header.type === 'gsm' && header.value === 'date_affectation'">
                                    {{ item.pivot.date_debut }}
                                </span>
                                <span v-if="header.type === 'gsm' && header.value === 'date_retour'">
                                    {{ item.pivot.date_fin ?? 'N/A' }}
                                </span>
                                <span v-if="header.type === 'meq' && header.value === 'kilometrage'">
                                    {{ item.pivot.kilometrage }} KM
                                </span>
                                <span v-if="header.type === 'meq' && header.value === 'service_date'">
                                    {{ item.pivot.service_date }}
                                </span>
                                <span v-if="header.type === 'meq' && header.value === 'next_service'">
                                    {{ item.pivot.next_service }}
                                </span>
                                <span v-if="header.type === 'date'">
                                    {{ formater.date(item[header.value]) }}
                                </span>
                                <span v-if="header.type === 'text'">
                                    {{ formater.limitText(String(item[header.value]), 40) }}
                                </span>
                                <span v-if="header.type === 'jours'">
                                    {{ formater.limitText(String(item[header.value]), 40) }} Jrs
                                </span>
                                <span v-if="header.type === 'item'">
                                    {{ item.item.designation }}
                                </span>
                                <span v-if="header.type === 'project'">
                                    {{ item.project.code }}
                                </span>
                                <span v-if="header.type === 'preproject'">
                                    {{ item.preproject.project_code }}
                                </span>
                                <span v-if="header.type === 'currency'">
                                    {{ formater.number(item[header.value]) }} MAD
                                </span>
                                <span v-if="header.type === 'km'">
                                    {{ formater.number(item[header.value]) }} KM
                                </span>
                                <span v-if="header.type === 'number'">
                                    {{ formater.number(item[header.value]) }}
                                </span>
                                <span v-if="header.type === 'days'">
                                    {{ item[header.value] > 1 ? item[header.value] + ' Jours' :
                        item[header.value] + 'Jour'
                                    }}
                                </span>
                                <span v-if="header.type === 'time'">
                                    {{ formater.time(String(item[header.value])) }}
                                </span>
                                <span v-if="header.type === 'created_by'">
                                    {{ item.created_by.employee.first_name + ' ' + item.created_by.employee.last_name }}
                                </span>
                                <span v-if="header.type === 'achat'">
                                    N° {{ item.achat.n_order }}
                                </span>
                                <span v-if="header.type === 'bdc'">
                                    N° {{ item.bon_commande.num }}
                                </span>
                                <span v-if="header.type === 'phone'">
                                    {{ formater.phoneNumber(item[header.value]) }}
                                </span>
                                <span v-if="header.type === 'facture'">
                                    <small v-if="item[header.value] == '-' || item[header.value] != null">Aucun
                                        facture
                                    </small>
                                    <button v-else class="btn btn-label-primary btn-sm">
                                        <i class="ti ti-download me-2"></i> Télécharger la facture
                                    </button>
                                </span>
                                <span v-if="header.type === 'attachement'">
                                    <small v-if="item[header.value] == '-'">Aucun Attachement</small>
                                    <a v-else class="btn btn-label-primary btn-sm" target="_blank"
                                        :href="getFileUrl(item[header.value])">
                                        <i class="ti ti-download me-2"></i> Télécharger l'attachement
                                    </a>
                                </span>
                                <span v-if="header.type === 'stock'">
                                    <span :class="helpers.returnStockAlert(item[header.value], item.alert)[0]">
                                        {{ helpers.returnStockAlert(item[header.value], item.alert)[1] }}
                                    </span>
                                </span>
                                <span v-if="header.type === 'soustraitant'">
                                    {{ item[header.value].raison_social }}
                                </span>

                                <span v-if="header.type === 'soustraitant_facture'">
                                    {{ item.bon_commande.soustraitant.raison_social }}
                                </span>
                                <span v-if="header.type === 'workingHour'">
                                    <span class="fw-bold"
                                        :class="helpers.calculateDifference(item, item.employe.working_hours)[2]">
                                        {{ helpers.calculateDifference(item, item.employe.working_hours)[0] }}
                                    </span>
                                </span>
                                <span v-if="header.type === 'workingHourCustom'">
                                    <span class="fw-bold"
                                        :class="helpers.calculateDifference(item, item.employe.working_hours)[2]">
                                        {{ helpers.calculateDifference(item, item.employe.working_hours)[0] }}
                                    </span>
                                </span>
                                <span v-if="header.type === 'caisse'">
                                    <span v-if="item.operation == 'entree'">
                                        <h6 class="mb-1 fw-bold">{{ item.emetteur }}</h6>
                                        <small>Date de l'opération : {{ formater.date(item.created_at) }}</small>
                                    </span>
                                    <span v-else>
                                        <h6 class="mb-1 fw-bold">{{ item.recepteur.first_name + ' ' +
                        item.recepteur.last_name }}</h6>
                                        <small>Matricule : NEC-{{ item.recepteur.matricule }}</small>
                                    </span>
                                </span>
                                <span v-if="header.type == 'project_manager'">
                                    {{ item.preproject.project_manager.employee.first_name + ' ' +
                        item.preproject.project_manager.employee.last_name
                                    }}
                                </span>
                                <span v-if="header.type == 'client'">
                                    <router-link to="/">
                                        <h6 class="mb-1 fw-bold text-primary">{{ formater.limitText(item.raison_social,
                        30)
                                            }}
                                        </h6>
                                    </router-link>
                                    <small class="fw-bold text-muted">Numéro RC : {{ item.num_rc ?? 'N/A' }}</small>
                                </span>

                                <span v-if="header.type == 'percentage'">
                                    {{ formater.number((item.suivie / item.qte) * 100) }} %
                                </span>
                                <span v-if="header.type === 'test'">
                                    {{ item }}
                                </span>
                            </small>
                        </td>
                        <td v-if="header.isComplex && header.type === 'tier'"
                            :class="index == 0 ? 'text-start' : 'text-center'">
                            <!-- <h6 class="mb-1 fw-bold">{{ item.name }}</h6> -->
                            <small class="fw-bold text-muted">Code : {{ item.tier.commercial_name }}</small>
                        </td>
                        <td v-if="header.isComplex && header.type === 'carnet'"
                            :class="index == 0 ? 'text-start' : 'text-center'">
                            <h6 class="mb-1 fw-bold">{{ item.carnet.numero }}</h6>
                            <small class="fw-bold text-muted">RIB : {{ item.carnet.compte_bancaire.rib }}</small>
                        </td>
                        <td class="text-center" v-if="header.isComplex && header.type === 'date_echantillion'">
                            <i v-if="item.date_echantillion != null"
                                class="ti ti-square-rounded-check-filled text-success f-26"></i>
                            <i v-else class="ti ti-square-rounded-x-filled text-danger f-26"></i>
                        </td>
                        <td class="text-center" v-if="header.isComplex && header.type === 'date_visite'">
                            <i v-if="item.date_visite != null"
                                class="ti ti-square-rounded-check-filled text-success f-26"></i>
                            <i v-else class="ti ti-square-rounded-x-filled text-danger f-26"></i>
                        </td>
                    </template>

                    <td v-if="buttonType == 'simple'" class="text-center" id="action-column">
                        <button v-for="  action   in   actionsConfig  " :key="action.icon" class="btn me-2"
                            :class="action.type == 'delete' ? (item.status == disabled ? action.class : 'btn btn-secondary btn-sm') : action.class"
                            @click="action.onClick(item)"
                            :disabled="action.type == 'delete' ? (item.status != disabled) : false">
                            <i v-if="action.type == 'potential'"
                                :class="item.potentiel === '1' ? 'ti ti-bookmark-filled' : 'ti ti-bookmark'"></i>
                            <i v-else :class="action.icon"></i>
                        </button>
                    </td>
                    <td v-else class="text-center" id="action-column">
                        <div class="dropdown" v-if="actionsConfig.length > 0">
                            <button class="btn p-0" type="button" id="earningReportsId" data-bs-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                <i class="ti ti-dots-vertical ti-sm text-muted"></i>
                            </button>
                            <div class="dropdown-menu dropdown-menu-end" aria-labelledby="earningReportsId" style="">
                                <button v-for="  action   in   actionsConfig  " :key="action.icon" class="dropdown-item"
                                    :class="action.type == 'delete' ? (item.status == disabled ? action.class : 'text-secondary') : action.class"
                                    @click="action.onClick(item)"
                                    :disabled="action.type == 'delete' ? (item.status != disabled) : false">
                                    {{ action.text }}
                                </button>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
            <tbody v-else>
                <tr>
                    <td :colspan="headers.length + 1" class="text-center">Aucun enregistrements correspondants trouvés
                    </td>
                </tr>
            </tbody>
        </table>
        <nav aria-label="Page navigation" class="mt-4">
            <ul class="pagination">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <a class="page-link" href="#" @click.prevent="changePage(1)">
                        <i class="ti ti-chevrons-left"></i>
                    </a>
                </li>
                <li class="page-item" v-for="    page    in    visiblePageNumbers    " :key="page"
                    :class="{ active: page === currentPage }">
                    <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPageNumbers }">
                    <a class="page-link" href="#" @click.prevent="changePage(totalPageNumbers)">
                        <i class="ti ti-chevrons-right"></i>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>
