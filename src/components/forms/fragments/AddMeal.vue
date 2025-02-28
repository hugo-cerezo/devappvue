<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
<template>
  <div class="mb-2">
    <label for="" class="mb-3">Nouveau plat</label>
    <input
      type="text"
      placeholder="Nom"
      v-model="value"
      class="form-control"
    />
  </div>
</template>
