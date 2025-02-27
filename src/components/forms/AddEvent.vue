<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { ref } from 'vue'
import { FAKE_RECIPE } from '@/config/constant'

const emit = defineEmits(['cancel', 'confirm'])
const name = ref('')
const selectedAction = ref('existing')
const selectedExistingEntry = ref(null)

const clear = () => {
  name.value = ''
}
const handleConfirm = () => {
  console.log(selectedExistingEntry)
  return;
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

  <div v-if="selectedAction === 'new'" class="border rounded p-2 mb-2 form-group">
    <div class="mb-2">
      <label for="">Nouveau plat</label>
      <input type="text" placeholder="Nom" v-model="name" class="form-control" />
      <label for="">Type</label>
      <div class="border rounded p-2 mb-2 form-group d-flex">
        <div class="me-1">
          <label for="entree">Entrée</label>
          <input class="form-check-input ms-1" type="checkbox" name="entree" />
        </div>
        <div class="me-1">
          <label for="launch">Plat</label>
          <input class="form-check-input ms-1" type="checkbox" name="launch" />
        </div>
        <div class="me-1">
          <label for="dessert">Déssert</label>
          <input class="form-check-input ms-1" type="checkbox" name="dessert" />
        </div>
      </div>
    </div>
    <div class="border rounded p-2 mb-2 form-group">
      <label for="">Produits</label>
      <select name="existing-entry" class="form-select mb-2">
        <option selected>Produits existant</option>
      </select>
      <div class="border rounded p-2 mb-2 form-group">
        <label for="">Ajouter un produit</label>
        <input type="text" placeholder="Nom" class="form-control" />
      </div>
    </div>
  </div>

  <div class="d-flex justify-content-end mt-2">
    <button class="btn btn-primary me-1" @click="handleConfirm">Confirm</button>
    <button class="btn btn-danger" @click="handleCancel">Cancel</button>
  </div>
</template>

<style lang="css" scoped></style>
