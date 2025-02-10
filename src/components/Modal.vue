<script setup lang="ts">
const props = defineProps<{
  show: boolean
  formType?: string
}>()

const emit = defineEmits(['update:show', 'update:addEvent'])
const handleConfirm = (formValues: any) => {
  emit('update:show', false)
  emit('update:addEvent', formValues)
}
</script>
<template>
  <div class="modal" v-show="props.show">
    <div class="modal-content">
      <slot name="modal-slot-content">
        <AddEvent
          v-if="props.formType == 'form:addEvent'"
          @cancel="$emit('update:show', false)"
          @confirm="handleConfirm"
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
