<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { ref } from 'vue'
import { FAKE_RECIPE } from '@/config/constant'
import MealType from './fragments/MealType.vue'
import ProductList from './fragments/ProductList.vue'
import AddProduct from './fragments/AddProduct.vue'
import ExistingProductSelect from './fragments/ExistingProductSelect.vue'
import AddMeal from './fragments/AddMeal.vue'

const emit = defineEmits(['cancel', 'confirm'])
const name = ref('')
const selectedAction = ref('existing')
const selectedExistingEntry = ref(null)
const mealType = ref('')

const clear = () => {
  name.value = ''
}
const handleConfirm = () => {
  console.log(selectedExistingEntry)
  return
  emit('confirm', { title: name.value, fullDay: true })
  clear()
}
const handleCancel = () => {
  emit('cancel')
  clear()
}
</script>

<template>
  <section v-if="selectedAction === 'existing'">
    <div class="form-group mb-2">
      <select name="existing-entry" class="form-select">
        <option selected :value="null">Plat existant</option>
        <option v-for="recipe in FAKE_RECIPE" :value="recipe" :v-model="selectedExistingEntry">
          {{ recipe.title }}
        </option>
      </select>
    </div>
    <input
      type="button"
      value="Créer un nouveau plat"
      class="btn btn-primary w-100"
      @click="selectedAction = 'new'"
    />
  </section>

  <section v-if="selectedAction === 'new'">
    <div class="border rounded p-2 mb-2 form-group">
      <div class="mb-2">
        <AddMeal />
        <MealType @change="(event) => (mealType = event.target.value)" />
      </div>
      <div class="border rounded p-2 mb-2 form-group">
        <label for="" class="mb-3">Produits</label>
        <ProductList :products="[]" />
        <ExistingProductSelect />
        <AddProduct />
      </div>
    </div>
  </section>

  <div class="d-flex justify-content-end mt-2">
    <button class="btn btn-primary me-1" @click="handleConfirm">Confirm</button>
    <button class="btn btn-danger" @click="handleCancel">Cancel</button>
  </div>
</template>
