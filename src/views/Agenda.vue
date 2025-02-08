<script setup lang="ts">
import Calendar from '@/components/Calendar.vue'
import Modal from '@/components/Modal.vue'
import { ref } from 'vue'

const showModal = ref(false)
</script>

<template>
  <Modal :show="showModal" @update:show="showModal = false" />
  <Calendar @update:showModal="showModal = true" />
</template>
