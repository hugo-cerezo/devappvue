<script lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import bootstrap5Plugin from '@fullcalendar/bootstrap5'

// import the third-party stylesheets directly from your JS
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css' // needs additional webpack config!

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin, bootstrap5Plugin],
        initialView: 'dayGridMonth',
        dateClick: (arg: { dateStr: string }) => this.handleDateClick(arg),
        events: [{ title: 'event 1', date: '2025-02-10' }],
        weekends: false,
      },
    }
  },
  methods: {
    handleDateClick: function (arg: { dateStr: string }) {
      alert('date click! ' + arg.dateStr)
    },
    changeView: function (view: string) {
      console.log((this.$refs.fullCalendar as any).getApi().changeView(view))
    },
  },
}
</script>

<template>
  <div>
    <div class="d-flex flex-row">
      <button @click="changeView('dayGridYear')" class="viewBtn btn btn-primary">Year</button>
      <button @click="changeView('dayGridMonth')" class="viewBtn btn btn-primary">Month</button>
      <button @click="changeView('dayGridWeek')" class="viewBtn btn btn-primary">Week</button>
      <button @click="changeView('dayGridDay')" class="viewBtn btn btn-primary">Day</button>
      <button @click="changeView('dayGrid')" class="viewBtn btn btn-primary">Generic</button>
    </div>
    <FullCalendar id="calendar" ref="fullCalendar" :options="calendarOptions" />
  </div>
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
