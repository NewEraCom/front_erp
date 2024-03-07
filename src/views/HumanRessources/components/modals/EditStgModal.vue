<script setup>
import {  ref } from 'vue';
import { Modal } from '@/ui';
import { watch } from 'vue';
import {rhService} from '@/services';


const props = defineProps(['stg']);


let nom = ref('');
let prenom = ref('');
let tel = ref('');
let cin = ref('');
let email = ref('');
let adresse = ref('');
let status = ref('');
let diplome = ref('');
let poste = ref('');






watch(props,()=>{
    if(props.stg){
        nom.value = props.stg.nom;
         prenom.value = props.stg.prenom;
         tel.value = props.stg.tel;
         cin.value = props.stg.cin;
         email.value = props.stg.email;
         adresse.value = props.stg.adresse;
         status.value = props.stg.status;
         diplome.value = props.stg.diplome;
         poste.value = props.stg.poste;
        console.log(props.stg);
    }
});

const isLoading = ref(false);

const submit = async () => {

    isLoading.value = true;

    const formData = new FormData();
    formData.append('nom', nom.value);
    formData.append('prenom', prenom.value);
    formData.append('tel', tel.value);
    formData.append('cin', cin.value);
    formData.append('email', email.value);
    formData.append('adresse', adresse.value);
    formData.append('status', status.value);
    formData.append('diplome', diplome.value);
    formData.append('poste', poste.value);

    const data = props.stg;
    console.log(formData);
    if(nom.value != '' && prenom.value != '' && tel.value != '' && email.value!='' 
    && cin.value != '' && adresse.value!='' && status.value!='' && diplome.value!='' && poste.value!='' ){

        rhService.updateIntern(props.stg.id,formData).then((response) => {
            console.log(response);
            resetFormFields();
        }).catch((error) => {
            console.log(error);
        });
    }else{
        console.log('All fields are required');
    }
    
};

const resetFormFields = () => {
    isLoading.value = false;
    $('#edit-stg').modal('hide');
    // $('#stg-table').load(location.href + " #stg-table");
};
</script>

<template >
    
            <Modal id="edit-stg" title="Edit Stagiaire" extra-class="modal-xl">
                <form @submit.prevent="submit" >
                    <div class="modal-body">
                        <div class="row" v-if="stg">
                           
                            <div class="col-sm-6">
                                <div class="mb-3">
                                    <label for="nameEx" class="form-label">Nom</label>
                                    <input class="form-control" placeholder="Entrez le numéro de l'offre" type="text"
                                        tabindex="0" id="nameEx"   required v-model="nom" />
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="mb-3">
                                    <label for="nameEx" class="form-label">Prenom</label>
                                    <input class="form-control" placeholder="Entrez le nom de client" type="text"
                                        tabindex="0" id="nameEx"  required v-model="prenom" />
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="mb-3">
                                    <label for="nameEx" class="form-label">Tel</label>
                                    <input class="form-control" placeholder="Entre " type="text"
                                        tabindex="0" id="nameEx"  required v-model="tel" />
                                </div>
                            </div>
                            
                            <div class="col-sm-6">
                                <div class="mb-3">
                                    <label for="nameEx" class="form-label">Cin</label>
                                    <input class="form-control" placeholder="" type="text"
                                        tabindex="0" id="nameEx"  required v-model="cin" />
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="mb-3">
                                    <label for="nameEx" class="form-label">Adresse mail</label>
                                    <input class="form-control" placeholder="Entre les qualifications demandé" type="email"
                                        tabindex="0" id="nameEx"  required v-model="email" />
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="mb-3">
                                    <label for="nameEx" class="form-label">Diplome</label>
                                    <input class="form-control" placeholder="Entre les qualifications demandé" type="text"
                                        tabindex="0" id="nameEx"  required v-model="diplome" />
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="mb-3">
                                    <label for="nameEx" class="form-label">Poste</label>
                                    <input class="form-control" placeholder="Entre les qualifications demandé" type="text"
                                        tabindex="0" id="nameEx"  required v-model="poste" />
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="mb-3">
                                    <label for="nameEx" class="form-label">Status</label>
                                    <select name="" id="" class="form-select" required v-model="status">
                                <option value="1">Actif</option>
                                <option value="0">Inactif</option>
                            </select>
                                </div>
                            </div>
                            
                            
                            
                            
                            
                            <div class="col-sm-6">
                                <div class="mb-3">
                                    <label for="nameEx" class="form-label">Adresse </label>
                                    <input class="form-control" placeholder="Entre les qualifications demandé" type="text"
                                        tabindex="0" id="nameEx"  required v-model="adresse" />
                                </div>
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