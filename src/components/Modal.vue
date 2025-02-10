<script setup lang="ts">
import AddEvent from './forms/AddEvent.vue'
import EditEvent from './forms/EditEvent.vue'

const props = defineProps<{
  show: boolean
  type: string
  event?: any
}>()

const emit = defineEmits(['modal:show', 'form:add', 'form:edit', 'form:remove'])
</script>
<template>
  <div class="modal" v-show="props.show">
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
  padding-left: 25%;
  padding-right: 25%;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}
</style>
