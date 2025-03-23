<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import type { DateClickArg } from '@fullcalendar/interaction'
import type { CalendarOptions, EventClickArg } from '@fullcalendar/core/index.js'

import { defineIconType } from '@/helpers/calendarIcons'
import bootstrap5Plugin from '@fullcalendar/bootstrap5'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { EventsService } from '@/services/EventsService'
import { defineEmits } from 'vue'

const emit = defineEmits(['modal:create', 'modal:describe', 'modal:edit', 'menus:add'])

const eventsService = new EventsService()
const handleDateClick = (arg: DateClickArg) => {
  emit('modal:create', arg)
}

const eventClick = (arg: EventClickArg) => {
  emit('modal:describe', arg)
}

const calendarOptions: CalendarOptions = {
  plugins: [dayGridPlugin, interactionPlugin, bootstrap5Plugin],
  droppable: true,
  initialView: 'dayGridMonth',
  eventOrder: (event: any) => {
    return event.extendedProps.meal.type.id
  },
  events: async function (fetchInfo, successCallback, failureCallback) {
    try {
      const events = await eventsService.getEvents()
      successCallback(events)
    } catch (error) {
      failureCallback(error as Error)
    }
  },
  eventDurationEditable: false,
  firstDay: 1,
  eventDidMount: (arg) => {
    const node = arg.el.childNodes[0].childNodes[0] as HTMLElement
    const iconType = defineIconType(arg.event)
    const editIcon = document.createElement('i')
    editIcon.classList.add('bi', 'bi-pencil-fill', 'pe-1')
    editIcon.addEventListener('click', (event) => {
      event.stopPropagation()
      emit('modal:edit', arg)
    })

    node.prepend(iconType)
    node.appendChild(editIcon)
  },
  eventReceive(arg) {    
    if (arg.event.extendedProps.days) {
      arg.revert()      
      emit('menus:add', arg.event)
    }
  },
  weekends: true,
  selectable: true,
  editable: true,
  locale: 'fr',
  dateClick: handleDateClick,
  eventClick: eventClick,
  headerToolbar: {
    left: 'prev,next today myButton',
    center: 'title',
    right: 'dayGridYear,dayGridMonth,dayGridWeek,dayGridDay',
  },
  customButtons: {
    myButton: {
      text: 'Custom',
      click: () => alert('custom button clicked!'),
    },
  },
}
</script>

<template>
  <FullCalendar id="calendar" ref="fullCalendar" :options="calendarOptions" />
</template>

<style lang="css" scoped>
.viewBtn {
  margin-right: 5px;
}
#calendar {
  width: 1100px;
}
</style>

<style lang="css">
#app {
  display: flex;
}
</style>
