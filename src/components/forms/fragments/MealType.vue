<script setup lang="ts">
import { ref } from 'vue'

const selected = ref(null)
</script>
<template>
  <div class="border rounded p-2 mb-2 form-group">
    <div class="d-flex">
      <div class="me-1">
        <label for="entree">Entrée</label>
        <input
          class="form-check-input ms-1"
          type="radio"
          name="entree"
          value="0"
          v-model="selected"
        />
      </div>

      <div class="me-1">
        <label for="launch">Plat</label>
        <input
          class="form-check-input ms-1"
          type="radio"
          name="launch"
          value="1"
          v-model="selected"
        />
      </div>

      <div class="me-1">
        <label for="dessert">Déssert</label>
        <input
          class="form-check-input ms-1"
          type="radio"
          name="dessert"
          value="2"
          v-model="selected"
        />
      </div>
    </div>
  </div>
</template>
