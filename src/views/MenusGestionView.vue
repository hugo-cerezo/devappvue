<template>
  <div class="container-fluid h-100 d-flex">
    <!-- Sidebar -->
    <div class="sidebar bg-light p-3 shadow-sm">
      <p class="sidebarheader bg-dark text-white text-center rounded py-2 mb-3">Plats</p>

      <!-- Checkbox Filters -->
      <div class="checkbox-container">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="entree"
            @change="filterMealsSelector('entree')"
          />
          <label class="form-check-label" for="entree">Entrée</label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="plat"
            @change="filterMealsSelector('plat')"
          />
          <label class="form-check-label" for="plat">Plat</label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="dessert"
            @change="filterMealsSelector('dessert')"
          />
          <label class="form-check-label" for="dessert">Dessert</label>
        </div>
        <div class="mt-3">
          <input
            class="form-control"
            type="text"
            placeholder="Search..."
            @change="filertMealSelectorByName($event)"
          />
        </div>
      </div>

      <!-- Meals List -->
      <ul v-if="MealstoDisplay.length > 0" class="list-group mt-3 mealslist">
        <draggable
          class="mealcontainer"
          v-model="MealstoDisplay"
          :group="{ name: 'meals', pull: 'clone', put: false }"
          :itemKey="'id'"
        >
          <template #item="{ element }">
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <span>{{ element.name }}</span>
            </li>
          </template>
        </draggable>
      </ul>
      <ul v-else class="list-group mt-3">
        <li class="list-group-item text-muted">No meals found.</li>
      </ul>
    </div>

    <!-- Content -->
    <div class="content flex-grow-1 p-3">
      <table class="table table-bordered text-center">
        <thead>
          <tr>
            <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              @click.stop="openModal('meal', day)"
              v-for="day in daysOfWeek"
              :key="day"
              class="align-top"
            >
              <draggable
                v-model="weekdays[day]"
                :group="{ name: 'meals' }"
                :itemKey="'id'"
                class="draggablezone"
                @end="daychange(day)"
                @change="sortMealsByType(day)"
              >
                <template #item="{ element }">
                  <div
                    @click.stop="openModal('meal', element, day)"
                    :class="['drag-el', getMealClass(element.mealType)]"
                    class="p-2 border rounded mb-2 d-flex justify-content-between align-items-center"
                  >
                    <span>{{ element.name }}</span>
                    <!-- Prevent click propagation to the parent -->
                    <button
                      class="btn btn-sm btn-danger ms-2"
                      @click.stop="deleteMealFromDay(day, element.id)"
                    >
                      ✖
                    </button>
                  </div>
                </template>
              </draggable>
            </td>
          </tr>
        </tbody>
      </table>
      <button class="btn btn-primary mt-3" @click="openModal('menu')">Save</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Products, Meals, Menu } from '@/config/interfaces'
import MealsService from '@/services/MealsService'
import ProductsService from '@/services/ProductsServices'
import MenuService from '@/services/MenusService'
import draggable from 'vuedraggable'
import { useModalStore } from '@/stores/modalStore'
import { menuModalStore } from '@/stores/menuStore'
import { mealModalStore } from '@/stores/mealStore'

const menuName = ref('')
const MealsList = ref<Meals[]>([])
const MealstoDisplay = ref<Meals[]>([])
const ProductsList = ref<Products[]>([])
const MenuSelected = ref<Menu[]>([])
const selectedMealTypes = ref<string[]>([])
const weekdays = ref<Record<string, Meals[]>>({
  lundi: [],
  mardi: [],
  mercredi: [],
  jeudi: [],
  vendredi: [],
  samedi: [],
  dimanche: [],
})
const daysOfWeek = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']

const props = defineProps<{
  menu: any
  show: boolean
}>()
const modalStore = useModalStore()
const menuStore = menuModalStore()
const mealStore = mealModalStore()

