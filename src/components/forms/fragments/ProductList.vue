<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ProductsService } from '@/services/ProductsServices'
import type { Products } from '@/config/interfaces'
import { mealModalStore } from '@/stores/mealStore'
const props = defineProps<{
  values: any[]
}>()
const emit = defineEmits(['remove'])
const mealStore = mealModalStore()
const products = ref<Products[]>([])
const api = new ProductsService()

onMounted(async () => {
  if (mealStore.data?.meal?.products) {
    const productIds = mealStore.data.meal.products // Get product IDs from the store
    products.value = await api.getproductsById(productIds) // Fetch products by IDs
    console.log('Fetched products:', products.value)
  }
})

const deletProduct = (productId: string) => {
  mealStore.data.meal.products.splice(mealStore.data.meal.products.indexOf(productId), 1)
}
</script>

<template>
  <div id="product-list" class="w-100 border rounded mb-2">
    <div class="d-flex flex-wrap">
      <div
        v-for="product in products"
        :key="product.id"
        class="product-list-item border rounded d-flex justify-content-center m-1"
        @click="deletProduct(product.id)"
      >
        <span class="text-capitalize">{{ product.name }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
#product-list {
  min-height: 10vh;
}

.product-list-item {
  width: 100px;
  color: white;
  background-color: #0d6efd;
  cursor: pointer;
  text-align: center;
}
</style>
