<script setup lang="ts">
import Calendar from '@/components/Calendar.vue'
import Modal from '@/components/Modal.vue'
import { ref } from 'vue'
import type { DateClickArg } from '@fullcalendar/interaction/index.js'
import Sidebar from '@/components/Sidebar.vue'
import { FAKE_EVENTS } from '@/config/constant'
import { dateFormater } from '@/helpers/dateFormater'
import apiService from '@/services/apiService'
import type { CalendarEvent } from '@/config/interfaces'

const show = ref(false)
const type = ref('')
const selectedCalendarEvent = ref()
const date = ref<DateClickArg>()

// const events = ref<CalendarEvent[]>(FAKE_EVENTS)
const events = ref<CalendarEvent[]>([])

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

const insertMenu = (event: any) => {
  const formater = new dateFormater()
  const menu = event.extendedProps
  const api = apiService
  const start: Date = event.start

  menu.days.forEach((day: any, i: number) => {    
    const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i)

    day.starter.forEach((starter: any) => {
      const data = {
        title: `${starter.name}`,
        date: formater.getFormatedDate(date),
        fullDay: true,
        type: 0,
        color: 'red',
        extendedProps: {
          ingredients: [],
          recipe: [],
        },
      }
      // api.createEvent(data)      
      // console.log(data.date);
      
      events.value.push(data)
    })
    day.mainCourse.forEach((mainCourse: any) => {
      const data = {
        title: `${mainCourse.name}`,
        date: formater.getFormatedDate(date),
        fullDay: true,
        type: 1,
        color: 'blue',
        extendedProps: {
          ingredients: [],
          recipe: [],
        },
      }
      // api.createEvent(data)
      events.value.push(data)
    })
    day.dessert.forEach((dessert: any) => {
      const data = {
        title: `${dessert.name}`,
        date: formater.getFormatedDate(date),
        fullDay: true,
        type: 2,
        color: 'green',
        extendedProps: {
          ingredients: [],
          recipe: [],
        },
      }
      // api.createEvent(data)
      events.value.push(data)
    })
  })
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
  <Sidebar />
  <Calendar
    :events="events"
    @modal:create="(newDate) => handleCreate(newDate)"
    @modal:edit="(event) => handleEdit(event)"
    @modal:describe="(event) => handleDescribe(event)"
    @menus:add="(arg) => insertMenu(arg)"
  />
</template>
