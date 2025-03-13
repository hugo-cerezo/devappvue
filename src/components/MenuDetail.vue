<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps<{
  menu: any
  show: boolean
}>()

const show = ref(true)

const currDay = (i: number) => {
  switch (i) {
    case 0:
      return 'Lundi'
    case 1:
      return 'Mardi'
    case 2:
      return 'Mercredi'
    case 3:
      return 'Jeudi'
    case 4:
      return 'Vendredi'
    case 5:
      return 'Samedi'
    case 6:
      return 'Dimanche'
  }
}
</script>
<template>
  <div v-show="props.show">
    <button @click="show = !show">azpoejd</button>
    <div class="d-flex col-12 justify-content-between">
      <div v-for="(day, i) in props.menu.days" class="col-2" v-if="show == true">
        <p>{{ currDay(i) }}</p>
        <div v-for="starter in day.starter" class="meal rounded border mb-1">
          {{ starter.name }}
        </div>
        <div v-for="mainCourse in day.mainCourse" class="meal rounded border mb-1">
          {{ mainCourse.name }}
        </div>
        <div v-for="dessert in day.dessert" class="meal rounded border mb-1">
          {{ dessert.name }}
        </div>
        <br />
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.meal {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
