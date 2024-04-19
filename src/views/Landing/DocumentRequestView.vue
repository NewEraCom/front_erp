<script setup lang="ts">
import { ref } from 'vue';
import { NavBar, FooterBar } from './components';
import { sharedService } from '@/services';

const isMessage = ref(false);
const isError = ref(false);
const isLoading = ref(false);

const formData = ref({
  matricule: '',
  email: '',
  title: '-',
  otherTitle: '',
  commentaire: '',
});

const submit = async () => {
  isLoading.value = true;
  isMessage.value = true;
  isError.value = false;
  await sharedService.addDocumentRh(formData.value).then(() => {
    isLoading.value = false;
    isMessage.value = true;
    isError.value = false;
  }).catch(() => {
    isLoading.value = false;
    isMessage.value = false;
    isError.value = true;
  });
};
</script>

<template>
  <div>
    <NavBar />
    <section id="landingContact" class="section-py bg-white landing-contact mt-5 mb-5 pb-5">
      <div class="container">
        <div class="text-center mb-3 pb-1 mt-5 pt-5">
          <span class="badge bg-label-primary">Bienvenu</span>
        </div>
        <div class="row">
          <div class="col-12 text-center">
            <img src="@/assets/img/Logo_bg.png" width="240px" alt="" srcset="" class="mb-5" />
          </div>
        </div>
        <div class="row gy-4 mt-4">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-body">
                <h4 class="mb-1 fw-bold">Demande des documents administratifs</h4>
                <p class="mb-4">
                  Envoyer votre demande de documents administratifs, et vous recevrez une réponse
                  dans les plus brefs délais !
                </p>
                <div v-if="isMessage" class="row">
                  <div class="col-12">
                    <div class="alert alert-success alert-dismissible d-flex align-items-baseline" role="alert">
                      <span class="alert-icon alert-icon-lg text-success me-2">
                        <i class="ti ti-check ti-sm"></i>
                      </span>
                      <div class="d-flex flex-column ps-1">
                        <h5 class="alert-heading mb-2">Demande envoyée avec succès !</h5>
                        <p class="mb-0">
                          Votre demande a été envoyée avec succès, vous recevrez une réponse dans
                          les plus brefs délais.
                        </p>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="isError" class="row">
                  <div class="col-12">
                    <div class="alert alert-danger alert-dismissible d-flex align-items-baseline" role="alert">
                      <span class="alert-icon alert-icon-lg text-danger me-2">
                        <i class="ti ti-x ti-sm"></i>
                      </span>
                      <div class="d-flex flex-column ps-1">
                        <h5 class="alert-heading mb-2">Error lors de l'envoi de la demande !</h5>
                        <p class="mb-0">
                          Votre demande n'a pas été envoyée, veuillez réessayer plus tard.
                        </p>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                      </div>
                    </div>
                  </div>
                </div>
                <form @submit.prevent="submit">
                  <div class="row g-3">
                    <div class="col-md-6">
                      <label class="form-label" for="matricule"> Matricule </label>
                      <input id="matricule" v-model="formData.matricule" type="number" class="form-control"
                        placeholder="Ex : 1" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label" for="address-email"> Adresse email </label>
                      <input id="address-email" v-model="formData.email" type="email" class="form-control"
                        placeholder="johndoe@neweracom.ma" />
                    </div>
                    <div class="col-md-12">
                      <label class="form-label" for="type-doc"> Type de document </label>
                      <select id="type-doc" v-model="formData.title" class="form-select">
                        <option value="-">Selectionner l'objet de la demande</option>
                        <option value="Attestation de travail">Attestation de travail</option>
                        <option value="Attestation de salaire">Attestation de salaire</option>
                        <option value="Solde de tout compte">Solde de tout compte</option>
                        <option value="Bulletin de paie">Bulletin de paie</option>
                        <option value="Autre">Autre</option>
                      </select>
                    </div>
                    <div v-if="formData.title == 'Autre'" class="col-md-12">
                      <label class="form-label" for="titre-doc"> Titre de document </label>
                      <input id="titre-doc" v-model="formData.otherTitle" type="text" class="form-control"
                        placeholder="Titre de document" />
                    </div>
                    <div class="col-12">
                      <label class="form-label" for="message"> Message </label>
                      <textarea id="message" v-model="formData.commentaire" class="form-control" rows="8"
                        placeholder="Écrire un message"></textarea>
                    </div>
                    <div class="col-12">
                      <button type="submit" class="btn btn-primary waves-effect waves-light">
                        <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status"
                          aria-hidden="true"></span>
                        <span v-else>Envoyer</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <FooterBar />
  </div>
</template>

<style scoped>
.bg-footer {
  background-color: #1f2c4a !important;
}
</style>
