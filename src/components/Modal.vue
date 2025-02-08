<script setup lang="ts">
const props = defineProps({
  show: Boolean,
})

const emit = defineEmits(['update:show'])
</script>
<template>
  <div class="modal" v-show="props.show" @click="$emit('update:show', false)">
    <div class="modal-content">
      <slot name="modal-slot-content"></slot>
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
