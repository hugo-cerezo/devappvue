<script setup lang="ts">
import { MEAL_TYPES } from '@/config/constant'

defineEmits(['update'])
</script>
<template>
  <div class="border rounded p-2 mb-2 form-group">
    <div class="d-flex">
      <div class="me-1" v-for="type in MEAL_TYPES">
        <label for="entree">{{ type.name }}</label>
        <input
          class="form-check-input ms-1"
          type="radio"
          name="entree"
          :value="type"
          @change="$emit('update', type)"
        />
      </div>
    </div>
  </div>
</template>
