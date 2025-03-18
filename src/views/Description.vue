<script setup lang="ts">
import type { Meals } from '@/config/interfaces'
import { MealsService } from '@/services/MealsService'
import { ref, onMounted } from 'vue'

const props = defineProps<{ events: any }>()
const name = props.events.event._def.title
const datas = ref<Meals[]>([])
const mealsService = new MealsService()

onMounted(async () => {
  datas.value = await mealsService.getMealByName(name)
})
</script>

<template>
  <div id="main">
    <div v-if="datas.length > 0">
      <h5>Ingrédients</h5>
      <p v-for="i in datas[0].products" :key="i.name">
        {{ i.name }}
      </p>
    </div>
    <div v-else>
      <p>No ingredients found.</p>
    </div>
    <div>
      <div v-if="datas.length > 0">
        <h5>Recette</h5>
        <div v-for="(i, l) in datas[0].recipe" :key="l">
          <h6>Étape: {{ l + 1 }}</h6>
          <span>{{ i }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
#main {
  max-height: 80vh;
  overflow-y: auto;
}
</style>
