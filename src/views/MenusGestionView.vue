<template>
  <div class="container">
    <div class="sidebar">
      <div class="sidebar-Meals">
        <p class="sidebarheader">Plats</p>

        <div class="checkbox-container">
          <input type="checkbox" id="entree" @change="filterMealsSelector('entree')" />
          <label for="entree">Entrée</label>

          <input type="checkbox" id="plat" @change="filterMealsSelector('plat')" />
          <label for="plat">Plat</label>

          <input type="checkbox" id="dessert" @change="filterMealsSelector('Dessert')" />
          <label for="dessert">Dessert</label>
          <div>
            <input @change="filertMealSelectorByName($event)" type="text" placeholder="Search..." />
          </div>
        </div>
        <ul v-if="MealstoDisplay.length > 0" class="">
          <VueDraggableNext
            class="mealcontainer"
            v-model="MealstoDisplay"
            :group="{ name: 'meals', pull: 'clone', put: false }"
            @end="onMealsListChange"
          >
            <li v-for="meal in MealstoDisplay" :key="meal.id" class="drag-el">
              <p>{{ meal.name }}</p>
            </li>
          </VueDraggableNext>
        </ul>
        <ul v-else>
          <li>No meals found.</li>
        </ul>
      </div>
    </div>
    <div class="content">
      <table class="titletable">
        <thead>
          <tr>
            <th v-for="day in daysOfWeek" :key="day" class="col-md-4">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-for="day in daysOfWeek" :key="day" class="col-md-4" @click="openModal">
              <VueDraggableNext
                v-model="weekdays[day]"
                :group="{ name: 'meals' }"
                class="draggablezone"
                @end="daychange(day)"
              >
                <template v-for="meal in weekdays[day]" :key="meal.id">
                  <div :class="['drag-el', getMealClass(meal.mealType), sortMealsByType(day)]">
                    {{ meal.name }}
                    <button class="delete-button" @click="deleteMealFromDay(day, meal.id)">
                      ✖
                    </button>
                  </div>
                </template>
              </VueDraggableNext>
            </td>
          </tr>
        </tbody>
      </table>
      <button class="save-button" @click="openModal()">Save</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Products, Meals, FullCalendarEvent, Menu } from '@/config/interfaces'
import MealsService from '@/services/MealsService'
import ProductsService from '@/services/ProductsServices'
import MenuService from '@/services/MenusService'
import { VueDraggableNext } from 'vue-draggable-next'

const MealsList = ref<Meals[]>([])
const MealstoDisplay = ref<Meals[]>([])
const ProductsList = ref<Products[]>([])
const EventsList = ref<FullCalendarEvent[]>([])
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

const onMealsListChange = (event: any) => {
  console.log('MealsList changed:', event)
}

const deleteMealFromDay = (day: string, mealId: string) => {
  weekdays.value[day] = weekdays.value[day].filter((meal) => meal.id !== mealId)
}

const daychange = (day: string) => {
  console.log(`${day} changed:`)
}

const isModalOpen = ref(false)
const menuName = ref('')
const menuDate = ref('')

const openModal = () => {
  console.log('openModal called')
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
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
    console.error(`Invalid day: ${day}`)
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
  closeModal()
  let menu: Menu = {
    name: menuName.value,
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
  MenuService.createMenus(menu)
  props.menu.show = false
}

onMounted(async () => {
  MealsList.value = await MealsService.getMeals()
  console.log(MealsList.value)
  MealstoDisplay.value = MealsList.value
  ProductsList.value = await ProductsService.getProducts()
  if (props.menu.id.length > 0) {
    MenuSelected.value = await MenuService.getMenuById(props.menu.id)
    console.log(MenuSelected.value)
    Object.keys(MenuSelected.value.days).forEach((day) => {
      MenuSelected.value.days[day].forEach((element) => {
        const meal = MealsList.value.find((meal) => meal.id === element)

        console.log(meal)
        if (meal) {
          weekdays.value[day].push(meal)
        }
      })
    })
  }
})
</script>

<style scoped>
.delete-button {
  background: none;
  border: none;
  color: red;
  font-size: 1.2em;
  cursor: pointer;
  margin-left: 10px;
  transition: color 0.3s;
}

.delete-button:hover {
  color: darkred;
}

.checkbox-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  background-color: #f1f1f1;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.checkbox-container input[type='checkbox'] {
  display: none;
}

.checkbox-container label {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 2px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition:
    background-color 0.3s,
    border-color 0.3s;
}

.checkbox-container input[type='checkbox']:checked + label {
  background-color: #007bff;
  color: #fff;
  border-color: #007bff;
}

.checkbox-container label:hover {
  background-color: #f8f9fa;
}

.mealcontainer {
  margin-top: 1vh;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-height: 80vh;
  overflow-y: auto;
}

.container {
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
}

.draggablezone {
  min-width: 5vw;
  min-height: 5vh;
}

.drag-el {
  margin: 5px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: smaller;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition:
    background-color 0.3s,
    box-shadow 0.3s;
}

.drag-el:hover {
  background-color: #f8f9fa;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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

.container {
  margin-left: 0px;
}

.sidebar {
  width: 20vw;
  background-color: #f8f9fa;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.sidebarheader {
  background-color: #343a40;
  color: #fff;
  padding: 10px;
  text-align: center;
  border-radius: 5px;
  margin-bottom: 10px;
}

.sidebar-Meals ul,
.sidebar-menus ul {
  list-style-type: none;
  padding: 0;
}

.content {
  width: 80%;
  padding: 20px;
}

.titletable {
  width: 80vw;
  table-layout: fixed;
  border-collapse: collapse;
}

.titletable th,
.titletable td {
  width: 14%;
  padding: 15px;
  text-align: center;
  border: 1px solid #ddd;
  vertical-align: top;
}

.save-button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.save-button:hover {
  background-color: #0056b3;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  display: block;
  margin-left: 40%;
  margin-top: 15%;
  background: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: fit-content;
  height: fit-content;
  text-align: center;
}

.modal h2 {
  margin-top: 0;
}

.modal label {
  display: block;
  margin: 10px 0 5px;
}

.modal input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.modal button {
  margin: 5px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.modal button:first-of-type {
  background-color: #007bff;
  color: white;
}

.modal button:last-of-type {
  background-color: #ccc;
}
</style>
