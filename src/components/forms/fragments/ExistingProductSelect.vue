<script setup lang="ts">
import { ref } from 'vue'
import { FAKE_PRODUCTS } from '@/config/constant'

const selected = ref([])
</script>
<template>
  <!-- Ne marche pas sur mobile, obligation de rester appuyer sur SHIFT ennuyante :( -->
  <select name="existing-entry" class="form-select mb-2" v-model="selected" multiple>
    <option v-for="product in FAKE_PRODUCTS" :value="product">{{ product.name }}</option>
  </select>
</template>
