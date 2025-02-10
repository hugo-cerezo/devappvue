<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { ref } from 'vue'

const emit = defineEmits(['cancel', 'confirm', 'remove'])
const props = defineProps<{
  data: {
    event: {
      title: string
      allDay: boolean
      start: Date
      end: Date
      remove: () => void
    }
  }
}>()

const name = ref(props.data.event.title)
const fullDay = ref(props.data.event.allDay)
const start = ref(props.data.event.start.toTimeString().split(' ')[0])
const end = ref(
  props.data.event.end
    ? props.data.event.end.toTimeString().split(' ')[0]
    : props.data.event.start.toTimeString().split(' ')[0],
)

const handleConfirm = () => {
  const newStart = new Date(props.data.event.start)
  const newEnd = new Date(props.data.event.end ?? props.data.event.start)

  newStart.setHours(+start.value.split(':')[0], +start.value.split(':')[1])
  newEnd.setHours(+end.value.split(':')[0], +end.value.split(':')[1])

  emit('confirm', { title: name.value, fullDay: fullDay.value, start: newStart, end: newEnd })
}

const handleRemove = () => {
  const validate = confirm('Etes vous sur de vouloir supprimer cet evenement?')
  if (validate) {
    emit('remove')
  }
}
</script>

<template>
  <div class="d-flex justify-content-between mb-3">
    <b>Modifier {{ props.data.event.title }}</b>
    <BIconTrash3 class="hover" @click="handleRemove" />
  </div>
  <input type="text" placeholder="Name" v-model="name" class="w-100" />
  <div>
    <input
      type="checkbox"
      name="Fullday"
      id="Fullday"
      v-model="fullDay"
      class="form-check-input"
      @click="() => (fullDay = !fullDay)"
    />
    <label for="Fullday" class=".pl-2 form-check-label ms-1">All day event</label>
  </div>

  <div class="d-flex" v-if="fullDay == false">
    <div class="me-1">
      <label for="start" class="me-1">Debut</label>
      <input type="time" name="start" id="" class="form-control" v-model="start" />
    </div>
    <div>
      <label for="end" class="me-1">Fin</label>
      <input type="time" name="end" id="" class="form-control" v-model="end" />
    </div>
  </div>

  <div class="d-flex justify-content-end">
    <button class="btn btn-primary me-1" @click="handleConfirm">Edit</button>
    <button class="btn btn-danger" @click="emit('cancel')">Cancel</button>
  </div>
</template>

<style lang="css" scoped>
.hover:hover {
  color: blue;
  cursor: pointer;
}
</style>
