<template>
    <div class="container">
        <div class="sidebar">
            <div class="sidebar-Meals">
                <p class="sidebarheader">Plats</p>

                <div class="checkbox-container">
                    <input type="checkbox" id="entree" @change="filtermealsselector('entre')" />
                    <label for="entree">Entrée</label>

                    <input type="checkbox" id="plat" @change="filtermealsselector('plat')" />
                    <label for="plat">Plat</label>

                    <input type="checkbox" id="dessert" @change="filtermealsselector('dessert')" />
                    <label for="dessert">Dessert</label>
                </div>
                <!-- systeme de tri des plats -->
                <ul v-if="MealstoDisplay.length > 0" class="mealcontainer">
                    <VueDraggableNext v-model="MealstoDisplay" :group="{ name: 'meals', pull: 'clone', put: false }"
                        @end="onMealsListChange">
                        <li v-for="meal in MealstoDisplay" :key="meal.id" class="mealchoice">
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
                        <th class="">Lundi</th>
                        <th class="">Mardi</th>
                        <th class="">Mercredi</th>
                        <th class="">Jeudi</th>
                        <th class="">Vendredi</th>
                        <th class="">Samedi</th>
                        <th class="">Dimanche</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <VueDraggableNext v-model="weekdays.lundi" :group="{ name: 'meals' }"
                                @end="daychange('lundi')">
                                <template v-for="meal in weekdays.lundi" :key="meal.id">
                                    <div :class="['drag-el', getMealClass(meal.type.name), sortMealsByType('lundi')]">
                                        {{ meal.name }}
                                    </div>
                                </template>
                            </VueDraggableNext>
                        </td>
                        <td>
                            <VueDraggableNext v-model="weekdays.mardi" :group="{ name: 'meals' }" class=""
                                @end="daychange('mardi')">
                                <template v-for="meal in weekdays.mardi" :key="meal.id">
                                    <div :class="['drag-el', getMealClass(meal.type.name), sortMealsByType('mardi')]">
                                        {{ meal.name }}
                                    </div>
                                </template>
                            </VueDraggableNext>
                        </td>
                        <td>
                            <VueDraggableNext v-model="weekdays.mercredi" :group="{ name: 'meals' }" class=""
                                @end="daychange('mercredi')">
                                <template v-for="meal in weekdays.mercredi" :key="meal.id">
                                    <div
                                        :class="['drag-el', getMealClass(meal.type.name), sortMealsByType('mercredi')]">
                                        {{ meal.name }}
                                    </div>
                                </template>
                            </VueDraggableNext>
                        </td>
                        <td>
                            <VueDraggableNext v-model="weekdays.jeudi" :group="{ name: 'meals' }" class=""
                                @end="daychange('jeudi')">
                                <template v-for="meal in weekdays.jeudi" :key="meal.id">
                                    <div :class="['drag-el', getMealClass(meal.type.name), sortMealsByType('jeudi')]">
                                        {{ meal.name }}
                                    </div>
                                </template>
                            </VueDraggableNext>
                        </td>
                        <td>
                            <VueDraggableNext v-model="weekdays.vendredi" :group="{ name: 'meals' }" class=""
                                @end="daychange('vendredi')">
                                <template v-for="meal in weekdays.vendredi" :key="meal.id">
                                    <div
                                        :class="['drag-el', getMealClass(meal.type.name), sortMealsByType('vendredi')]">
                                        {{ meal.name }}
                                    </div>
                                </template>
                            </VueDraggableNext>
                        </td>
                        <td>
                            <VueDraggableNext v-model="weekdays.samedi" :group="{ name: 'meals' }" class=""
                                @end="daychange('samedi')">
                                <template v-for="meal in weekdays.samedi" :key="meal.id">
                                    <div :class="['drag-el', getMealClass(meal.type.name), sortMealsByType('samedi')]">
                                        {{ meal.name }}
                                    </div>
                                </template>
                            </VueDraggableNext>
                        </td>
                        <td>
                            <VueDraggableNext v-model="weekdays.dimanche" :group="{ name: 'meals' }" class=""
                                @end="daychange('dimanche')">
                                <template v-for="meal in weekdays.dimanche" :key="meal.id">
                                    <div
                                        :class="['drag-el', getMealClass(meal.type.name), sortMealsByType('dimanche')]">
                                        {{ meal.name }}
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
    <div v-if="isModalOpen" class="modal-overlay">
        <div class="modal">
            <h2>Save Menu</h2>
            <label for="menuName">Menu Name:</label>
            <input type="text" id="menuName" v-model="menuName" />

            <label for="menuDate">Select Date:</label>
            <input type="date" id="menuDate" v-model="menuDate" />

            <button @click="saveData">Save</button>
            <button @click="closeModal">Cancel</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Products, Meals, CalendarEvent, Menu, MealsDataToDisplay } from '@/config/interfaces'
import apiService from '@/services/apiService'
import { VueDraggableNext } from 'vue-draggable-next'

