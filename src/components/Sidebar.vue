<script setup lang="ts">
import { FAKE_EVENTS } from '@/config/constant'
import { onMounted, ref, nextTick } from 'vue'
import { Draggable } from '@fullcalendar/interaction/index.js'
import eventsService from '@/services/eventsService'
import type { CalendarEvent } from '@/config/interfaces'

const meals = ref(FAKE_EVENTS)
var newdata = ref<CalendarEvent[]>([])

onMounted(async () => {
  newdata.value = await eventsService.getEvents()
  if (newdata.value) {
    await nextTick() //obligatoire sinon les éléments ne sont pas encore rendus et donc ça plante
    newdata.value.forEach((event, i) => {
      let el = document.getElementById(event.id.toString())
      if (el) {
        new Draggable(el as HTMLElement, {
          eventData: newdata.value[i],
        })
      }
    })
  }
  await nextTick()
  meals.value?.forEach((event, i) => {
    let el = document.getElementById(event.id.toString())
    if (el) {
      new Draggable(el as HTMLElement, {
        eventData: meals.value[i],
      })
    }
  })
})
</script>
<template>
  <div class="col-2 me-1">
    <div class="border h-100">
      <p>Menus</p>
      <div class="wrapper">
        <div v-for="meal in meals" class="p-1 text-center" :key="meal.id">
          <div :id="meal.id.toString()" class="item rounded">
            {{ meal.title }}
          </div>
        </div>
      </div>
      <div class="wrapper">
        <div v-for="meal in newdata" class="p-1 text-center" :key="meal.id">
          <div :id="meal.id.toString()" class="item rounded">
            {{ meal.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="css" scoped>
.item {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: white;
  background-color: blue;
  /* cursor: pointer; */
}

.wrapper {
  display: grid;
  grid-template-columns: repeat(2, 50%);
}
</style>
