<script setup lang="ts">
import AddEvent from './forms/AddEvent.vue'
import EditEvent from './forms/EditEvent.vue'
import Description from '@/views/Description.vue'
import MenuDetail from './MenuDetail.vue'

const props = defineProps<{
  show: boolean
  type: string
  event?: any
  menu?: any
  width?: number
}>()

const emit = defineEmits(['modal:show', 'form:add', 'form:edit', 'form:remove'])

const hideModal = (event: MouseEvent) => {
  const target = (event.target as HTMLElement).className
  if (target === 'modal') emit('modal:show', !props.show)
}
</script>
<template>
  <div
    class="modal"
    v-show="props.show"
    @click="(event: MouseEvent) => hideModal(event)"
    :style="{
      paddingLeft: `${100 - (props.width ?? 75)}%`,
      paddingRight: `${100 - (props.width ?? 75)}%`,
    }"
  >
    <div class="modal-content">
      <slot name="modal-slot-content">
        <AddEvent
          v-if="props.type == 'form:add'"
          @cancel="emit('modal:show', false)"
          @confirm="(values: any) => emit('form:add', values)"
        />

        <EditEvent
          v-if="props.type == 'form:edit' && props.event"
          :data="props.event"
          @cancel="() => emit('modal:show', false)"
          @confirm="(values: any) => emit('form:edit', values)"
          @remove="emit('form:remove')"
        />

        <Description v-if="props.type == 'show:description'" :events="props.event" />
        <MenuDetail v-if="props.type == 'menu:description'" :menu="props.menu" :show="props.show" />
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
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}
</style>
