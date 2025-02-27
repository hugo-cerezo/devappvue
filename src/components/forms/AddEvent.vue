<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { ref } from 'vue'
import { FAKE_RECIPE } from '@/config/constant'
import MealType from './fragments/MealType.vue'

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
        <div class="mb-2">
          <label for="" class="mb-3">Nouveau plat</label>
          <input type="text" placeholder="Nom" v-model="name" class="form-control" />
        </div>

        <MealType @change="(event) => (mealType = event.target.value)" />
      </div>
      <div class="border rounded p-2 mb-2 form-group">
        <label for="" class="mb-3">Produits</label>
        <div id="product-list" class="w-100 border rounded mb-2">
          <div class="d-flex flex-wrap">
            <div class="product-list-item border rounded col-3 d-flex justify-content-center m-1">
              <span>Product Exemple</span>
            </div>

            <div class="product-list-item border rounded col-3 d-flex justify-content-center m-1">
              <span>Product Exemple</span>
            </div>
            <div class="product-list-item border rounded col-3 d-flex justify-content-center m-1">
              <span>Product Exemple</span>
            </div>
            <div class="product-list-item border rounded col-3 d-flex justify-content-center m-1">
              <span>Product Exemple</span>
            </div>
          </div>
        </div>
        
        <select name="existing-entry" class="form-select mb-2">
          <option selected>Produits existant</option>
        </select>
        <div class="border rounded p-2 mb-2 form-group">
          <label for="" class="mb-3">Ajouter un produit</label>
          <input type="text" placeholder="Nom" class="form-control mb-2" />
          <div class="border rounded p-2 mb-2 form-group">
            <div class="d-flex">
              <div class="me-1">
                <label for="meat">Viande</label>
                <input class="form-check-input ms-1" type="checkbox" name="meat" />
              </div>
              <div class="me-1">
                <label for="fish">Poisson</label>
                <input class="form-check-input ms-1" type="checkbox" name="fish" />
              </div>
              <div class="me-1">
                <label for="vegetable">Légume</label>
                <input class="form-check-input ms-1" type="checkbox" name="vegetable" />
              </div>
              <div class="me-1">
                <label for="fruit">Fruit</label>
                <input class="form-check-input ms-1" type="checkbox" name="fruit" />
              </div>
              <div class="me-1">
                <label for="spice">Épice</label>
                <input class="form-check-input ms-1" type="checkbox" name="spice" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="d-flex justify-content-end mt-2">
    <button class="btn btn-primary me-1" @click="handleConfirm">Confirm</button>
    <button class="btn btn-danger" @click="handleCancel">Cancel</button>
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
