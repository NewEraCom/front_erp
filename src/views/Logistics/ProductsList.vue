<template>
  <div class="flex-grow-1 container-fluid mt-3">
    <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Products List</span></h5>

    <!-- Stats Card -->
    <div v-if="stats" class="row">
      <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
        <CardTwo title="Total Products" :count="stats.total" color="bg-label-primary" icon="ti ti-recharging"
          card-color="card-border-shadow-primary" />
      </div>
    </div>
    <div v-else class="row g-3">
      <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
        <!-- Skeleton loader or placeholder for stats -->
        <CardTwoSkeleton />
      </div>
    </div>

    <!-- Products List Card -->
    <div class="row mt-4">
      <div class="col-12">
        <div class="card card-border-shadow-primary">
          <div class="card-header d-flex align-items-center">
            <div class="me-auto">
              <h5 class="fw-bold mb-1">List of Products</h5>
              <small class="fw-bold mb-1 text-muted">List of products in stock</small>
            </div>
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProductModal">
              <i class="ti ti-plus me-2"></i>
              Add a Product
            </button>
          </div>
          <div v-if="products" class="card-body border-top pt-4">
            <!-- ProductsTable component to display products -->
            <ProductsTable :products="products" />
          </div>
          <div v-else class="card-body border-top pt-4 d-flex align-items-center justify-content-center"
            style="height: 650px;">
            <!-- Placeholder or loader for products -->
            <div class="row mt-5">
              <div class="col-12 text-center">
                <h5>Loading data...</h5>
                <div class="spinner-border text-primary mt-4" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Product Modal -->
    <div class="modal fade" id="addProductModal" tabindex="-1" aria-labelledby="addProductModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addProductModalLabel">Add a Product</h5>
            <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
          </div>
          <div class="modal-body">
            <!-- AddProductModalVue component -->
            <AddProductModalVue @productAdded="handleProductAdded" />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { CardTwo, CardTwoSkeleton } from '@/ui'; // Adjust path as per your project structure
import ProductsTable from './components/ProductsTable.vue'; // Adjust path as per your project structure
import { api } from '@/utils'; // Adjust path as per your project structure
import AddProductModalVue from './components/AddProductModal.vue'; // Adjust path as per your project structure

const products = ref([] as any[]);
const stats = ref(null);

onMounted(async () => {
  try {
    // Fetch products
    const response = await api().get('/products');
    products.value = response.data.products;

    // Calculate stats
    stats.value = {
      total: products.value.length
    };
  } catch (error) {
    console.error('Error fetching products:', error);
  }
});

const handleProductAdded = () => {
  // Function to handle actions after a product is added
  console.log('Product added, refreshing product list...');
  // Assuming you want to refresh product list after adding a product, you can refetch data here
  api().get('/products').then(response => {
    products.value = response.data.products;
    stats.value.total = products.value.length; // Update total count
  }).catch(error => {
    console.error('Error refreshing product list:', error);
  });
};
</script>
