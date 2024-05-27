<script setup>
import { ref } from 'vue';
import { portalService } from '@/services';
import { push } from 'notivue';
import { helpers } from '@/utils';


const isLoading = ref(false);
const isError = ref(false);

// Reactive properties
const previewUrl = ref(null);
const errorMessage = ref('');
const isDragOver = ref(false);
const file = ref(null);

const onFileChange = (event) => {
    file.value = event.target.files[0];
    if (file.value) {
        if (!file.value.type.startsWith('image/')) {
            errorMessage.value = 'Please select an image file.';
            return;
        }
        if (file.value.size > 5 * 1024 * 1024) {
            errorMessage.value = 'File size should be less than 5MB.';
            return;
        }
        errorMessage.value = '';
        previewUrl.value = URL.createObjectURL(file.value);
    }
};

const onDragOver = () => {
    isDragOver.value = true;
};

const onDragLeave = () => {
    isDragOver.value = false;
};

const onDrop = (event) => {
    isDragOver.value = false;
    const droppedFile = event.dataTransfer.files[0];
    file.value = droppedFile;
    if (file.value) {
        if (!file.value.type.startsWith('image/')) {
            errorMessage.value = 'Please select an image file.';
            return;
        }
        if (file.value.size > 5 * 1024 * 1024) {
            errorMessage.value = 'File size should be less than 5MB.';
            return;
        }
        errorMessage.value = '';
        previewUrl.value = URL.createObjectURL(file.value);
    }
};

const cancelPreview = () => {
    previewUrl.value = null;
    file.value = null;
};

const submit = async () => {
    if (file.value === null || file.value === undefined || file.value === false) {
        isError.value = true;
        return;
    }

    isLoading.value = true;

    const formData = new FormData();

    formData.append('profile_picture', file.value);

    try {
        await portalService.updateAvatar(formData);
        push.success({
            title: 'Photo de profil',
            message: 'Votre photo de profil a été mise à jour avec succès.'
        });
    } catch (err) {
        push.error({
            title: 'Photo de profil',
            message: 'Une erreur est survenue lors de la mise à jour de votre photo de profil.'
        });
    } finally {
        isLoading.value = false;
        helpers.closeCanva();
        file.value = null;
        previewUrl.value = null;
    }
};


</script>
<template>
    <div class="offcanvas offcanvas-end off-canva-width" tabindex="-1" id="uploadCanva"
        aria-labelledby="offcanvasEndLabel">
        <div class="offcanvas-header">
            <h5 id="offcanvasEndLabel" class="offcanvas-title">Modifier votre photo de profil
            </h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body mx-0 flex-grow-0">
            <form @submit.prevent="submit">
                <div class="row">
                    <div class="col-12">
                        <div class="upload-container">

                            <div v-if="previewUrl" class="preview rounded">
                                <img :src="previewUrl" alt="Photo Preview" />
                                <span class="cancel-icon rounded" @click="cancelPreview">✖️</span>
                            </div>
                            <div v-else class="drop-area" @dragover.prevent="onDragOver" @dragleave="onDragLeave"
                                @drop.prevent="onDrop" :class="{ 'drag-over': isDragOver }">
                                <input type="file" id="file-input" @change="onFileChange" ref="fileInput"
                                    accept="image/*" hidden />
                                <label for="file-input" class="drop-label">
                                    <i class="ti ti-photo-up size-56"></i>
                                    <p class="mt-3">Faites glisser et déposez n'importe quel fichier ici</p>
                                    <p>ou <span class="browse-link">parcourir le fichier</span> depuis l'appareil</p>
                                </label>
                            </div>
                            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
                        </div>
                    </div>
                </div>
                <div class="row mt-5">
                    <div class="col-12 d-flex justify-content-end">
                        <button type="button" class="btn close-button btn-label-outline-dark"
                            data-bs-dismiss="offcanvas">Annuler</button>
                        <button type="submit" class="btn btn-primary">Enregistrer</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.size-56 {
    font-size: 56px;
    color: #0B4B71;
}

.upload-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    max-width: 100%;
    height: 310px;
}

.drop-area {
    border: 2px dashed #0B4B71;
    border-radius: 10px;
    text-align: center;
    transition: background-color 0.3s;
    width: 100%;
    height: 310px;
    align-content: center;
}

.drop-area.drag-over {
    background-color: #f0f0f0;
}

.drop-label {
    cursor: pointer;
}

.icon {
    font-size: 2em;
}

.browse-link {
    color: #0B4B71;
    cursor: pointer;
}

.preview {
    position: relative;
    margin-top: 10px;
}

.preview img {
    max-width: 100%;
    max-height: 310px;
    object-fit: fill;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.cancel-icon {
    position: absolute;
    top: 5px;
    right: 5px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    cursor: pointer;
    padding: 5px;
}


.error {
    color: red;
    margin-top: 10px;
}
</style>