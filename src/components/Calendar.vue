<script lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import bootstrap5Plugin from '@fullcalendar/bootstrap5'
import { ref } from 'vue'

// import the third-party stylesheets directly from your JS
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css' // needs additional webpack config!

const events = ref([{ title: 'Bolognaise', date: '2025-02-10', allDay: true }])

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin, bootstrap5Plugin],
        initialView: 'dayGridMonth',
        weekends: false,
        selectable: true,
        editable: true,
        dateClick: (arg: { dateStr: string }) => this.handleDateClick(arg),
        eventClick: (arg: any) => this.eventClick(arg),
        // select: (arg: { startStr: string; endStr: string }) => this.handleDateSelect(arg),
        events: events.value,
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridYear,dayGridMonth,dayGridWeek,dayGridDay',
        },
      },
    }
  },
  methods: {
    handleDateClick: (arg: { dateStr: string }) => {
      alert('date click! ' + arg.dateStr)
    },
    eventClick: (arg: any) => {
      if (confirm('Are you sure you want to delete this event?')) {
        arg.event.remove()
      }
    },
    // handleDateSelect: (arg: { startStr: string; endStr: string }) => {
    //   alert('selected ' + arg.startStr + ' to ' + arg.endStr)
    // },
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
