<script setup lang="ts">
import Calendar from '@/components/Calendar.vue'
import Modal from '@/components/Modal.vue'
import { ref } from 'vue'
import type { DateClickArg } from '@fullcalendar/interaction/index.js'
import Sidebar from '@/components/Sidebar.vue'
import { dateFormater } from '@/helpers/dateFormater'
import apiService from '@/services/apiService'
import type { FullCalendarEvent } from '@/config/interfaces'

const generateUniqueId = () => '_' + Math.random().toString(36).substr(2, 9)
const show = ref(false)
const type = ref('')
const selectedCalendarEvent = ref()
const date = ref<DateClickArg>()
const selectedMenu = ref()
const modalWidth = ref()

// const events = ref<CalendarEvent[]>(FAKE_EVENTS)
const events = ref<FullCalendarEvent[]>([])

const handleCreate = (newDate: any) => {
  date.value = newDate
  type.value = 'form:add'
  show.value = true
  modalWidth.value = 75
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
        id: generateUniqueId(), // Add unique ID
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
      events.value.push(data)
    })
    day.mainCourse.forEach((mainCourse: any) => {
      const data = {
        id: generateUniqueId(), // Add unique ID
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
        id: generateUniqueId(), // Add unique ID
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

  // refetch the events
  console.log(events.value)
}

const formRemove = () => {
  // Edit the event in the database instead of removing it then refetch the events
  const event = selectedCalendarEvent.value.event
  const id = event.id
  const index = events.value.findIndex((event) => event.id === id)
  events.value.splice(index, 1) 
  event.remove()
  show.value = false
  
}
</script>

<template>
  <Modal
    :show="show"
    :type="type"
    :event="selectedCalendarEvent"
    :menu="selectedMenu"
    :width="modalWidth"
    @modal:show="((show = false), (type = ''))"
    @form:add="
      (values: any) => (
        events.push({ ...values, date: date?.dateStr }), (show = false), (modalWidth = 75)
      )
    "
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
    @form:remove="formRemove"
  />
  <Sidebar
    @menu:selected="
      (menu) => {
        show = !show
        type = 'menu:description'
        selectedMenu = menu
        modalWidth = 90
      }
    "
  />

  <Calendar
    :events="events"
    @modal:create="(newDate) => handleCreate(newDate)"
    @modal:edit="(event) => handleEdit(event)"
    @modal:describe="(event) => handleDescribe(event)"
    @menus:add="(arg) => insertMenu(arg)"
  />
</template>
