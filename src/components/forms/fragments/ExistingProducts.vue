<script setup lang="ts">
import { FAKE_PRODUCTS } from '@/config/constant'
import { FAKE_PRODUCTS_TYPES } from '@/config/constant'
import { ref, watch } from 'vue'
import apiService from '@/services/apiService'
import type { Products } from '@/config/interfaces'

// const products = ref(FAKE_PRODUCTS)
const products = ref(apiService.getProducts())
const props = defineProps(['values'])
const checked = ref(props.values)
const emit = defineEmits(['update'])

watch(checked, (values: any[]) => {
  emit('update', values)
})
</script>
<template>
  <div class="border rounded p-2 mb-2 form-group d-flex">
    <div class="ms-2 me-2" v-for="type in FAKE_PRODUCTS_TYPES">
      <div class="d-flex w-100 justify-content-center border-bottom">
        <label for="" class="text-center text-capitalize">{{ type }}</label>
      </div>
      <div v-for="product in products">
        <div class="form-check" v-if="product.type === type">
          <label :for="product.name" class="text-capitalize">{{ product.name }}</label>
          <input
            :id="product.name"
            class="form-check-input"
            type="checkbox"
            :value="product"
            :name="product.name"
            v-model="checked"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="css" scoped>
label,
input {
  cursor: pointer;
}
</style>
