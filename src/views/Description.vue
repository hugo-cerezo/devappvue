<script setup lang="ts">
let event = defineProps(['events'])
let ingredients = event.events.event.extendedProps.ingredients
let recipe = event.events.event.extendedProps.recipe
</script>
<template>
  <div id="main">
    <div>
      <h5>Ingrégients</h5>
      <p v-for="i in ingredients">
        {{ i.name }}, {{ i.quantity }}{{ i.weight }}
      </p>
    </div>
    <div>
      <h5>Recette</h5>
      <p v-for="(i, l) in recipe">
        <h6>Etape: {{ l + 1 }}</h6>
        <span>{{ i }}</span>
      </p>
    </div>
  </div>
</template>
<style lang="css" scoped>
#main {
  max-height: 80vh;
  overflow-y: auto;
}
</style>
