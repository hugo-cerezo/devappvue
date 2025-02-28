<script setup lang="ts">
import { ref } from 'vue'
interface Product {
  name: string
}

const props = defineProps<{
  values: Product[]
}>()
</script>
<template>
  <div id="product-list" class="w-100 border rounded mb-2">
    <div class="d-flex flex-wrap">
      <div
        v-for="product in props.values"
        class="product-list-item border rounded d-flex justify-content-center m-1"
      >
        <span>{{ product.name }}</span>
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
