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
      type: Array as () => any,
      required: true,
    },
  },
  setup(props, { emit }) {
    const handleDateClick = (arg: DateClickArg) => {
      emit('modal:create', arg)
    }
    const eventClick = (arg: EventClickArg) => {
      emit('modal:edit', arg)
    }
    const calendarOptions: CalendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin, bootstrap5Plugin],
      initialView: 'dayGridMonth',
      events: props.events,
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
