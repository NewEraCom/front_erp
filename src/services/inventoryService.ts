import { api } from '@/utils';

const inventoryService = {
  // Products
  async addProduct(data: any) {
    try {
      const response = await api().post('/products', data);
      return response.data;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  },

  async getProduct(id: number) {
    try {
      const response = await api().get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  async getProducts() {
    try {
      const response = await api().get('/products');
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  async updateProduct(id: number, data: any) {
    try {
      const response = await api().put(`/products/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  async deleteProduct(id: number) {
    try {
      const response = await api().delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  // Stock
  async addToStock(data: any) {
    try {
      const response = await api().post('/inventory/stock', data);
      return response.data;
    } catch (error) {
      console.error('Error adding to stock:', error);
      throw error;
    }
  },

  async removeFromStock(id: number, quantity: number) {
    try {
      const response = await api().delete(`/inventory/stock/${id}`, { data: { quantity } });
      return response.data;
    } catch (error) {
      console.error('Error removing from stock:', error);
      throw error;
    }
  },

  // Warehouses
  async addWarehouse(data: any) {
    try {
      const response = await api().post('/warehouses', data);
      return response.data;
    } catch (error) {
      console.error('Error adding warehouse:', error);
      throw error;
    }
  },

  async getWarehouse(id: number) {
    try {
      const response = await api().get(`/warehouses/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching warehouse:', error);
      throw error;
    }
  },
  async getAllWarehouses() {
    try {
      const response = await api().get('/warehouses/');
      return response.data;
    } catch (error) {
      console.error('Error fetching warehouse:', error);
      throw error;
    }
  },
  async updateWarehouse(id: number, data: any) {
    try {
      const response = await api().put(`/warehouses/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating warehouse:', error);
      throw error;
    }
  },

  async deleteWarehouse(id: number) {
    try {
      const response = await api().delete(`/warehouses/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting warehouse:', error);
      throw error;
    }
  }
};

export default inventoryService;
