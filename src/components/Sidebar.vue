<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Draggable } from '@fullcalendar/interaction/index.js'

const MENUS = [
  {
    id: '67c97bed0361520f65a31abc',
    name: 'Menu 1',
    days: [
      {
        starter: [{ id: '67c97bed0361520f65a31fae', name: 'Onion rings' }],
        mainCourse: [
          {
            id: '67c97b5e0361520f65a31f92',
            name: 'Pizza margherita',
          },
        ],
        dessert: [
          {
            id: '67c97bc20361520f65a31fa1',
            name: 'Vanilla ice cream',
          },
        ],
      },
      {
        starter: [{ id: '67c97bed0361520f65a31fae', name: 'Onion rings' }],
        mainCourse: [
          {
            id: '67c97b5e0361520f65a31f92',
            name: 'Pizza margherita',
          },
        ],
        dessert: [
          {
            id: '67c97bc20361520f65a31fa1',
            name: 'Vanilla ice cream',
          },
        ],
      },
      {
        starter: [{ id: '67c97bed0361520f65a31fae', name: 'Onion rings' }],
        mainCourse: [
          {
            id: '67c97b5e0361520f65a31f92',
            name: 'Pizza margherita',
          },
        ],
        dessert: [
          {
            id: '67c97bc20361520f65a31fa1',
            name: 'Vanilla ice cream',
          },
        ],
      },
      {
        starter: [{ id: '67c97bed0361520f65a31fae', name: 'Onion rings' }],
        mainCourse: [
          {
            id: '67c97b5e0361520f65a31f92',
            name: 'Pizza margherita',
          },
        ],
        dessert: [
          {
            id: '67c97bc20361520f65a31fa1',
            name: 'Vanilla ice cream',
          },
        ],
      },
      {
        starter: [{ id: '67c97bed0361520f65a31fae', name: 'Onion rings' }],
        mainCourse: [
          {
            id: '67c97b5e0361520f65a31f92',
            name: 'Pizza margherita',
          },
        ],
        dessert: [
          {
            id: '67c97bc20361520f65a31fa1',
            name: 'Vanilla ice cream',
          },
        ],
      },
    ],
  },
  {
    id: '67c97bed0361520f65a31def',
    name: 'Menu 2',
    days: [
      {
        starter: [{ id: '67c97bed0361520f65a31fae', name: 'Onion rings' }],
        mainCourse: [
          {
            id: '67c97b5e0361520f65a31f92',
            name: 'Pizza margherita',
          },
        ],
        dessert: [
          {
            id: '67c97bc20361520f65a31fa1',
            name: 'Vanilla ice cream',
          },
        ],
      },
    ],
  },
]
const menus = ref(MENUS)
onMounted(() => {
  menus.value?.forEach((event, i) => {
    let el = document.getElementById(event.id.toString())
    new Draggable(el as HTMLElement, {
      eventData: menus.value[i],
      // itemSelector: '.item',
    })
  })
})
</script>
<template>
  <div class="col-2 me-1">
    <div class="border h-100">
      <p>Menus</p>
      <div class="wrapper">
        <div v-for="menu in menus" class="p-1 text-center">
          <div :id="menu.id.toString()" class="item rounded" @click="$emit('menu:selected', menu)">
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
