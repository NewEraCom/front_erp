<script setup lang="ts">
import { ref } from 'vue';
import { Modal } from '@/ui';
import { sharedService } from '@/services';
import { useToast } from 'vue-toastification';

const toast = useToast();

const isLoading = ref(false);

const props = defineProps({
    type: {
        type: String,
        default: 'add',
    },
});
let m_paiement = ref('');
let custom_paiement = ref('');

const formData = ref({
    commercial_name :'',
    commercial_phone :'',
    commercial_email :'',
    raison_social :'',
    adresse :'',
    ville :'',
    fix :'',
    m_paiement :m_paiement.value === 'autre' ? custom_paiement.value : m_paiement.value,
    d_paiement :'',
    phone_no_1 :'',
    phone_no_2 :'',
    email :'',
    num_cnss :'',
    num_ice :'',
    num_rc :'',
    num_rf :'',
    livraison :'',
    copy_rc :'',
    copy_rf :'',
    copy_cnss :'',
    copy_ice :'',
    type: props.type,
});
const handleRCChange = (event) => {
    formData.value.copy_rc = event.target.files[0];
};
const handleCNSSChange = (event) => {
    formData.value.copy_cnss = event.target.files[0];
};
const handleICEChange = (event) => {
    formData.value.copy_ice = event.target.files[0];
};
const handleRFChange = (event) => {
    formData.value.copy_rf = event.target.files[0];
};
const onSubmit = async () => {

    await sharedService.createTier(formData.value).then(() => {
        $('#addSoustraitant').modal('hide');
        toast.success('Sous-traitant ajouté avec succès');
    }).catch((error) => {
        console.log(error);
        toast.error(error);
    }).finally(() => {
        isLoading.value = false;
    });
};

</script>

