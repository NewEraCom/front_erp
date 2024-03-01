<script setup lang="ts">
import { ref, computed } from 'vue';
import { Modal } from '@/ui';
import { useSharedStore } from '@/store';
import { formater } from '@/utils';

const sharedStore = useSharedStore();

const event = ref(computed(() => sharedStore.event));


</script>
<template>
    <Modal id="eventModal" title="Détails de l'événement" size="modal-lg">
        <div class="modal-body">
            <div v-if="event" class="row">
                <div class="col-12">
                    <div class="mb-3">
                        <label class="form-label">Titre</label>
                        <input type="text" class="form-control" v-model="event.title" readonly disabled />
                    </div>
                </div>
                <div class="col-12">
                    <div class="mb-3">
                        <label class="form-label">Date</label>
                        <input type="text" class="form-control" :value="formater.date(event.start)" readonly disabled />
                    </div>
                </div>
                <div class="col-6">
                    <div class="mb-3">
                        <label class="form-label">Heure Début</label>
                        <input type="text" class="form-control" :value="formater.dateTime(event.start)" readonly disabled />
                    </div>
                </div>
                <div class="col-6">
                    <div class="mb-3">
                        <label class="form-label">Heure Fin</label>
                        <input type="text" class="form-control" :value="formater.dateTime(event.end)" readonly disabled />
                    </div>
                </div>
                <div class="col-12">
                    <div class="mb-3">
                        <label class="form-label">Commentaire</label>
                        <textarea class="form-control" v-model="event.content" readonly disabled></textarea>
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