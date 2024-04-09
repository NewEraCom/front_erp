<script setup>
import { computed, onMounted, ref } from 'vue';
import {pmService , rhService} from '@/services';
import { useRhStore } from '@/store';
import {CustomSelect} from '@/ui';

const rhStore = useRhStore();
const employees = ref(computed(()=> rhStore.employees));
const props = defineProps({
    id: {
        type: Number,
        required: true
    }
});
onMounted(async()=>{
 await rhService.getEmployees();
});

const isLoading = ref(false);
const formData = ref({
    employee_id: '',
    
});

const submit = async () => {
    isLoading.value = true;
    formData.value.employee_id = formData.value.employee_id.key ;
    await pmService.markChiffrageDone(props.id,formData.value)
        .then(() => {
            isLoading.value = false;
            $('#close-chiffrage').modal('hide');
        })
        .catch((error) => {
            console.log(error);
        });
};
</script>

<template>
    <form @submit.prevent="submit">
        <div class="modal-body ">
            <input id="deleteInput" type="text" hidden />
            <p>Etes-vous sûr de vouloir faire comme terminé ?</p>
            <div v-if="employees != null" class="col-12 mb-3">
                        <CustomSelect v-model="formData.employee_id" placeholder="Choisir un employee" label="Employee"
                            :data="employees.filter(item => item.status == 1).map((item) => ({
            key: item.id,
            value: item.first_name + ' ' + item.last_name
        }))
            " />
                    </div>
        </div>
        <div class="modal-footer ">
            <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
                Fermer
            </button>
            <button type="submit" class="btn btn-primary" :disabled="isLoading">
                <span v-if="isLoading" class="d-flex align-items-center">
                    <div class="spinner-border spinner-border-sm text-white me-2" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </span>
                <span v-else>Oui, Marque comme terminé</span>
            </button>
        </div>
    </form>
</template>
