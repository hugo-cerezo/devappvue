<script setup lang="ts">
import { PRODUCTS_TYPES } from '@/config/constant'
</script>
<template>
  <div class="border rounded p-2 mb-2 form-group">
    <label for="" class="mb-3">Ajouter un produit</label>
    <input type="text" placeholder="Nom" class="form-control mb-2" />
    <div class="border rounded p-2 mb-2 form-group">
      <div class="d-flex">
        <div class="me-1" v-for="type in PRODUCTS_TYPES">
          <label class="text-capitalize" for="meat">{{ type }}</label>
          <input class="form-check-input ms-1" type="checkbox" :name="type" />
        </div>
      </div>
    </div>
  </div>
</template>