const MealsList = ref<Meals[]>([])
const MealstoDisplay = ref<Meals[]>([])
const ProductsList = ref<Products[]>([])
const EventsList = ref<CalendarEvent[]>([])
const MenuSelected = ref<Menu[]>([])
const selectedMealTypes = ref<string[]>([])
// const selectedDay = ref('')
// const formData = ref({
//     meal: '',
//     product: ''
// })
const type = ref('')
const weekdays = ref<Record<string, MealsDataToDisplay[]>>({
    lundi: [],
    mardi: [],
    mercredi: [],
    jeudi: [],
    vendredi: [],
    samedi: [],
    dimanche: []
})


const filtermealsselector = (mealType: string) => {
    const index = selectedMealTypes.value.indexOf(mealType)
    if (index > -1) {
        selectedMealTypes.value.splice(index, 1)
    } else {
        selectedMealTypes.value.push(mealType)
    }

    if (selectedMealTypes.value.length === 0) {
        MealstoDisplay.value = MealsList.value
    } else {
        MealstoDisplay.value = MealsList.value.filter(meal => selectedMealTypes.value.includes(meal.type.name))
    }
}

const onMealsListChange = (event: any) => {
    console.log('MealsList changed:', event)
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

const saveData = () => {
    closeModal()
    let menu: Menu = {
        name: menuName.value,
        days: [
            weekdays.value.lundi.map(meal => meal.id),
            weekdays.value.mardi.map(meal => meal.id),
            weekdays.value.mercredi.map(meal => meal.id),
            weekdays.value.jeudi.map(meal => meal.id),
            weekdays.value.vendredi.map(meal => meal.id),
            weekdays.value.samedi.map(meal => meal.id),
            weekdays.value.dimanche.map(meal => meal.id)
        ]
    }
    console.log(menuDate.value)
    console.log('Menu:', menu)
}

const getMealClass = (mealType: string) => {
    switch (mealType) {
        case 'entre':
            return 'meal-entree'
        case 'plat':
            return 'meal-plat'
        case 'dessert':
            return 'meal-dessert'
        default:
            return ''
    }
}

const sortMealsByType = (day: string) => {
    console.log(day)
    return weekdays.value[day].sort((a, b) => {
        if (a.type.name < b.type.name) {
            return -1
        }
        if (a.type.name > b.type.name) {
            return 1
        }
        return 0
    })
}

onMounted(async () => {
    // menuselected.value = get props from parent
    if (MenuSelected.value.length > 0) {
        MenuSelected.value.forEach(menu => {
            weekdays.value.lundi = menu.days[0].map((mealId: string) => MealsList.value.find(meal => meal.id === mealId) as MealsDataToDisplay)
            weekdays.value.mardi = menu.days[1].map((mealId: string) => MealsList.value.find(meal => meal.id === mealId) as MealsDataToDisplay)
            weekdays.value.mercredi = menu.days[2].map((mealId: string) => MealsList.value.find(meal => meal.id === mealId) as MealsDataToDisplay)
            weekdays.value.jeudi = menu.days[3].map((mealId: string) => MealsList.value.find(meal => meal.id === mealId) as MealsDataToDisplay)
            weekdays.value.vendredi = menu.days[4].map((mealId: string) => MealsList.value.find(meal => meal.id === mealId) as MealsDataToDisplay)
            weekdays.value.samedi = menu.days[5].map((mealId: string) => MealsList.value.find(meal => meal.id === mealId) as MealsDataToDisplay)
            weekdays.value.dimanche = menu.days[6].map((mealId: string) => MealsList.value.find(meal => meal.id === mealId) as MealsDataToDisplay)
        })
    }
    MealsList.value = await apiService.getMeals()
    MealstoDisplay.value = MealsList.value
    ProductsList.value = await apiService.getProducts()
})
</script>

<style scoped>
.checkbox-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    background-color: #f1f1f1;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.checkbox-container input[type="checkbox"] {
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
    transition: background-color 0.3s, border-color 0.3s;
}

.checkbox-container input[type="checkbox"]:checked+label {
    background-color: #007bff;
    color: #fff;
    border-color: #007bff;
}

.checkbox-container label:hover {
    background-color: #f8f9fa;
}

.mealchoice {
    margin: 5px;
    border: 2px solid #ddd;
    border-radius: 5px;
    font-size: smaller;
    text-align: center;
}

.mealcontainer {
    margin-top: 1vh;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}

.container {
    display: flex;
    flex-direction: row;
    height: 100vh;
    width: 100vw;
}


.drag-el {
    margin: 2px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: smaller;
    text-align: center;
}

.meal-entree {
    background-color: red;
}

.meal-plat {
    background-color: green;
}

.meal-dessert {
    background-color: blue;
}

.container {
    margin-left: 0px;
}

.sidebar {
    /* margin-left: -20vh; */
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
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

th,
td {
    padding: 15px;
    text-align: center;
    border: 1px solid #ddd;
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