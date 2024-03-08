<script setup>
import { ref } from 'vue';
import { pmService } from '@/services';
const props = defineProps({
    id: {
        type: Number,
        required: true
    }
});

const submit = async () => {
    if (lots.value == 0 || lots.value == null) return alert('Veuillez entrer le nombre de lots');

    isLoading.value = true;

    const formData = new FormData();
    formData.append('id', props.id);
    formData.append('lots', lots.value);
    formData.append('caution', caution.value);
    formData.append('montant_marche', montantMarhce.value);
    formData.append('localite', localite.value);
    formData.append('caution_group', check.value);

    await pmService.addLots(formData).then(() => {
        isLoading.value = false;
        $('#add-lots').modal('hide');
    });
};
</script>

<template>
    <div></div>
</template>
