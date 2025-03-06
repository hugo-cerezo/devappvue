<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { onMounted, ref } from 'vue'
import { FAKE_RECIPE } from '@/config/constant'
import MealType from './fragments/MealType.vue'
import ProductList from './fragments/ProductList.vue'
import AddProduct from './fragments/AddProduct.vue'
import ExistingProducts from './fragments/ExistingProducts.vue'
import type { Products } from '@/config/interfaces'
import apiService from '@/services/apiService'
import type { Meals } from '@/config/interfaces'

const emit = defineEmits(['cancel', 'confirm'])
const selectedAction = ref('existing')
const selectedExistingEntry = ref(null)

const name = ref('')
const type = ref([])
const products = ref<Products[]>([])
var meals = ref<Meals[]>([])

const clear = () => {
  name.value = ''
}
const confirm = () => {
  console.log(name, type, products)
  return
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
  const data = await apiService.getMeals()
  if (data) {
    meals.value = data
  }
})
</script>

<template>
  <section v-if="selectedAction === 'existing'">
    <div class="form-group mb-2">
      <select name="existing-entry" class="form-select">
        <!-- peux etre faire un systeme de filtre celon le type de plat  -->
        <!-- pour affiner la recherche checkbox au desus du options ? -->
        <option selected :value="null">Plat existant</option>
        <option v-for="meal in meals" :value="meal" :v-model="selectedExistingEntry">
          {{ meal.name }}
        </option>
      </select>
    </div>
    <input type="button" value="Créer un nouveau plat" class="btn btn-primary w-100" @click="selectedAction = 'new'" />
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
  </section>

  <div class="d-flex justify-content-end mt-2">
    <button class="btn btn-primary me-1" @click="confirm">Confirm</button>
    <button class="btn btn-danger" @click="cancel">Cancel</button>
  </div>
</template>
