<script setup lang="ts">
import { ref } from 'vue';
import { Modal } from '@/ui';
import IamLogo from '@/assets/img/iam.jpg';
import InwiLogo from '@/assets/img/inwi.png';
import OrangeLogo from '@/assets/img/orange.png';

const formData = ref({
    operator: '',
    type: '-',
    num: '',
    date_start: '',
    price: '',
    description: ''
});


const message = ref(null);
const isLoading = ref(false);
const OPERATEUR = [
    { name: 'IAM', logo: IamLogo },
    { name: 'INWI', logo: InwiLogo },
    { name: 'ORANGE', logo: OrangeLogo }
];

const submit = async () => {
    isLoading.value = true;

};

</script>


<template>
    <Modal id="newSubscription" title="Nouvel abonnement" size="modal-md">
        <form class="needs-validation" @submit.prevent="submit">
            <div class="modal-body">
                <label class="mb-3" for="">Operateur :</label>
                <div class="row mb-4">
                    <div v-for="(item, index) in OPERATEUR" :key="index" class="col-3 text-start">
                        <span class="custom-option-body">
                            <img :src="item.logo" :alt="item.name" width="100" class="img-fluid"
                                :class="formData.operator === item.name ? 'checked' : ''"
                                @click="formData.operator = item.name" />
                        </span>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                        <label for="type" class="mb-2">Type <span class="text-danger">*</span></label>
                        <select name="type" id="type" class="form-select" v-model="formData.type" required>
                            <option value="-">Sélectionner type d'abonnement</option>
                            <option value="sim">Carte SIM</option>
                            <option value="Routeur">Routeur</option>
                            <option value="FTTH">FTTH</option>
                            <option value="Autre">Autre</option>
                        </select>
                    </div>

                    <div v-if="formData.type == 'sim'" class="col-12 mt-3">
                        <label for="num" class="mb-2">Numéro de Téléphone <span class="text-danger">*</span></label>
                        <input type="tele" name="num" id="num" v-model="formData.num" class="form-control"
                            placeholder="Entrer le numéro de téléphone" required />
                    </div>

                    <div v-else class="col-12 mt-3">
                        <label for="designation" class="mb-2">Désignation <span class="text-danger">*</span></label>
                        <input type="text" name="designation" id="designation" v-model="formData.num" class="form-control"
                            placeholder="Entrez le désignation de l'abonnement" required />
                    </div>

                    <div class="col-12 mt-3">
                        <label for="date_start" class="mb-2">Date Début <span class="text-danger">*</span></label>
                        <input type="date" name="date_start" id="date_start" v-model="formData.date_start"
                            class="form-control" required />
                    </div>

                    <div class="col-12 mt-3">
                        <label for="price" class="mb-2">Montant <span class="text-danger">*</span></label>
                        <input type="date" name="price" id="price" v-model="formData.price" class="form-control"
                            placeholder="Entrez le montant de l'abonnement" required />
                    </div>

                    <div class="col-12 mt-3">
                        <label for="description" class="mb-2">Description <span class="text-danger">*</span></label>
                        <textarea name="description" id="description" v-model="formData.description" class="form-control"
                            placeholder="Entrez une description de l'abonnement" required></textarea>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div v-if="message != null" class="alert alert-danger" role="alert">
                    <span class="message-error"> {{ message }}</span>
                </div>
                <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
                    Fermer
                </button>

                <button type="submit" :disabled="isLoading" class="btn btn-primary me-0">
                    <span v-if="isLoading" class="d-flex align-items-center">
                        <div class="spinner-border spinner-border-sm text-white" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </span>
                    <span v-else> Enregister</span>
                </button>
            </div>
        </form>

    </Modal>
</template>

<style>
.img-fluid {
    max-width: 100%;
    height: auto;
    aspect-ratio: 3/2;
    object-fit: contain;
    border: 2px solid #dee2e6;
    border-radius: 0.45rem;
    padding: 10px;
    cursor: pointer;
}

.checked {
    border: 2px solid #324877;
}
</style>