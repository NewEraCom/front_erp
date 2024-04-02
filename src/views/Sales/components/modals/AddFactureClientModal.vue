<script setup lang="ts">
import { ref ,computed} from 'vue';
import { Modal ,CustomSelect} from '@/ui';
import { useToast } from 'vue-toastification';
import { useSalesStore } from '@/store';
import { salesService } from '@/services';

const toast = useToast();
const salesStore = useSalesStore();
const purchase = ref(computed(() => salesStore.purchase));

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
    bonCommande:{
        type: Object,
        required: true,
    }
});
const isLoading = ref(false);

const formData = ref({
    project_id: purchase.value.project_id,
    file: null,
    selectedbc: 0,
    total: 0,
    type: 'Achats',
});
const getTotalAchats = (achats) => {
  let total = 0;
  achats.forEach(achat => {
    let prix_fournisseur_choisi = 0;
    switch (achat.fournisseur_choisi) {
      case 1:
        prix_fournisseur_choisi = parseFloat(achat.prix_fournisseur_1);
        break;
      case 2:
        prix_fournisseur_choisi = parseFloat(achat.prix_fournisseur_2);
        break;
      case 3:
        prix_fournisseur_choisi = parseFloat(achat.prix_fournisseur_3);
        break;
    }
    total += prix_fournisseur_choisi * achat.quantity;
  });
  return formData.value.total = total;
};
if (purchase.value){
    getTotalAchats(purchase.value.achats);

}
const handleFileChange = (e, type) => {
    formData.value[type] = e.target.files[0];
};

const submit = async () => {
   console.log(formData.value);
    isLoading.value = true;
    
    try {
        formData.value.selectedbc = formData.value.selectedbc.key; 
        await salesService.insertFacturesClient(formData.value);
        toast.success('Facture ajoutée avec succès');
        isLoading.value = false;
        
    } catch (error) {
        toast.error('Erreur lors de l\'ajout de la facture');
        isLoading.value = false;
    }
   
};
</script>
<template>
    <Modal id="upload-facture" title="Ajouter une Facture" size="modal-md">
        <form @submit.prevent="submit" enctype="multipart/form-data">
            <div class="modal-body">
                <div class="row">
                    
                    <div v-if="bonCommande != null" class="col-12 mb-2">
                        
                        <CustomSelect v-model="formData.selectedbc" placeholder="Choisir un Bon Commande"
                            label="Bon Commande" :data="bonCommande
                            .map((item) => ({
                                key: item.id,
                                value: item.num
                            }))" 
                        />
                    </div>
                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="copie_rib" class="form-label">Attachement
                                <span class="text-danger">*</span>
                            </label>
                            <input id="copie_facture" ref="copie_facture" class="form-control" placeholder="Choisir le fichier"
                                type="file" tabindex="0" name="copie_facture" required
                                @change="e => handleFileChange(e, 'file')" />
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