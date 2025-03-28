<script setup lang="ts">
import AddEvent from './forms/AddEvent.vue'
import MenusGestionView from '@/views/MenusGestionView.vue'
import { useModalStore } from '@/stores/modalStore'
import { mealModalStore } from '@/stores/mealStore'
import { menuModalStore } from '@/stores/menuStore'

// Initialisation du store Pinia
const modalStore = useModalStore()
const mealStore = mealModalStore()
const menuStore = menuModalStore()
defineProps({
  show: Boolean,
  type: String,
  event: Object,
  menu: Object,
  width: Number,
})
defineEmits(['modal:show', 'form:add', 'form:edit', 'form:remove'])
// Méthode pour fermer la modale
const hideModal = (event: MouseEvent) => {
  if ((event.target as HTMLElement).className === 'modal') modalStore.close() // Ferme la modale via le store
}
</script>

<template>
  <div
    class="modal"
    v-if="modalStore.isOpen"
    @click="(event: MouseEvent) => hideModal(event)"
    :style="{
      paddingLeft: `${100 - (modalStore.width ?? 95)}%`,
      paddingRight: `${100 - (modalStore.width ?? 95)}%`,
    }"
  >
    <div class="modal-content">
      <slot name="modal-slot-content">
        <MenusGestionView
          v-if="modalStore.type === 'menu:description'"
          :menu="menuStore.data"
          :show="modalStore.isOpen"
        />

        <AddEvent
          v-if="modalStore.type === 'meal:add'"
          :menu="mealStore.data"
          :events="mealStore.data"
          :show="modalStore.isOpen"
        />
      </slot>
    </div>
  </div>
</template>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}
</style>