<template>
    <Modal id="addSoustraitant" title="Nouveau Sous-traitant" size="modal-xl">
        <form @submit.prevent="onSubmit">
            <!-- <div class="modal-body">
                <div class="row">
                    <div class="col-12 mb-3">
                        <label for="raison_social" class="mb-2">Raison sociale <span
                                class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="raison_social" v-model="formData.raison_social"
                            placeholder="Entre le nom de la société" required />
                    </div>
                    <div class="col-4 mb-3">
                        <label for="city" class="mb-2">Ville <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="city" v-model="formData.ville"
                            placeholder="Entrez la ville" required />
                    </div>
                    <div class="col-8 mb-3">
                        <label for="adresse" class="mb-2">Adresse <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="adresse" v-model="formData.adresse"
                            placeholder="Entrez l'adresse" required />
                    </div>
                    <div class="col-6 mb-3">
                        <label for="email" class="mb-2">Adresse e-mail <span class="text-danger">*</span></label>
                        <input type="email" class="form-control" id="email" v-model="formData.email"
                            placeholder="Entrez l'adresse e-mail" required />
                    </div>
                    <div class="col-6 mb-3">
                        <label for="phone_no" class="mb-2">Numéro de téléphone <span
                                class="text-danger">*</span></label>
                        <input type="number" class="form-control" id="phone_no" v-model="formData.phone_no_1"
                            placeholder="Entrez le numéro de téléphone" required />
                    </div>
                    <div class="col-6 mb-3">
                        <label for="num_rc" class="mb-2">Numéro de RC <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="num_rc" v-model="formData.num_rc"
                            placeholder="Entrez le numéro de RC" required />
                    </div>
                    <div class="col-6 mb-3">
                        <label for="num_ice" class="mb-2">Numéro de ICE <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="num_ice" v-model="formData.num_ice"
                            placeholder="Entrez le numéro de ICE" required />
                    </div>
                    <div class="col-6 mb-3">
                        <label for="mode_paiement" class="mb-2">Mode de paiement <span
                                class="text-danger">*</span></label>
                        <select class="form-select" aria-label="Default select example" v-model="formData.m_paiment"
                            required>
                            <option value="-">Selectionner le mode de paiement</option>
                            <option value="cheque">Chèque</option>
                            <option value="virement">Virement</option>
                            <option value="espece">Espèce</option>
                        </select>
                    </div>
                    <div class="col-6 mb-3">
                        <label for="d_paiement" class="mb-2">Délai de paiement <span
                                class="text-danger">*</span></label>
                        <input type="number" class="form-control" id="d_paiement" v-model="formData.d_paiment"
                            placeholder="Entrez le délai de paiement" required />
                    </div>
                    <div class="col-6 mb-3">
                        <label for="commerical_name" class="mb-2">Nom commercial <span
                                class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="commerical_name" v-model="formData.commercial_name"
                            placeholder="Entrez le nom commercial" required />
                    </div>
                    <div class="col-6 mb-3">
                        <label for="commercial_phone" class="mb-2">Numéro de téléphone de commercial <span
                                class="text-danger">*</span></label>
                        <input type="number" class="form-control" id="commercial_phone"
                            v-model="formData.commercial_phone"
                            placeholder="Entrez le numéro de téléphone de commercial" required />
                    </div>
                    <div class="col-12 mb-3">
                        <label for="attestation" class="mb-2">Fichier à télécharger <span
                                class="text-danger">*</span></label>
                        <input type="file" class="form-control" id="attestation" ref="formData.commercial_phone"
                            placeholder="Entrez le délai de paiement" required />
                    </div>
                </div>
            </div> -->
            <div class="modal-body">
                <div class="row" >
                    
                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="nom" class="form-label">Nom </label>
                            <input
                                id="nom"
                                v-model="formData.commercial_name"
                                class="form-control"
                                placeholder="Entrez le nom"
                                type="text"
                                tabindex="0"
                                autofocus
                                required
                            />
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="phone_no" class="form-label"
                                >Numéro de téléphone Commercial</label
                            >
                            <input
                                id="phone_no"
                                v-model="formData.commercial_phone"
                                class="form-control"
                                placeholder="Entre le numéro de téléphone"
                                type="text"
                                tabindex="0"
                                required
                            />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="phone_no" class="form-label">Numéro de téléphone N°1</label>
                            <input
                                id="phone_no"
                                v-model="formData.phone_no_1"
                                class="form-control"
                                placeholder="Entre le numéro de téléphone"
                                type="text"
                                tabindex="0"
                                required
                            />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="phone_no" class="form-label">Numéro de téléphone N°2</label>
                            <input
                                id="phone_no"
                                v-model="formData.phone_no_2"
                                class="form-control"
                                placeholder="Entre le numéro de téléphone"
                                type="text"
                                required
                            />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="prenon" class="form-label">Email</label>
                            <input
                                id="prenon"
                                v-model="formData.commercial_email"
                                class="form-control"
                                placeholder="Entrez le numero de tel"
                                type="email"
                                tabindex="0"
                                required
                            />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Raison social</label>
                            <input
                                class="form-control"
                                placeholder="Entrer le numero de matricule"
                                type="text"
                                tabindex="0"
                                id="nameEx"
                                v-model="formData.raison_social"
                                required
                            />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Adresse</label>
                            <input
                                class="form-control"
                                placeholder="Entrer l'Adresse"
                                type="text"
                                tabindex="0"
                                id="nameEx"
                                v-model="formData.adresse"
                                required
                            />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Ville</label>
                            <input
                                class="form-control"
                                placeholder="Entrer la ville"
                                type="text"
                                tabindex="0"
                                id="nameEx"
                                v-model="formData.ville"
                                required
                            />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Fix</label>
                            <input
                                class="form-control"
                                placeholder="Entrer le numero fix"
                                type="text"
                                tabindex="0"
                                id="nameEx"
                                v-model="formData.fix"
                                required
                            />
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Methode de paiement</label>
                            <select name="" id="" class="form-select" v-model="formData.m_paiement">
                                <option value="virement">Virement</option>
                                <option value="cash">Cash</option>

                                <option value="autre">Autre</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-6" v-if="m_paiement === 'autre'">
                        <div class="mb-3">
                            <input
                                class="form-control"
                                placeholder="Saisir la methode de paiement"
                                type="text"
                                tabindex="0"
                                id="nameEx"
                                v-model="custom_paiement"
                                required
                                max="12"
                            />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Date de paiement</label>
                            <input
                                class="form-control"
                                placeholder="date de paiement"
                                type="date"
                                tabindex="0"
                                id="nameEx"
                                v-model="formData.d_paiement"
                                required
                            />
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Adresse e-mail</label>
                            <input
                                class="form-control"
                                placeholder="Entre l'adresse e-mail"
                                type="email"
                                tabindex="0"
                                id="nameEx"
                                v-model="formData.email"
                                required
                            />
                        </div>
                    </div>
                    <br>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Numero Cnss</label>
                            <input
                                class="form-control"
                                placeholder="Entre l'adresse e-mail"
                                type="text"
                                tabindex="0"
                                id="nameEx"
                                v-model="formData.num_cnss"
                                
                            />
                        </div>
                    </div>
                    <div class="mb-3 col-md-6">
                        <label for="copie_cnss" class="form-label">Copie cnss</label>
                        <input
                            type="file"
                            class="form-control"
                            id="copie_cnss"
                            name="copie_cnss"
                            @change="handleCNSSChange"
                        />
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Numero Ice</label>
                            <input
                                class="form-control"
                                placeholder="Entre l'adresse e-mail"
                                type="text"
                                tabindex="0"
                                id="nameEx"
                                v-model="formData.num_ice"
                                
                            />
                        </div>
                    </div>
                    <div class="mb-3 col-md-6">
                        <label for="copie_cnss" class="form-label">Copie Ice</label>
                        <input
                            type="file"
                            class="form-control"
                            id="copie_cnss"
                            name="copie_cnss"
                            @change="handleICEChange"
                        />
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Numero RC</label>
                            <input
                                class="form-control"
                                placeholder="Entre l'adresse e-mail"
                                type="text"
                                tabindex="0"
                                id="nameEx"
                                v-model="formData.num_rc"
                                
                            />
                        </div>
                    </div>
                    <div class="mb-3 col-md-6">
                        <label for="copie_cnss" class="form-label">Copie RC</label>
                        <input
                            type="file"
                            class="form-control"
                            id="copie_cnss"
                            name="copie_cnss"
                            @change="handleRCChange"
                        />
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Numero RF</label>
                            <input
                                class="form-control"
                                placeholder="Entre l'adresse e-mail"
                                type="text"
                                tabindex="0"
                                id="nameEx"
                                v-model="formData.num_rf"
                                
                            />
                        </div>
                    </div>
                    <div class="mb-3 col-md-6">
                        <label for="copie_cnss" class="form-label">Copie RF</label>
                        <input
                            type="file"
                            class="form-control"
                            id="copie_cnss"
                            name="copie_cnss"
                            @change="handleRFChange"
                        />
                    </div>
                </div>
                <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Livraison</label>
                            <select name="" id="" class="form-select" v-model="formData.livraison">
                                <option value="1">Oui</option>
                                <option value="0">Non</option>
                            </select>
                            <!-- <input
                                class="form-control"
                                placeholder="Entre l'adresse e-mail"
                                type="text"
                                tabindex="0"
                                id="nameEx"
                                v-model="formData.livraison"
                                
                            /> -->
                        </div>
                    </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
                    Fermer
                </button>
                <button type="submit" :disabled="isLoading" class="btn btn-primary">
                    <span v-if="isLoading" class="d-flex align-items-center">
                        <div class="spinner-border spinner-border-sm text-white" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </span>
                    <span v-else> Terminer</span>
                </button>
            </div>
        </form>
    </Modal>
</template>