const filterMealsSelector = (mealType: string) => {
  const index = selectedMealTypes.value.indexOf(mealType)

  if (index > -1) {
    selectedMealTypes.value.splice(index, 1)
  } else {
    selectedMealTypes.value.push(mealType)
  }

  if (selectedMealTypes.value.length === 0) {
    MealstoDisplay.value = MealsList.value
  } else {
    MealstoDisplay.value = MealsList.value.filter((meal) =>
      selectedMealTypes.value.includes(getMealTypeName(meal.mealType)),
    )
  }
}

const getMealTypeName = (mealType: number): string => {
  switch (mealType) {
    case 0:
      return 'entree'
    case 1:
      return 'plat'
    case 2:
      return 'dessert'
    default:
      return ''
  }
}

const filertMealSelectorByName = (event: Event) => {
  const search = (event.target as HTMLInputElement).value
  if (search === '') {
    MealstoDisplay.value = MealsList.value
  } else {
    MealstoDisplay.value = MealsList.value.filter((meal) =>
      meal.name.toLowerCase().includes(search.toLowerCase()),
    )
  }
}

const deleteMealFromDay = (day: string, mealId: string) => {
  weekdays.value[day] = weekdays.value[day].filter((meal) => meal.id !== mealId)
}

const daychange = (day: string) => {
  console.log(`${day} changed:`)
}

const openModal = (type: string, data?: any, day?: string) => {
  let meal = data
  if (type == 'menu') {
    let menu = saveData()
    menuStore.openModal('menu', { menu: menu })
    // open modal to enter a name and save in db
  } else if (type == 'meal') {
    modalStore.hide()
    mealStore.data = { meal: data, day: day }
    modalStore.show('meal:add', 75)
    // menuStore.changeModal()
    // mealStore.openModal('meal:add', { meal }, day)
    // open modal to create or change a meal
    // on return of the modal if new meal created add to the list or modify the store and refresh data
  }
}

const getMealClass = (mealType: number) => {
  switch (mealType) {
    case 0:
      return 'meal-entree'
    case 1:
      return 'meal-plat'
    case 2:
      return 'meal-dessert'
    default:
      return ''
  }
}

const sortMealsByType = (day: string) => {
  if (!weekdays.value[day]) {
    return []
  }

  return weekdays.value[day].sort((a, b) => {
    if (a.mealType < b.mealType) {
      return -1
    }
    if (a.mealType > b.mealType) {
      return 1
    }
    return 0
  })
}

const saveData = () => {
  let menu: Menu = {
    name: '',
    days: {
      lundi: weekdays.value.lundi.map((meal) => meal.id),
      mardi: weekdays.value.mardi.map((meal) => meal.id),
      mercredi: weekdays.value.mercredi.map((meal) => meal.id),
      jeudi: weekdays.value.jeudi.map((meal) => meal.id),
      vendredi: weekdays.value.vendredi.map((meal) => meal.id),
      samedi: weekdays.value.samedi.map((meal) => meal.id),
      dimanche: weekdays.value.dimanche.map((meal) => meal.id),
    },
  }
  return menu
}

onMounted(async () => {
  MealsList.value = await MealsService.getMeals()
  MealstoDisplay.value = MealsList.value
  ProductsList.value = await ProductsService.getProducts()
  //need change to get data from the store
  let modalData = menuStore.data
  if (modalData != null) {
    if (props.menu.id.length > 0) {
      MenuSelected.value = await MenuService.getMenuById(props.menu.id)
      Object.keys(MenuSelected.value.days).forEach((day) => {
        MenuSelected.value.days[day].forEach((element: string) => {
          const meal = MealsList.value.find((meal) => meal.id === element)
          if (meal) {
            weekdays.value[day].push(meal)
          }
        })
      })
    }
  }
})
</script>

<style scoped>
.mealslist {
  min-height: 60vh;
  max-height: 60vh;
  overflow-y: auto;
}

.meal-entree {
  background-color: #ffcccc;
}

.meal-plat {
  background-color: #ccffcc;
}

.meal-dessert {
  background-color: #ccccff;
}

.draggablezone {
  min-width: 5vw;
  min-height: 5vh;
  height: auto;
}
</style>
