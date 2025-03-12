<template>
    <div class="container">
        <div class="sidebar">
            <div class="sidebar-menus">
                <p class="sidebarheader">Menus</p>
                <ul>
                    <!-- <li v-for="event in EventsList" :key="event.id">
            <a href="#">{{ event.title }}</a>
          </li> -->
                </ul>
            </div>
            <div class="sidebar-Meals">
                <p class="sidebarheader">Plats</p>
                <ul v-if="MealsList.length > 0">
                    <VueDraggableNext v-model="MealsList" :group="{ name: 'meals', pull: 'clone', put: false }"
                        @end="onMealsListChange">
                        <li v-for="meal in MealsList" :key="meal.id" class="drag-el">
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
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <VueDraggableNext @click="openModal" v-model="lundi" :group="{ name: 'meals' }" tag="td"
                            class="drag-el" @end="onLundiChange">
                            <template v-for="meal in lundi" :key="meal.id">
                                <td class="drag-el">
                                    {{ meal.name }}
                                </td>
                            </template>
                        </VueDraggableNext>
                        <VueDraggableNext @click="openModal" v-model="mardi" :group="{ name: 'meals' }" tag="td"
                            class="drag-el" @end="onMardiChange">
                            <template v-for="meal in mardi" :key="meal.id">
                                <td class="drag-el">
                                    {{ meal.name }}
                                </td>
                            </template>
                        </VueDraggableNext>
                        <VueDraggableNext @click="openModal" v-model="mercredi" :group="{ name: 'meals' }" tag="td"
                            class="drag-el" @end="onMercrediChange">
                            <template v-for="meal in mercredi" :key="meal.id">
                                <td class="drag-el">
                                    {{ meal.name }}
                                </td>
                            </template>
                        </VueDraggableNext>
                        <VueDraggableNext @click="openModal" v-model="jeudi" :group="{ name: 'meals' }" tag="td"
                            class="drag-el" @end="onJeudiChange">
                            <template v-for="meal in jeudi" :key="meal.id">
                                <td class="drag-el">
                                    {{ meal.name }}
                                </td>
                            </template>
                        </VueDraggableNext>
                        <VueDraggableNext @click="openModal" v-model="vendredi" :group="{ name: 'meals' }" tag="td"
                            class="drag-el" @end="onVendrediChange">
                            <template v-for="meal in vendredi" :key="meal.id">
                                <td class="drag-el">
                                    {{ meal.name }}
                                </td>
                            </template>
                        </VueDraggableNext>
                    </tr>
                </tbody>
            </table>
            <button class="save-button">Save</button>
        </div>

        <Modal v-if="isModalOpen" :show="isModalOpen" :type="type" :event="formData" @close="closeModal"
            @form:add="handleAdd" @form:edit="handleEdit" @form:remove="handleRemove">
        </Modal>
    </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import type { Products, Meals, CalendarEvent } from '@/config/interfaces'
import apiService from '@/services/apiService'
import Modal from '@/components/Modal.vue'
import { VueDraggableNext } from 'vue-draggable-next'

export default {
    components: {
        Modal,
        VueDraggableNext
    },
    setup() {
        const MealsList = ref<Meals[]>([])
        const ProductsList = ref<Products[]>([])
        const EventsList = ref<CalendarEvent[]>([])
        const isModalOpen = ref(false)
        const selectedDay = ref('')
        const formData = ref({
            meal: '',
            product: ''
        })
        const type = ref('')
        const lundi = ref<Meals[]>([])
        const mardi = ref<Meals[]>([])
        const mercredi = ref<Meals[]>([])
        const jeudi = ref<Meals[]>([])
        const vendredi = ref<Meals[]>([])

        const openModal = (day: string) => {
            selectedDay.value = day
            type.value = 'form:add'
            isModalOpen.value = true
        }

        const closeModal = () => {
            isModalOpen.value = false
        }

        const handleAdd = (values: any) => {
            // Ajoutez votre logique pour ajouter des éléments ici
            console.log('Add:', values)
            isModalOpen.value = false
        }

        const handleEdit = (values: any) => {
            // Ajoutez votre logique pour éditer des éléments ici
            console.log('Edit:', values)
            isModalOpen.value = false
        }

        const handleRemove = () => {
            // Ajoutez votre logique pour supprimer des éléments ici
            console.log('Remove')
            isModalOpen.value = false
        }

        const onMealsListChange = (event: any) => {
            console.log('MealsList changed:', event)
        }

        const onLundiChange = (event: any) => {
            console.log('Lundi changed:', event)
        }

        const onMardiChange = (event: any) => {
            console.log('Mardi changed:', event)
        }

        const onMercrediChange = (event: any) => {
            console.log('Mercredi changed:', event)
        }

        const onJeudiChange = (event: any) => {
            console.log('Jeudi changed:', event)
        }

        const onVendrediChange = (event: any) => {
            console.log('Vendredi changed:', event)
        }

        onMounted(async () => {
            MealsList.value = await apiService.getMeals()
            ProductsList.value = await apiService.getProducts()
            console.log(MealsList)
            // EventsList.value = await apiService.getEvents()
        })

        return {
            MealsList,
            ProductsList,
            lundi,
            mardi,
            mercredi,
            jeudi,
            vendredi,
            EventsList,
            isModalOpen,
            selectedDay,
            formData,
            type,
            openModal,
            closeModal,
            handleAdd,
            handleEdit,
            handleRemove,
            onMealsListChange,
            onLundiChange,
            onMardiChange,
            onMercrediChange,
            onJeudiChange,
            onVendrediChange
        }
    }
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: row;
    height: 100vh;
    width: 100vw;
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
}

.sidebar-Meals ul,
.sidebar-menus ul {
    list-style-type: none;
    padding: 0;
}

.sidebar-Meals li,
.sidebar-menus li {
    padding: 10px;
    border-bottom: 1px solid #ddd;
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
</style>