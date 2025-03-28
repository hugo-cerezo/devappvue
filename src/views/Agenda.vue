<script setup lang="ts">
import Calendar from '@/components/Calendar.vue'
import Modal from '@/components/Modal.vue'
import Sidebar from '@/components/Sidebar.vue'
import { onBeforeMount, onMounted, ref } from 'vue'
import { dateFormater } from '@/helpers/dateFormater'
import type { DateClickArg } from '@fullcalendar/interaction/index.js'
import type { FullCalendarEvent, Menu } from '@/config/interfaces'
import { MenusService } from '@/services/MenusService'

const generateUniqueId = () => '_' + Math.random().toString(36).substr(2, 9)
const show = ref(false)
const type = ref('')
const selectedEvent = ref()
const date = ref<DateClickArg>()
const menu: any = null
const selectedMenu = ref()
const modalWidth = ref()
const events = ref<FullCalendarEvent[]>([])

const handleEvent = (eventData: any, eventType: string) => {
  switch (eventType) {
    case 'form:add':
      date.value = eventData
      modalWidth.value = 75
      break
    case 'form:edit':
      selectedEvent.value = eventData
      break
    case 'show:description':
      selectedEvent.value = eventData
      break
  }
  type.value = eventType
  show.value = true
}

const insertMenu = (event: any) => {
  const formater = new dateFormater()
  const menu = event.extendedProps
  const start: Date = event.start

  Object.keys(menu.days).forEach((key: any, i: number) => {
    const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i)
    console.log(date)

    const data = {
      start: date,
      meals: 'ids',
    }

    const createEvent = (item: any, type: number, color: string) => {
      const data = {
        id: generateUniqueId(),
        title: item.name,
        date: formater.getFormatedDate(date),
        fullDay: true,
        type,
        color,
        extendedProps: {
          ingredients: [],
          recipe: [],
        },
      }
      events.value.push(data)
    }

    console.log(menu.days[key])

    // menu.days[key].starter.forEach((starter: any) => createEvent(starter, 0, 'red'))
    // menu.days[key].mainCourse.forEach((mainCourse: any) => createEvent(mainCourse, 1, 'blue'))
    // menu.days[key].dessert.forEach((dessert: any) => createEvent(dessert, 2, 'green'))
  })

  console.log(events.value)

  // Update the events in the calendar
}

const formRemove = () => {
  const event = selectedEvent.value.event
  const id = event.id
  const index = events.value.findIndex((event) => event.id === id)
  events.value.splice(index, 1)
  event.remove()
  show.value = false
}

const handleFormAdd = (values: any) => {
  console.log('agendavue', values)
  selectedEvent.value = values
  type.value = 'form:add'
  menu.value = values.menu
  show.value = true
  return
}

const handleFormEdit = (values: any) => {
  selectedEvent.value.event.setProp('title', values.title)
  selectedEvent.value.event.setAllDay(values.fullDay)
  if (!values.fullDay) {
    selectedEvent.value.event.setStart(values.start)
    selectedEvent.value.event.setEnd(values.end)
  }
  show.value = false
  selectedEvent.value = null
}
</script>

<template>
  <Modal
    :show="show"
    :type="type"
    :event="selectedEvent"
    :menu="selectedMenu"
    :width="modalWidth"
    @modal:show="
      () => {
        show = false
        type = ''
      }
    "
    @form:add="handleFormAdd"
    @form:edit="handleFormEdit"
    @form:remove="formRemove"
  />
  <Sidebar
    @form:add="handleFormAdd"
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
    @form:add="handleFormAdd"
    :events="events"
    @modal:create="(newDate) => handleEvent(newDate, 'form:add')"
    @modal:edit="(data) => handleEvent(data, 'form:edit')"
    @modal:describe="(event) => handleEvent(event, 'show:description')"
    @menus:add="insertMenu"
  />
</template>
