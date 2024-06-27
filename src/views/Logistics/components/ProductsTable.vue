<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Code</th>
          <th>Designation</th>
          <th>Description</th>
          <th>Type</th>
          <th>Quantity in Stock</th>
          <th>Price</th>
          <th>Warehouse</th>
          <th>Created At</th>
          <th>Updated At</th>
          <th>Action</th> 
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.code }}</td>
          <td>{{ product.designation }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.type }}</td>
          <td>{{ product.qte_stock }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.warehouse.code }}</td>
          <td>{{ formatDate(product.created_at) }}</td>
          <td>{{ formatDate(product.updated_at) }}</td>
          <td>
            <button class="btn btn-danger btn-sm" @click="deleteProduct(product.id)">
              Delete
            </button>
            <button class="btn btn-primary btn-sm" @click="openEditModal(product)">
              Edit
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <EditProductModal v-if="isEditModalVisible" :product="selectedProduct" @close="closeEditModal" @update="updateProductInList"/>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import inventoryService from '@/services/inventoryService';
import EditProductModal from './EditProductModal.vue';
const products = ref([]);
const isEditModalVisible = ref(false);
const selectedProduct = ref(null);

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleString();
};

const deleteProduct = async (id: number) => {
  try {
    await inventoryService.deleteProduct(id);
    // Remove the deleted product from the local list
    products.value = products.value.filter(product => product.id !== id);
    console.log('Product deleted successfully');
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};

const openEditModal = (product) => {
  selectedProduct.value = product;
  isEditModalVisible.value = true;
};

const closeEditModal = () => {
  isEditModalVisible.value = false;
  selectedProduct.value = null;
};

const updateProductInList = (updatedProduct) => {
  const index = products.value.findIndex(product => product.id === updatedProduct.id);
  if (index !== -1) {
    products.value[index] = updatedProduct;
  }
};

onMounted(async () => {
  try {
    const response = await inventoryService.getProducts();
    console.log('Fetched products:', response);
    products.value = response.products;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
});
</script>
