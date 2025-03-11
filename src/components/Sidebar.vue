<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Draggable } from '@fullcalendar/interaction/index.js'

const FAKE_MENUS = [
  {
    id: '67c97f760361520f65a3203c',
    name: 'Weekly Menu',
    menuDays: [
      {
        day: '2025-03-06',
        dailyMeals: [
          {
            id: '67c97b5e0361520f65a31f92',
            name: 'Pizza margherita',
            products: [
              {
                id: '67c97b5e0361520f65a31f94',
                name: 'Tomato sauce',
                orderDelay: 2,
                type: {
                  id: 11,
                  name: 'Sauce',
                },
                season: 1,
              },
              {
                id: '67c97b5e0361520f65a31f96',
                name: 'Mozzarella cheese',
                orderDelay: 1,
                type: {
                  id: 22,
                  name: 'Cheese',
                },
                season: 1,
              },
              {
                id: '67c97b5e0361520f65a31f98',
                name: 'Basil',
                orderDelay: 3,
                type: {
                  id: 33,
                  name: 'Herb',
                },
                season: 2,
              },
            ],
            recipe: [
              'Spread tomato sauce on the dough',
              'Add mozzarella cheese',
              'Bake at 200°C (392°F) for 15 minutes',
              'Top with fresh basil',
            ],
            type: {
              id: 1,
              name: 'plat',
            },
            customerSucces: 95,
          },
          {
            id: '67c97bc20361520f65a31fa1',
            name: 'Vanilla ice cream',
            products: [
              {
                id: '67c97bc20361520f65a31fa3',
                name: 'Cream',
                orderDelay: 2,
                type: {
                  id: 10,
                  name: 'Dairy',
                },
                season: 1,
              },
              {
                id: '67c97bc20361520f65a31fa5',
                name: 'Sugar',
                orderDelay: 1,
                type: {
                  id: 11,
                  name: 'Sweetener',
                },
                season: 0,
              },
              {
                id: '67c97bc20361520f65a31fa7',
                name: 'Vanilla extract',
                orderDelay: 3,
                type: {
                  id: 12,
                  name: 'Flavoring',
                },
                season: 0,
              },
            ],
            recipe: [
              'Mix cream and sugar thoroughly',
              'Stir in vanilla extract',
              'Freeze the mixture until solid',
            ],
            type: {
              id: 1,
              name: 'Dessert',
            },
            customerSucces: 90,
          },
          {
            id: '67c97bed0361520f65a31fae',
            name: 'Onion rings',
            products: [
              {
                id: '67c97bed0361520f65a31fb0',
                name: 'Onions',
                orderDelay: 2,
                type: {
                  id: 1,
                  name: 'Vegetable',
                },
                season: 2,
              },
              {
                id: '67c97bed0361520f65a31fb2',
                name: 'Flour',
                orderDelay: 1,
                type: {
                  id: 2,
                  name: 'Baking Ingredient',
                },
                season: 0,
              },
              {
                id: '67c97bed0361520f65a31fb4',
                name: 'Eggs',
                orderDelay: 1,
                type: {
                  id: 3,
                  name: 'Poultry Product',
                },
                season: 0,
              },
              {
                id: '67c97bed0361520f65a31fb6',
                name: 'Breadcrumbs',
                orderDelay: 2,
                type: {
                  id: 4,
                  name: 'Baking Ingredient',
                },
                season: 0,
              },
              {
                id: '67c97bed0361520f65a31fb8',
                name: 'Cooking oil',
                orderDelay: 1,
                type: {
                  id: 5,
                  name: 'Oil',
                },
                season: 0,
              },
            ],
            recipe: [
              'Slice onions into rings',
              'Coat them in flour',
              'Dip them in beaten eggs',
              'Roll them in breadcrumbs',
              'Fry in hot oil until golden brown',
            ],
            type: {
              id: 6,
              name: 'entre',
            },
            customerSucces: 85,
          },
          {
            id: '67c97da10361520f65a31fca',
            name: 'Pâtes bolognaise',
            products: [
              {
                id: '67c97da10361520f65a31fcc',
                name: 'Spaghetti',
                orderDelay: 1,
                type: {
                  id: 1,
                  name: 'autre',
                },
                season: 0,
              },
              {
                id: '67c97da10361520f65a31fce',
                name: 'Ground beef',
                orderDelay: 2,
                type: {
                  id: 2,
                  name: 'viande',
                },
                season: 0,
              },
              {
                id: '67c97da10361520f65a31fd0',
                name: 'Tomatoes',
                orderDelay: 3,
                type: {
                  id: 3,
                  name: 'legume',
                },
                season: 2,
              },
              {
                id: '67c97da10361520f65a31fd2',
                name: 'Onion',
                orderDelay: 2,
                type: {
                  id: 4,
                  name: 'Vegetable',
                },
                season: 2,
              },
              {
                id: '67c97da10361520f65a31fd4',
                name: 'Olive oil',
                orderDelay: 1,
                type: {
                  id: 5,
                  name: 'Oil',
                },
                season: 0,
              },
            ],
            recipe: [
              'Cook spaghetti in boiling salted water',
              'Sauté onion in olive oil until translucent',
              'Add ground beef and brown thoroughly',
              'Stir in chopped tomatoes and simmer',
              'Combine the sauce with drained spaghetti and serve',
            ],
            type: {
              id: 6,
              name: 'Main Dish',
            },
            customerSucces: 90,
          },
        ],
      },
      {
        day: '2025-03-07',
        dailyMeals: [
          {
            id: '67c97b5e0361520f65a31f92',
            name: 'Pizza margherita',
            products: [
              {
                id: '67c97b5e0361520f65a31f94',
                name: 'Tomato sauce',
                orderDelay: 2,
                type: {
                  id: 11,
                  name: 'Sauce',
                },
                season: 1,
              },
              {
                id: '67c97b5e0361520f65a31f96',
                name: 'Mozzarella cheese',
                orderDelay: 1,
                type: {
                  id: 22,
                  name: 'Cheese',
                },
                season: 1,
              },
              {
                id: '67c97b5e0361520f65a31f98',
                name: 'Basil',
                orderDelay: 3,
                type: {
                  id: 33,
                  name: 'Herb',
                },
                season: 2,
              },
            ],
            recipe: [
              'Spread tomato sauce on the dough',
              'Add mozzarella cheese',
              'Bake at 200°C (392°F) for 15 minutes',
              'Top with fresh basil',
            ],
            type: {
              id: 1,
              name: 'plat',
            },
            customerSucces: 95,
          },
          {
            id: '67c97bc20361520f65a31fa1',
            name: 'Vanilla ice cream',
            products: [
              {
                id: '67c97bc20361520f65a31fa3',
                name: 'Cream',
                orderDelay: 2,
                type: {
                  id: 10,
                  name: 'Dairy',
                },
                season: 1,
              },
              {
                id: '67c97bc20361520f65a31fa5',
                name: 'Sugar',
                orderDelay: 1,
                type: {
                  id: 11,
                  name: 'Sweetener',
                },
                season: 0,
              },
              {
                id: '67c97bc20361520f65a31fa7',
                name: 'Vanilla extract',
                orderDelay: 3,
                type: {
                  id: 12,
                  name: 'Flavoring',
                },
                season: 0,
              },
            ],
            recipe: [
              'Mix cream and sugar thoroughly',
              'Stir in vanilla extract',
              'Freeze the mixture until solid',
            ],
            type: {
              id: 1,
              name: 'Dessert',
            },
            customerSucces: 90,
          },
          {
            id: '67c97bed0361520f65a31fae',
            name: 'Onion rings',
            products: [
              {
                id: '67c97bed0361520f65a31fb0',
                name: 'Onions',
                orderDelay: 2,
                type: {
                  id: 1,
                  name: 'Vegetable',
                },
                season: 2,
              },
              {
                id: '67c97bed0361520f65a31fb2',
                name: 'Flour',
                orderDelay: 1,
                type: {
                  id: 2,
                  name: 'Baking Ingredient',
                },
                season: 0,
              },
              {
                id: '67c97bed0361520f65a31fb4',
                name: 'Eggs',
                orderDelay: 1,
                type: {
                  id: 3,
                  name: 'Poultry Product',
                },
                season: 0,
              },
              {
                id: '67c97bed0361520f65a31fb6',
                name: 'Breadcrumbs',
                orderDelay: 2,
                type: {
                  id: 4,
                  name: 'Baking Ingredient',
                },
                season: 0,
              },
              {
                id: '67c97bed0361520f65a31fb8',
                name: 'Cooking oil',
                orderDelay: 1,
                type: {
                  id: 5,
                  name: 'Oil',
                },
                season: 0,
              },
            ],
            recipe: [
              'Slice onions into rings',
              'Coat them in flour',
              'Dip them in beaten eggs',
              'Roll them in breadcrumbs',
              'Fry in hot oil until golden brown',
            ],
            type: {
              id: 6,
              name: 'entre',
            },
            customerSucces: 85,
          },
          {
            id: '67c97da10361520f65a31fca',
            name: 'Pâtes bolognaise',
            products: [
              {
                id: '67c97da10361520f65a31fcc',
                name: 'Spaghetti',
                orderDelay: 1,
                type: {
                  id: 1,
                  name: 'autre',
                },
                season: 0,
              },
              {
                id: '67c97da10361520f65a31fce',
                name: 'Ground beef',
                orderDelay: 2,
                type: {
                  id: 2,
                  name: 'viande',
                },
                season: 0,
              },
              {
                id: '67c97da10361520f65a31fd0',
                name: 'Tomatoes',
                orderDelay: 3,
                type: {
                  id: 3,
                  name: 'legume',
                },
                season: 2,
              },
              {
                id: '67c97da10361520f65a31fd2',
                name: 'Onion',
                orderDelay: 2,
                type: {
                  id: 4,
                  name: 'Vegetable',
                },
                season: 2,
              },
              {
                id: '67c97da10361520f65a31fd4',
                name: 'Olive oil',
                orderDelay: 1,
                type: {
                  id: 5,
                  name: 'Oil',
                },
                season: 0,
              },
            ],
            recipe: [
              'Cook spaghetti in boiling salted water',
              'Sauté onion in olive oil until translucent',
              'Add ground beef and brown thoroughly',
              'Stir in chopped tomatoes and simmer',
              'Combine the sauce with drained spaghetti and serve',
            ],
            type: {
              id: 6,
              name: 'Main Dish',
            },
            customerSucces: 90,
          },
        ],
      },
    ],
    start: '2025-03-06',
  },
]

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
          <div :id="menu.id.toString()" class="item rounded">
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
  /* cursor: pointer; */
}
.wrapper {
  display: grid;
  grid-template-columns: repeat(2, 50%);
}
</style>
