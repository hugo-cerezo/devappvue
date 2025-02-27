<script setup lang="ts">
import Calendar from '@/components/Calendar.vue'
import Modal from '@/components/Modal.vue'
import { ref } from 'vue'
import type { DateClickArg } from '@fullcalendar/interaction/index.js'
import type { CalendarEvent } from '@/config/interfaces'
import { FAKE_EVENTS } from '@/config/constant'

/** A SUPPRIMER */
const today = new Date()
const month = () => {
  if (today.getMonth().toString().length < 2) {
    let currMonth = today.getMonth() + 1
    return '0' + currMonth
  } else {
    return today.getMonth().toString()
  }
}

const show = ref(false)
const type = ref('')
const selectedCalendarEvent = ref()
const date = ref<DateClickArg>()

const events = ref(FAKE_EVENTS)

const handleCreate = (newDate: any) => {
  date.value = newDate
  type.value = 'form:add'
  show.value = true
}

const handleEdit = (data: any) => {
  selectedCalendarEvent.value = data
  type.value = 'form:edit'
  show.value = true
}

const handleDescribe = (event: any) => {
  selectedCalendarEvent.value = event
  type.value = 'show:description'
  show.value = true
}
</script>

<template>
  <Modal
    :show="show"
    :type="type"
    :event="selectedCalendarEvent"
    @modal:show="((show = false), (type = ''))"
    @form:add="(values: any) => (events.push({ ...values, date: date?.dateStr }), (show = false))"
    @form:edit="
      (values: any) => {
        selectedCalendarEvent.event.setProp('title', values.title)
        selectedCalendarEvent.event.setAllDay(values.fullDay)
        if (values.fullDay == false) {
          selectedCalendarEvent.event.setStart(values.start)
          selectedCalendarEvent.event.setEnd(values.end)
        }
        show = false
        selectedCalendarEvent = null
      }
    "
    @form:remove="(selectedCalendarEvent.event.remove(), (show = false))"
  />

  <Calendar
    :events="events"
    @modal:create="(newDate) => handleCreate(newDate)"
    @modal:edit="(event) => handleEdit(event)"
    @modal:describe="(event) => handleDescribe(event)"
  />
</template>
