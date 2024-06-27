<template>
    <div class="modal" tabindex="-1" style="display: block;">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Product</h5>
            <button type="button" class="btn-close" @click="$emit('close')"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateProduct">
              <div class="mb-3">
                <label class="form-label">Code</label>
                <input type="text" class="form-control" v-model="localProduct.code">
              </div>
              <div class="mb-3">
                <label class="form-label">Designation</label>
                <input type="text" class="form-control" v-model="localProduct.designation">
              </div>
              <div class="mb-3">
                <label class="form-label">Description</label>
                <input type="text" class="form-control" v-model="localProduct.description">
              </div>
              <div class="mb-3">
                <label class="form-label">Type</label>
                <input type="text" class="form-control" v-model="localProduct.type">
              </div>
              <div class="mb-3">
                <label class="form-label">Quantity in Stock</label>
                <input type="number" class="form-control" v-model="localProduct.qte_stock">
              </div>
              <div class="mb-3">
                <label class="form-label">Price</label>
                <input type="text" class="form-control" v-model="localProduct.price">
              </div>
              <div class="mb-3">
                <label class="form-label">Warehouse</label>
                <select class="form-control" v-model="localProduct.warehouse_id">
                  <option v-for="warehouse in warehouses" :key="warehouse.id" :value="warehouse.id">
                    {{ warehouse.code }}
                  </option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary">Save changes</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, defineProps, onMounted } from 'vue';
  import { useToast } from 'vue-toastification';
  import { inventoryService } from '@/services';
  
  const props = defineProps({
    product: Object // Receives the product data from the parent component
  });
  
  const localProduct = ref({ ...props.product }); // Use a reactive reference to hold editable product data
  const warehouses = ref([]); // Array to store warehouses fetched from the API
  const toast = useToast(); // Toast notification setup for feedback to the user
  
  // Fetch warehouses data from the API
  const fetchWarehouses = async () => {
    try {
      const response = await inventoryService.getAllWarehouses();
      warehouses.value = response.warehouses;
    } catch (error) {
      console.error('Error fetching warehouses:', error);
      toast.error('Failed to fetch warehouses');
    }
  };
  
  // Update product function to handle form submission
  const updateProduct = async () => {
    try {
      const updatedProduct = await inventoryService.updateProduct(localProduct.value.id, localProduct.value);
      console.log('Product updated successfully', updatedProduct);
      $emit('update', updatedProduct); // Emit event to notify parent component about the update
      toast.success('Product updated successfully');
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
    }
  };
  
  onMounted(() => {
    fetchWarehouses(); // Fetch warehouses data when the component is mounted
  });
  </script>
  