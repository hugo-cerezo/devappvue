<script setup lang="ts">
import { FAKE_PRODUCTS } from '@/config/constant'
import { FAKE_PRODUCTS_TYPES } from '@/config/constant'
import { ref } from 'vue'

const products = ref(FAKE_PRODUCTS)
</script>
<template>
  <div class="border rounded p-2 mb-2 form-group d-flex">
    <div class="ms-2 me-2" v-for="type in FAKE_PRODUCTS_TYPES">
      <div v-for="product in products">
        <div class="form-check" v-if="product.type === type">
          <label :for="product.name">{{ product.name }}</label>
          <input class="form-check-input" type="checkbox" :value="product" :name="product.name" />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="css" scoped></style>
