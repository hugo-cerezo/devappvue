<script setup lang="ts">
import Calendar from '@/components/Calendar.vue'
import Modal from '@/components/Modal.vue'
import { ref } from 'vue'
import type { DateClickArg } from '@fullcalendar/interaction/index.js'

const show = ref(false)
const type = ref('')
const edditing = ref()
const date = ref<DateClickArg>()

const events = ref([
  { title: 'event 1', fullDay: true, date: '2025-02-11' },
  { title: 'event 2', fullDay: true, date: '2025-02-12' },
])

const handleEdit = (data: any) => {
  edditing.value = data
  type.value = 'form:edit'
  show.value = true
}
</script>

<template>
  <Modal
    :show="show"
    :type="type"
    :event="edditing"
    @modal:show="((show = false), (type = ''))"
    @form:add="(values: any) => (events.push({ ...values, date: date?.dateStr }), (show = false))"
    @form:edit="
      (values: any) => {
        edditing.event.setProp('title', values.title)
        edditing.event.setAllDay(values.fullDay)
        if (values.fullDay == false) {
          edditing.event.setStart(values.start)
          edditing.event.setEnd(values.end)
        }
        show = false
        edditing = null
      }
    "
    @form:remove="(edditing.event.remove(), (show = false))"
  />

  <Calendar
    :events="events"
    @modal:create="(newDate) => ((show = true), (type = 'form:add'), (date = newDate))"
    @modal:edit="(event) => handleEdit(event)"
  />
</template>
