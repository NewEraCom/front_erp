<script setup>
import { ref ,watch} from 'vue';
import { Modal } from '@/ui';
import { sharedService } from '@/services';
// const props = defineProps({
//     soustraitant :{
//         type:Object,
//         required:true
//     }
// });

const props = defineProps(['soustraitant']);
let commercial_name = ref('');
let commercial_phone = ref('');
let commercial_email = ref('');
let raison_social = ref('');
let adresse = ref('');
let ville = ref('');
let fix = ref('');
let m_paiement = ref('');
let custom_paiement = ref('');
let d_paiement = ref('');
let phone_no_1 = ref('');
let phone_no_2 = ref('');
let email = ref('');

let num_rc = ref('');
let copie_rc = '';
let num_ice = ref('');
let copie_ice = '';
let num_cnss = ref('');
let copie_cnss = '';
let livraison = ref('');

const handleRCChange = (event) => {
    copie_rc = event.target.files[0];
};
const handleCNSSChange = (event) => {
    copie_cnss = event.target.files[0];
};
const handleICEChange = (event) => {
    copie_ice = event.target.files[0];
};


// watch(props,()=>{
    if (props && props.soustraitant) {
        console.log(props.soustraitant);
        commercial_name.value = props.soustraitant.commercial_name;
        commercial_phone.value = props.soustraitant.commercial_phone;
        commercial_email.value = props.soustraitant.commercial_email;
        raison_social.value = props.soustraitant.raison_social;
        adresse.value = props.soustraitant.adresse;
        ville.value = props.soustraitant.ville;
        fix.value = props.soustraitant.fix;
        m_paiement.value = props.soustraitant.m_paiement;
        d_paiement.value = props.soustraitant.d_paiement;
        phone_no_1.value = props.soustraitant.phone_no_1;
        phone_no_2.value = props.soustraitant.phone_no_2;
        email.value = props.soustraitant.email;
        num_cnss.value = props.soustraitant.num_cnss;
        num_ice.value = props.soustraitant.num_ice;
        num_rc.value = props.soustraitant.num_rc;
        livraison.value = props.soustraitant.livraison;
    }
// });


const isLoading = ref(false);

const submit = async () => {
    isLoading.value = true;

    const formData = new FormData();
    formData.append('commercial_name', commercial_name.value);
    formData.append('commercial_phone', commercial_phone.value);
    formData.append('commercial_email', commercial_email.value);
    formData.append('raison_social', raison_social.value);
    formData.append('adresse', adresse.value);
    formData.append('ville', ville.value);
    formData.append('fix', fix.value);
    formData.append('d_paiment', d_paiement.value);
    formData.append(
        'm_paiment',
        m_paiement.value === 'autre' ? custom_paiement.value : m_paiement.value
    );
    formData.append('email', email.value);
    formData.append('phone_no_1', phone_no_1.value);
    formData.append('phone_no_2', phone_no_2.value);
    formData.append('num_ice', num_ice.value);
    formData.append('num_cnss', num_cnss.value);
    formData.append('num_rc', num_rc.value);
    formData.append('livraison', livraison.value);
    formData.append('copy_cnss', copie_cnss);
    formData.append('copy_ice', copie_ice);
    formData.append('copy_rc', copie_rc);

    
       await sharedService.updateSousTraitants(props.soustraitant.id, formData)
            .then((response) => {
                console.log(response);
                resetFormFields();
            })
            .catch((error) => {
                console.log(error);
            });
   
};

const resetFormFields = () => {
    isLoading.value = false;
    $('#edit-st').modal('hide');
};
</script>

<template>
    <Modal id="edit-st" title="Edit Sous Traitant" class-name="modal-xl" >
        <form @submit.prevent="submit">
            
            <div class="modal-body">
                <div class="row" v-if="soustraitant != null">
                    {{ soustraitant.adresse }}
                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="nom" class="form-label">Nom </label>
                            <input
                                id="nom"
                                v-model="commercial_name"
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
                                v-model="commercial_phone"
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
                                v-model="phone_no_1"
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
                                v-model="phone_no_2"
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
                                v-model="commercial_email"
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
                                v-model="raison_social"
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
                                v-model="adresse"
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
                                v-model="ville"
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
                                v-model="fix"
                                required
                            />
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Methode de paiement</label>
                            <select name="" id="" class="form-select" v-model="m_paiement">
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
                                v-model="d_paiement"
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
                                v-model="email"
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
                                v-model="num_cnss"
                                required
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
                                v-model="num_ice"
                                required
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
                                v-model="num_rc"
                                required
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
                </div>
                <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Livraison</label>
                            <input
                                class="form-control"
                                placeholder="Entre l'adresse e-mail"
                                type="text"
                                tabindex="0"
                                id="nameEx"
                                v-model="livraison"
                                required
                            />
                        </div>
                    </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
                    Fermer
                </button>
                <button type="submit" :disabled="isLoading" class="btn btn-primary">
                    <span v-if="isLoading" class="d-flex align-items-center">
                        <div class="spinner-border spinner-border-sm text-white me-2" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        Chargement...
                    </span>
                    <span v-else> Terminer</span>
                </button>
            </div>
        </form>
    </Modal>
</template>

<style></style>
