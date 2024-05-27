<script setup>
import { ref } from 'vue';

defineProps({
    model: Object,
});

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

const browseFile = () => {
    document.getElementById('file-input').click();
};

const cancelPreview = () => {
    previewUrl.value = null;
    file.value = null;
};


</script>

<template>

</template>

<style scoped>
.upload-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: auto;
}

.drop-area {
    border: 2px dashed #6200ea;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    transition: background-color 0.3s;
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
    color: #6200ea;
    cursor: pointer;
}

.preview {
    position: relative;
    margin-top: 10px;
}

.preview img {
    max-width: 100%;
    max-height: 200px;
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

button {
    background-color: #6200ea;
    color: white;
    padding: 10px 20px;
    margin-top: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.error {
    color: red;
    margin-top: 10px;
}
</style>