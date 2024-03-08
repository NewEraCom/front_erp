<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
    label: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    },
    modelValue: {
        type: Array,
        default: () => ([]),
    },
    data: {
        type: Array,
        default: () => [
            {
                key: 'key',
                value: 'value'
            }
        ]
    },
    error: Boolean,
    errorMessage: {
        type: String,
        default: null
    }
});
const filterData = ref(props.data);

watch(() => props.modelValue, (newValue) => {
    console.log('modelValue changed:', newValue);
}, { deep: true });


const show = ref(false);
const toggle = () => {
    show.value = !show.value;
};

const choose = (item) => {
    console.log(item);

};

const search = (word) => {
    if (word === '') {
        filterData.value = props.data;
        return;
    }
    const value = props.data.filter((item) => {
        return Object.values(item).some((value) => {
            return String(value).toLowerCase().includes(word.toLowerCase());
        });
    });
    filterData.value = value;
};
</script>

<template>
    <div class="input-wrapper">
        <div class="relative">
            <label for="select2Basic" class="form-label">{{ label }}</label>
            <input :id="label" class="form-select" :class="error ? 'is-invalid' : ''" tabindex="-1" autocomplete="off"
                :placeholder="placeholder" aria-hidden="true" :value="modelValue.value" v-bind="$attrs"
                @input="$emit('update:modelValue', $event.target.value)" @click="toggle" />
            <div v-if="show" class="bg">
                <input :id="label" class="form-select" :class="error ? 'is-invalid' : ''" tabindex="-1"
                    autocomplete="off" :placeholder="placeholder" aria-hidden="true"
                    :value="`${props.modelValue.length} item(s) selected`" v-bind="$attrs"
                    @keyup="search($event.target.value)" readonly>
                <ul role="list" class="select2-results__options">
                    <li v-for="item of filterData" :key="item.key" class="select2-results__option" role="option"
                        @click="choose(item)"
                        :class="{ 'selected': Array.isArray(props.modelValue) && props.modelValue.some(selectedItem => selectedItem.key === item.key) }">
                        <span>{{ item.value }}</span>
                        <span
                            v-if="Array.isArray(props.modelValue) && props.modelValue.some(selectedItem => selectedItem.key === item.key)">✓</span>
                    </li>
                </ul>
            </div>
            <div v-if="error" class="invalid-feedback">Error</div>
        </div>
    </div>
</template>

<style scoped>
.bg {
    position: absolute;
    padding: 15px;
    margin-top: 5px;
    background: #fff;
    box-shadow: 0 0.25rem 1rem rgba(165, 163, 174, 0.45);
    background-clip: padding-box;
    border-color: #dbdade;
    z-index: 1000;
    width: 100%;
    border-radius: 12px;
}

.select2-results__options {
    margin-top: 10px;
    max-height: 15rem;
    overflow-y: auto;
    list-style: none;
    padding: 0;
}

.select2-results__option[role='option'] {
    border-radius: 0.375rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 1rem;
    cursor: pointer;
}

.select2-results__option.selected {
    background-color: #e2e8f0;
    /* Example selected background color */
}

.select2-results__option[role='option']:hover {
    background-color: #f6f9fc;
}

.input-wrapper {
    position: relative;
    width: 100%;
    max-width: 100%;
}
</style>
