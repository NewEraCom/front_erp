<script setup lang="ts">
import { ref, computed } from 'vue';
import { formater, helpers } from '@/utils';

type Item = {
    [key: string]: any; // This allows any number of properties with any type
}

type ActionButton = {
    icon: string;
    class: string;
    onClick: (item: Item) => void;
};

const props = defineProps<{
    items: Item[],
    headers: Array<{ text: string, value: string, isComplex?: boolean, type?: string }>,
    pageSize: number,
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


</script>

<template>
    <div>
        <table class="table">
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
                <tr v-for="item in  paginatedItems " :key="item.id">
                    <template v-for="(header, index) in  headers " :key="header.value">
                        <td v-if="header.isComplex && header.type === 'employee'"
                            :class="index == 0 ? 'text-start' : 'text-center'">
                            <router-link :to="{ name: 'ProfileEmployee', params: { id: item.id } }">
                                <h6 class="mb-1 fw-bold text-primary">{{ item.first_name + ' ' + item.last_name }}</h6>
                            </router-link>
                            <small class="fw-bold text-muted">Matricule : {{ item.matricule }}</small>
                        </td>
                        <td v-if="header.isComplex && header.type === 'fullname'"
                            :class="index == 0 ? 'text-start' : 'text-center'">
                            <router-link to="/">
                                <h6 class="mb-1 fw-bold text-primary">{{ item.prenom + ' ' + item.nom }}</h6>
                            </router-link>
                            <small class="fw-bold text-muted">Email : {{ item.email }}</small>
                        </td>
                        <td v-if="header.isComplex && header.type === 'workers'"
                            :class="index == 0 ? 'text-start' : 'text-center'">
                            <router-link to="/">
                                <h6 class="mb-1 fw-bold text-primary">{{ item.first_name + ' ' + item.last_name }}</h6>
                            </router-link>
                            <small class="fw-bold text-muted">Matricule : {{ item.matricule }}</small>
                        </td>
                        <td v-if="header.isComplex && header.type === 'project'"
                            :class="index == 0 ? 'text-start' : 'text-center'">
                            <!-- <h6 class="mb-1 fw-bold">{{ item.name }}</h6> -->
                            <small class="fw-bold text-muted">Code : {{ item.project.code }}</small>
                        </td>
                        <td v-if="header.isComplex && header.type === 'preproject'"
                            :class="index == 0 ? 'text-start' : 'text-center'">
                            <h6 class="mb-1 fw-bold">{{ item.name }}</h6>
                            <small class="fw-bold text-muted">Matricule : {{ item.matricule }}</small>
                        </td>
                        <td v-if="header.isComplex && header.type === 'leave'"
                            :class="index == 0 ? 'text-start' : 'text-center'">
                            <router-link :to="{ name: 'ProfileEmployee', params: { id: item.employe.id } }">
                                <h6 class="mb-1 fw-bold text-primary">{{ item.employe.first_name + ' ' +
                                    item.employe.last_name
                                }}</h6>
                            </router-link>
                            <small class="fw-bold text-muted">Matricule : {{ item.employe.matricule }}</small>
                        </td>
                        <td v-if="header.isComplex && header.type === 'recrute'"
                            :class="index == 0 ? 'text-start' : 'text-center'">

                            <h6 class="mb-1 fw-bold">{{ item.user.employee.first_name + ' '
                                + item.user.employee.last_name }}</h6>
                        </td>
                        <td v-if="!header.isComplex" :class="index == 0 ? 'text-start' : 'text-center'">
                            <span v-if="header.type == 'badge'">
                                <small class="fw-bold" :class="helpers.returnBadge(String(item[header.value]))[0]">{{
                                    helpers.returnBadge(String(item[header.value]))[1] }}
                                </small>
                            </span>
                            <small v-else>
                                <span v-if="header.type === 'datetime'">
                                    {{ formater.dateTime(item[header.value]) }}
                                </span>
                                <span v-if="header.type === 'date'">
                                    {{ formater.date(item[header.value]) }}
                                </span>
                                <span v-if="header.type === 'text'">
                                    {{ item[header.value] }}
                                </span>
                                <span v-if="header.type === 'project'">
                                    {{ item.project.code }}
                                </span>
                                <span v-if="header.type === 'currency'">
                                    {{ formater.number(item[header.value]) }} MAD
                                </span>
                                <span v-if="header.type === 'days'">
                                    {{ item[header.value] > 1 ? item[header.value] + ' Jours' : item[header.value] + ' Jour'
                                    }}
                                </span>
                                <span v-if="header.type === 'time'">
                                    {{ formater.time(String(item[header.value])) }}
                                </span>
                                <span v-if="header.type === 'phone'">
                                    {{ formater.phoneNumber(item[header.value]) }}
                                </span>
                                <span v-if="header.type === 'soustraitant'">
                                    {{ formater.phoneNumber(item.soustraitant.raison_social) }}
                                </span>
                                <span v-if="header.type === 'workingHour'">
                                    <span class="fw-bold"
                                        :class="helpers.calculateDifference(item, item.employe.working_hours)[2]">
                                        {{ helpers.calculateDifference(item, item.employe.working_hours)[0] }}
                                    </span>
                                </span>
                            </small>
                        </td>
                    </template>
                    <td class="text-center">
                        <!-- Render action buttons based on actionsConfig -->
                        <button v-for=" action  in  actionsConfig " :key="action.icon" class="btn me-2"
                            :class="action.class" @click="action.onClick(item)">
                            <i :class="action.icon"></i>
                        </button>
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
                <li class="page-item" v-for=" page in visiblePageNumbers " :key="page"
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
