<template>
  <div class="modal" id="addProductModal" style="display: block;" tabindex="-1" aria-labelledby="addProductModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addProductModalLabel">Add a New Product</h5>
          <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
        </div>
        <form @submit.prevent="submitForm">
          <div class="modal-body">
            <div class="mb-3">
              <label for="code" class="form-label">Code <span class="text-danger">*</span></label>
              <input type="text" class="form-control" id="code" v-model="formData.code" required />
            </div>
            <div class="mb-3">
              <label for="designation" class="form-label">Designation <span class="text-danger">*</span></label>
              <input type="text" class="form-control" id="designation" v-model="formData.designation" required />
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">Description</label>
              <textarea class="form-control" id="description" v-model="formData.description"></textarea>
            </div>
            <div class="mb-3">
              <label for="type" class="form-label">Type</label>
              <input type="text" class="form-control" id="type" v-model="formData.type" />
            </div>
            <div class="mb-3">
              <label for="qte_stock" class="form-label">Quantity in Stock</label>
              <input type="text" class="form-control" id="qte_stock" v-model="formData.qte_stock" />
            </div>
            <div class="mb-3">
              <label for="price" class="form-label">Price</label>
              <input type="text" class="form-control" id="price" v-model="formData.price" />
            </div>
            <div class="mb-3">
              <label for="warehouse_id" class="form-label">Warehouse</label>
              <select class="form-control" id="warehouse_id" v-model="formData.warehouse_id">
                <option v-for="warehouse in warehouses" :key="warehouse.id" :value="warehouse.id">
                  {{ warehouse.code }}
                </option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary" :disabled="isLoading">
              <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <span v-else>Add Product</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import { inventoryService } from '@/services';

const formData = ref({
  code: '',
  designation: '',
  description: '',
  type: '',
  qte_stock: '',
  price: '',
  warehouse_id: ''
});

const isLoading = ref(false);
const toast = useToast();
const warehouses = ref([]);

const submitForm = async () => {
  try {
    isLoading.value = true;
    const response = await inventoryService.addProduct(formData.value);
    toast.success('Product added successfully');
    closeModal();
  } catch (error) {
    console.error('Error adding product:', error);
    toast.error('Failed to add product');
  } finally {
    isLoading.value = false;
  }
};

const closeModal = () => {
  const modal = document.getElementById('addProductModal');
  modal.style.display = 'none';
};

const fetchWarehouses = async () => {
  try {
    const response = await inventoryService.getAllWarehouses();
    warehouses.value = response.warehouses;
  } catch (error) {
    console.error('Error fetching warehouses:', error);
    toast.error('Failed to fetch warehouses');
  }
};

onMounted(() => {
  fetchWarehouses();
});
</script>
