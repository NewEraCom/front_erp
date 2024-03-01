<script setup lang="ts">
import { ref, computed } from 'vue';
import { Modal } from '@/ui';
import { useSharedStore } from '@/store';

const sharedStore = useSharedStore();

const event = ref(computed(() => sharedStore.event));

</script>
<template>
    <Modal id="detailsRecruitementModal" title="Détails de la demande" size="modal-lg">
        <div class="modal-body">
            <div v-if="event" class="row">
                <div class="col-12">
                    <div class="mb-3">
                        <label class="form-label">Titre</label>
                        <input type="text" class="form-control" v-model="event.post_name" readonly disabled />
                    </div>
                </div>
                <div class="col-6">
                    <div class="mb-3">
                        <label class="form-label">Experience</label>
                        <input type="text" class="form-control" :value="event.experience" readonly disabled />
                    </div>
                </div>
                <div class="col-6">
                    <div class="mb-3">
                        <label class="form-label">Diolome</label>
                        <input type="text" class="form-control" :value="event.diploma" readonly disabled />
                    </div>
                </div>
                <div class="col-12">
                    <div class="mb-3">
                        <label class="form-label">Commentaire</label>
                        <textarea class="form-control" v-model="event.description" readonly disabled></textarea>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
                Fermer
            </button>
        </div>
    </Modal>
</template>