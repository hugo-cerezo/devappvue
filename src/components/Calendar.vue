<script lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import type { DateClickArg } from '@fullcalendar/interaction'
import bootstrap5Plugin from '@fullcalendar/bootstrap5'
// import the third-party stylesheets directly from your JS
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css' // needs additional webpack config!
import type { CalendarOptions } from '@fullcalendar/core/index.js'

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
      emit('update:showModal', arg)
    }
    const eventClick = (arg: any) => {
      if (confirm('Are you sure you want to delete this event?')) {
        arg.event.remove()
      }
    }
    const calendarOptions: CalendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin, bootstrap5Plugin],
      initialView: 'dayGridMonth',
      events: props.events,
      weekends: false,
      selectable: true,
      editable: true,
      dateClick: handleDateClick,
      eventClick: eventClick,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridYear,dayGridMonth,dayGridWeek,dayGridDay',
      },
    }

    return {
      calendarOptions,
    }
  },
}
</script>

<template>
  <FullCalendar id="calendar" :options="calendarOptions" />
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
