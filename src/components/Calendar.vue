<script lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

import type { DateClickArg } from '@fullcalendar/interaction'
import type { CalendarOptions, EventClickArg } from '@fullcalendar/core/index.js'

import bootstrap5Plugin from '@fullcalendar/bootstrap5'
// import the third-party stylesheets directly from your JS
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css' // needs additional webpack config!

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
      const el = arg.el.childNodes[0].childNodes[1] as HTMLElement
      el.style.display === 'none' ? (el.style.display = 'block') : (el.style.display = 'none')
    }
    const calendarOptions: CalendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin, bootstrap5Plugin],
      initialView: 'dayGridMonth',
      eventOrder: 'type',
      events: props.events,
      eventDidMount: (arg) => {
        let icon = document.createElement('i')
        icon.classList.add('bi', 'bi-pencil-fill', 'pe-1')
        icon.addEventListener('click', (event) => {
          event.stopPropagation()
          emit('modal:edit', arg)
        })
        arg.el.childNodes[0].childNodes[0].appendChild(icon)

        let desc = document.createElement('p')
        desc.classList.add('description')
        desc.textContent = 'lalala'
        desc.style.display = 'none'

        arg.el.childNodes[0].appendChild(desc)
      },
      weekends: false,
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
</style>
