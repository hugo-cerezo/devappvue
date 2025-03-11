<script lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import type { DateClickArg } from '@fullcalendar/interaction'
import type { CalendarOptions, EventClickArg } from '@fullcalendar/core/index.js'

import { defineIconType } from '@/helpers/calendarIcons'

import bootstrap5Plugin from '@fullcalendar/bootstrap5'
// import the third-party stylesheets directly from your JS
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css' // needs additional webpack config!

// import saladUrl from '@/assets/icons/salad.png'
// import foodUrl from '@/assets/icons/food.png'
// import desertUrl from '@/assets/icons/dessert.png'

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  props: {
    events: {
      type: Object as any,
      required: true,
    },
  },
  setup(props, { emit }) {
    const handleDateClick = (arg: DateClickArg) => {
      emit('modal:create', arg)
    }

    const eventClick = (arg: EventClickArg) => {
      emit('modal:describe', arg)
    }

    const calendarOptions: CalendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin, bootstrap5Plugin],
      droppable: true,
      initialView: 'dayGridWeek',
      eventOrder: 'type',
      events: props.events,
      eventDurationEditable: false,
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

    return {
      calendarOptions,
    }
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
/* .fc-daygrid-day-frame:hover {
  cursor: pointer !important;
  box-shadow: inset 0 0 0 2px blue;
} */
</style>
