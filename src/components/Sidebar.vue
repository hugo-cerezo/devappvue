<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue'
import { Draggable } from '@fullcalendar/interaction/index.js'
import type { Menu } from '@/config/interfaces'
import { MenusService } from '@/services/MenusService'
import { useModalStore } from '@/stores/modalStore'
import { menuModalStore } from '@/stores/menuStore'

const menusService = new MenusService()
const menus = ref<Menu[]>([]) // Liste des menus

onMounted(async () => {
  menus.value = await menusService.getMenus()

  menus.value.forEach(async (event, i) => {
    const id = await event.id
    let el = document.getElementById(event.id)
    new Draggable(el as HTMLElement, {
      eventData: menus.value[i],
      // itemSelector: '.item',
    })
  })
})

const openMenu = (menu?: Menu) => {
  menuModalStore().setData(menu)
  useModalStore().show('menu:description', 95)
}
</script>
<template>
  <div class="col-2 me-1">
    <div class="border h-100">
      <p>Menus</p>
      <div class="item rounded" @click="openMenu()">new menu</div>
      <div class="wrapper">
        <div v-for="menu in menus" class="p-1 text-center">
          <div :id="menu.id" class="item rounded" @click="openMenu(menu)">
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
