<script setup lang="ts">
import { MEAL_TYPES } from '@/config/constant'
import { mealModalStore } from '@/helpers/modalStore'
import { ref, onMounted } from 'vue'

defineEmits(['update'])

const mealType = ref(null)
onMounted(() => {
  const mealStore = mealModalStore()
  if (mealStore.data?.meal) {
    mealType.value = mealStore.data.meal.mealType
  }
})
</script>

<template>
  <div class="border rounded p-2 mb-2 form-group">
    <div class="d-flex">
      <!-- Loop through MEAL_TYPES and create radio buttons -->
      <div class="me-1" v-for="type in MEAL_TYPES" :key="type.id">
        <label :for="type.name">{{ type.name }}</label>
        <input class="form-check-input ms-1" type="radio" :id="type.name" name="mealType" :value="type.id"
          v-model="mealType" @change="$emit('update', mealType)" />
      </div>
    </div>
  </div>
</template>