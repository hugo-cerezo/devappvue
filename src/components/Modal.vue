<script setup lang="ts">
import AddEvent from './forms/AddEvent.vue'
import EditEvent from './forms/EditEvent.vue'
import Description from '@/views/Description.vue'
import MenusGestionView from '@/views/MenusGestionView.vue'
import { mealModalStore, menuModalStore, useModalStore } from '@/helpers/modalStore'

// Initialisation du store Pinia
const modalstore = menuModalStore()
const mealstore = mealModalStore()
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
  const target = (event.target as HTMLElement).className
  if (target === 'modal') modalstore.closeModal() // Ferme la modale via le store
}
</script>

<template>
  <!-- La modale s'affiche uniquement si modalstore.isOpen est true -->
  <div class="modal" v-if="modalstore.isOpen && modalstore.type === 'menu:description'"
    @click="(event: MouseEvent) => hideModal(event)" :style="{
      paddingLeft: `${100 - (modalstore.width ?? 95)}%`,
      paddingRight: `${100 - (modalstore.width ?? 95)}%`,
    }">
    <div class="modal-content">
      <slot name="modal-slot-content">
        <!-- <AddEvent :menu="props.menu" :show="props.show" @form:add="handleFormAdd" v-if="props.type == 'form:add'"
          @cancel="emit('modal:show', false)" @confirm="(values: any) => emit('form:add', values)" />
        <EditEvent v-if="props.type == 'form:edit' && props.event" :data="props.event"
          @cancel="() => emit('modal:show', false)" @confirm="(values: any) => emit('form:edit', values)"
          @remove="emit('form:remove')" />
        <Description v-if="props.type == 'show:description'" :events="props.event" /> -->
        <!-- Affiche le composant MenusGestionView si le type correspond -->
        <MenusGestionView v-if="modalstore.type === 'menu:description'" :menu="modalstore.data"
          :show="modalstore.isOpen" />

        <!-- <Description v-if="mealstore.type === 'meal:description'" :events="modalstore.data" :show="mealstore.isOpen" /> -->
      </slot>
    </div>
  </div>
  <div class="modal" v-if="mealstore.isOpen && mealstore.type === 'meal:add'"
    @click="(event: MouseEvent) => hideModal(event)" :style="{
      paddingLeft: `${100 - (mealstore.width ?? 75)}%`,
      paddingRight: `${100 - (mealstore.width ?? 75)}%`,
    }">
    <div class="modal-content">
      <slot name="modal-slot-content">
        <AddEvent v-if="mealstore.type === 'meal:add'" :menu="mealstore.data" :events="mealstore.data"
          :show="mealstore.isOpen" />
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
