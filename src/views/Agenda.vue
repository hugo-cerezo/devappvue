<script setup lang="ts">
import Calendar from '@/components/Calendar.vue'
import Modal from '@/components/Modal.vue'
import { ref } from 'vue'

const showModal = ref(false)
const formType = ref('')
const events = ref([{ title: 'event 1', fullDay: true, date: '2025-02-11' }])
const calendarSelect = ref('')
</script>

<template>
  <Modal
    :show="showModal"
    :formType="formType"
    @update:show="() => (showModal = false)"
    @update:addEvent="(event) => events.push({ ...event, date: calendarSelect })"
  />

  <Calendar
    :events="events"
    @update:showModal="
      (data) => ((showModal = true), (formType = 'form:addEvent'), (calendarSelect = data))
    "
  />
</template>
