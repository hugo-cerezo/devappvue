<script setup lang="ts">
import { FAKE_EVENTS } from '@/config/constant'
import { onMounted, ref } from 'vue'
import { Draggable } from '@fullcalendar/interaction/index.js'
const meals = ref(FAKE_EVENTS)
onMounted(() => {
  meals.value?.forEach((event, i) => {
    let el = document.getElementById(event.id.toString())
    new Draggable(el as HTMLElement, {
      eventData: meals.value[i],
    })
  })
})
</script>
<template>
  <div class="col-2 me-1">
    <div class="border h-100">
      <p>Plats Existant</p>
      <div class="wrapper">
        <div v-for="meal in meals" class="p-1 text-center">
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
