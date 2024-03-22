<script setup lang="ts">
import { ref } from 'vue';
import { DataTable } from '@/ui';
import { rhService } from '@/services';

const props = defineProps({
    paies: {
        type: Array,
        required: true,
    },
});

const headers = [
    { text: 'Mois', value: 'mounth', type: 'text' },
    { text: 'Masa Salarial', value: 'total_salaire', type: 'currency' },
    { text: 'Total prime', value: 'total_prime', type: 'currency' },
    { text: 'Total d\'employés', value: 'total_employee', type: 'text' },
    { text: 'status', value: 'status', type: 'badge' },

];

const actionsConfig = [
    { icon: 'ti ti-download', class: 'btn bg-label-primary btn-sm', onClick: (item: any) => PrintPay(item.mounth) },
    // { icon: 'ti ti-trash-filled', class: 'btn btn-danger btn-sm', onClick: (item: any) => deleteItem(item) },
];

const detailsItem = (item: any) => {
    console.log(item);
};

// const deleteItem = (item: any) => {
//     console.log('Delete item', item);
// };

const filteredData = ref(props.paies);

const searchQuery = ref('');
const statusQuery = ref('-');
const itemPerPage = ref(15);

const filter = () => {
    filteredData.value = props.paies.filter((item: any) => {
        const combinedFields = `${item.mounth}`.toLowerCase();
        const searchWords = searchQuery.value.toLowerCase().split(' ');
        return searchWords.every(word => combinedFields.includes(word)) &&
            (statusQuery.value === '-' || item.status === statusQuery.value);
    });

};
const PrintPay = async (mounth) => {
    const monthNames = {
        Janvier: 'January',
        Février: 'February',
        Mars: 'March',
        Avril: 'April',
        Mai: 'May',
        Juin: 'June',
        Juillet: 'July',
        Août: 'August',
        Septembre: 'September',
        Octobre: 'October',
        Novembre: 'November',
        Décembre: 'December'
    };
    const [monthName, year] = mounth.split(' ');
    const englishMonthName = monthNames[monthName];
    const date = new Date(`${englishMonthName} 1 ${year}`);
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    console.log(formattedDate);

    try {
        let data = {
            date: formattedDate,
            mounth: mounth
        };
        await rhService.PayExport(data)
            .then((res) => {
                let blob;
                if (res instanceof Blob) {
                    blob = res;
                } else {
                    blob = new Blob([res]);
                }
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = `Pay_${formattedDate}.xlsx`;
                link.click();
            })
            .catch(() => {
                isLoading.value = false;
            });
    } catch (error) { }
};


</script>
<template>
    <div>
        <div class="row mb-4">
            <div class="col-12">
                <div class="d-flex align-items-center">
                    <input v-model="searchQuery" type="search" class="form-control w-240 me-2"
                        placeholder="Rechercher..." @input="filter" />
                    <div class="d-flex align-items-center ms-0">
                        <select v-model="statusQuery" class="form-select ms-2 me-2 w-180" @change="filter">
                            <option value="-">Tout</option>
                            <option value="open">Ouvert</option>
                            <option value="closed">Fermé</option>
                        </select>
                    </div>
                    <div class="d-flex align-items-center ms-auto">
                        <label for="">Afficher</label>
                        <select v-model="itemPerPage" name="" class="form-select ms-2 me-2 w-120">
                            <option value="15">15</option>
                            <option value="30">30</option>
                            <option value="45">45</option>
                            <option value="60">60</option>
                        </select>
                    </div> 
                </div>
            </div>
        </div>
        <DataTable :items="filteredData" :headers="headers" :page-size=itemPerPage :actionsConfig="actionsConfig"
            button-type="simple" />
    </div>
</template>
<style>
.w-240 {
    width: 240px;
}
</style>
