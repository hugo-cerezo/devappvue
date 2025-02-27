<script setup lang="ts">
defineProps(['products'])
</script>
<template>
  <div id="product-list" class="w-100 border rounded mb-2">
    <div class="d-flex flex-wrap">
      <div
        v-if="!products.lenght"
        class="product-list-item border rounded col-3 d-flex justify-content-center m-1"
      >
        <span>Exemple</span>
      </div>
      <div
        v-for="product in products"
        class="product-list-item border rounded col-3 d-flex justify-content-center m-1"
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
  color: white;
  background-color: #0d6efd;
  cursor: pointer;
}
</style>
