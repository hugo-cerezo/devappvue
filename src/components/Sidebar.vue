<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Draggable } from '@fullcalendar/interaction/index.js'
import type { Menu } from '@/config/interfaces'
import MenusService from '@/services/MenusService'

const menus = ref<Menu[]>([]) // Liste des menus

onMounted(async () => {
  menus.value = await MenusService.getMenus()
  console.log('Menus récupérés :', menus.value)
  menus.value?.forEach((menu) => {
    const el = document.getElementById(menu.id)
    if (el) {
      console.log(`Initialisation du Draggable pour le menu : ${menu.name}`)
      new Draggable(el, {
        eventData: {
          id: menu.id,
          title: menu.name,
        },
      })
    } else {
      console.error(`Élément non trouvé pour le menu avec ID : ${menu.id}`)
    }
  })
})
</script>
<template>
  <div class="col-2 me-1">
    <div class="border h-100">
      <p>Menus</p>
      <!-- <div class="item rounded" @click="$emit('menu:add')">new menu</div> -->
      <div class="wrapper">
        <div v-for="menu in menus" class="p-1 text-center">
          <div :id="menu.id" class="item rounded" @click="$emit('menu:selected', menu)">
            {{ menu.name }}
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
  cursor: pointer;
}

.wrapper {
  display: grid;
  grid-template-columns: repeat(2, 50%);
}
</style>
