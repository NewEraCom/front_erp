<script setup>
import { Modal } from '@/ui';
import { useFinanceStore } from '@/store';
defineProps({
    id: String,
    
});
const FinanceStore = useFinanceStore();

</script>

<template>
    <Modal :id="id" title="Modifier Facture">
            <div class="modal-body ">
                <div class="col-sm-12">
                    <div class="mb-3">
                        <label for="nameEx" class="form-label">Objet de Facture :</label>
                        <input class="form-control" placeholder="Entrez l'objet" type="text" tabindex="0"
                            id="nameEx" v-model="FinanceStore.objet"  required />
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="mb-3">
                        <label for="nameEx" class="form-label">Comment de Facture :</label>
                            <textarea placeholder="Saisisser votre Commentaire" id="" cols="30" rows="10" class="form-control"
                            v-model="FinanceStore.comment"></textarea>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
                    Fermer
                </button>
                <button class="btn btn-success me-0" data-bs-dismiss="modal" >
                    <span>Oui, Valider</span>
                </button>
            </div>
    </Modal>
</template>

<style></style>
