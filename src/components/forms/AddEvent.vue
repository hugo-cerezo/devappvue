<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { onMounted, ref } from 'vue'
import MealType from './fragments/MealType.vue'
import ProductList from './fragments/ProductList.vue'
import AddProduct from './fragments/AddProduct.vue'
import ExistingProducts from './fragments/ExistingProducts.vue'
import type { Meals, Products } from '@/config/interfaces'
import { MealsService } from '@/services/MealsService'

const emit = defineEmits(['cancel', 'confirm'])
const selectedAction = ref('existing')
const selectedExistingEntry = ref(null)
const meals = ref<Meals[]>([])
const api = new MealsService()

const name = ref('')
const type = ref([])
const products = ref<Products[]>([])

const clear = () => {
  name.value = ''
}
const confirm = () => {
  switch (selectedAction.value) {
    case 'existing':
      if (selectedExistingEntry.value) {
        emit('confirm', selectedExistingEntry.value)
      }
      break
    case 'new':
      emit('confirm', { name: name.value, type: type.value, products: products.value })
      break
  }
  clear()
}
const cancel = () => {
  emit('cancel')
  clear()
}

const removeProduct = (product: Products) => {
  products.value.splice(
    products.value.findIndex((p) => p.name === product.name),
    1,
  )
}

onMounted(async () => {
  meals.value = await api.getMeals()
})
</script>

<template>
  <section v-if="selectedAction === 'existing'">
    <div class="form-group mb-2">
      <select name="existing-entry" class="form-select" v-model="selectedExistingEntry">
        <option selected :value="null">Plat existant</option>
        <option v-for="meal in meals" :key="meal.id" :value="meal">{{ meal.name }}</option>
      </select>
    </div>
    <div class="d-flex justify-content-end mt-2">
      <button class="btn btn-primary me-1" @click="confirm">Confirm</button>
      <button class="btn btn-danger me-1" @click="cancel">Cancel</button>
      <button class="btn btn-secondary" @click="selectedAction = 'new'">
        Créer un nouveau plat
      </button>
    </div>
  </section>

  <section v-if="selectedAction === 'new'">
    <div class="border rounded p-2 mb-2 form-group">
      <div class="mb-2">
        <div class="mb-2">
          <label for="" class="mb-3">Nouveau plat</label>
          <input type="text" placeholder="Nom" v-model="name" class="form-control" />
        </div>
        <MealType @update="(d) => (type = d)" />
      </div>
      <div class="border rounded p-2 mb-2 form-group">
        <label for="" class="mb-3">Produits</label>
        <ProductList :values="products" @remove="removeProduct" />
        <ExistingProducts :values="products" @update="(checked: any) => (products = checked)" />
        <AddProduct />
      </div>
    </div>

    <div class="d-flex justify-content-end mt-2">
      <button class="btn btn-primary me-1" @click="confirm">Confirm</button>
      <button class="btn btn-danger me-1" @click="cancel">Cancel</button>
      <button class="btn btn-secondary" @click="selectedAction = 'existing'">
        Plats existants
      </button>
    </div>
  </section>
</template>
