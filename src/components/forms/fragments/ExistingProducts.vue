<script setup lang="ts">
import { PRODUCTS_TYPES } from '@/config/constant'
import { onMounted, ref, watch } from 'vue'
import apiService from '@/services/apiService'
import type { Products } from '@/config/interfaces'

const props = defineProps(['values'])
const emit = defineEmits(['update'])
const checked = ref(props.values)
const products = ref<Products[]>()

onMounted(async () => {
  products.value = await apiService.getProducts()
})

watch(checked, (values: any[]) => {
  emit('update', values)
})
</script>
<template>
  <div class="border rounded p-2 mb-2 form-group wrapper">
    <div class="ms-2 me-2" v-for="type in PRODUCTS_TYPES">
      <div class="d-flex w-100 justify-content-center border-bottom">
        <label for="" class="text-center text-capitalize">{{ type }}</label>
      </div>
      <div v-for="product in products">
        <div class="form-check" v-if="product.type.name === type">
          <label :for="product.name" class="text-capitalize truncate">{{ product.name }}</label>
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

.wrapper {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
}

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
