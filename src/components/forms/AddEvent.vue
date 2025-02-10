<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { ref } from 'vue'

const emit = defineEmits(['cancel', 'confirm'])

const name = ref('')
const fullDay = ref(true)

const clear = () => {
  name.value = ''
  fullDay.value = true
}
const handleConfirm = () => {
  emit('confirm', { title: name.value, fullDay: fullDay.value })
  clear()
}
const handleCancel = () => {
  emit('cancel')
  clear()
}
</script>

<template>
  <input type="text" placeholder="Name" v-model="name" class="w-100" />
  <div>
    <input
      type="checkbox"
      name="Fullday"
      id="Fullday"
      v-model="fullDay"
      class="form-check-input"
      @click="fullDay = !fullDay"
    />
    <label for="Fullday" class=".pl-2 form-check-label ms-1">{{ fullDay }}</label>
  </div>
  <div class="d-flex justify-content-end">
    <button class="btn btn-primary me-1" @click="handleConfirm">Confirm</button>
    <button class="btn btn-danger" @click="handleCancel">Cancel</button>
  </div>
</template>

<style lang="css" scoped>
</style>
