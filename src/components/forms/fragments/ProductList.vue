<script setup lang="ts">
const props = defineProps<{
  values: any[]
}>()
const emit = defineEmits(['remove'])

</script>
<template>
  <div id="product-list" class="w-100 border rounded mb-2">
    <div class="d-flex flex-wrap">
      <div
        v-for="product in props.values"
        class="product-list-item border rounded d-flex justify-content-center m-1"
        @click="$emit('remove', product)"
      >
        <span class="text-capitalize">{{ product.name }}</span>
      </div>
    </div>
  </div>
</template>
<style lang="css" scoped>
#product-list {
  min-height: 10vh;
}
.product-list-item {
  width: 100px;
  color: white;
  background-color: #0d6efd;
  cursor: pointer;
  text-align: center;
}
</style>
