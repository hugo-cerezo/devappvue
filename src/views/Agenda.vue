<script setup lang="ts">
import Calendar from '@/components/Calendar.vue'
import Modal from '@/components/Modal.vue'
import { ref } from 'vue'
import type { DateClickArg } from '@fullcalendar/interaction/index.js'
import type { CalendarEvent } from '@/config/interfaces'

const show = ref(false)
const type = ref('')
const edditing = ref()
const date = ref<DateClickArg>()

const events = ref([
  {
    title: 'Croissant',
    fullDay: true,
    date: '2025-02-11',
    type: 0,
    color: 'red',
    extendedProps: {
      ingredients: [
        { name: 'sel', quantity: '10', weight: 'g' },
        { name: 'levure de boulanger', quantity: '15', weight: 'g' },
        { name: 'farine type 45', quantity: '500', weight: 'g' },
        { name: 'eau', quantity: '2', weight: 'cuillères à soupe' },
        { name: 'sucre', quantity: '50', weight: 'g' },
        { name: 'beurre tendre', quantity: '180', weight: 'g' },
        { name: 'lait', quantity: '28', weight: 'cl' },
        { name: 'oeuf', quantity: '1', weight: 'pcs' },
      ],
      recipe: [
        "Première étape : la pâte feuilletée levée.",
        "Délayer la levure dans l'eau tiède. Dans un grand saladier, déposer la farine, le sel, le sucre, creuser un puits et incorporer petit à petit le lait.",
        "Quand le lait est entièrement incorporé, ajouter le mélange eau levure et pétrir la pâte pendant 15 minutes sur le plan de travail.",
        "Former une boule, la placer dans le saladier, couvrir d'un linge et laisser reposer deux heures.",
        "Au bout de deux heures, étaler la pâte sur le plan de travail en forme d'étoile à quatre branches en gardant le centre plus épais.",
        "Étaler le beurre au centre et replier les branches.",
        "Étaler alors ce pâton en un rectangle. Replier ce rectangle en trois et faire pivoter le rectangle d'un quart de tour sur la droite. Allonger à nouveau la pâte en rectangle, la replier en trois et tourner d'un quart de tour à droite.",
        "Recommencer une fois cette opération. La pâte feuilletée levée est prête.",
        "Deuxième étape : les croissants.",
        "Étaler la pâte feuilletée levée finement et découper des triangles. Rouler les triangles en partant de la base pour finir par la pointe, leur donner une forme de croissant.",
        "Laisser reposer les croissants deux heures. allumer le four thermostat 8 (240°C).",
        "Après le repos, badigeonner au pinceau les croissant d'oeuf battu en prenant soin de ne pas les faire retomber.",
        "Faire cuire 5 min à four chaud puis 10 à 15 min à thermostat 5/6 (160-170°C)."
      ],
    },
  },
  { title: 'Pizza', fullDay: true, date: '2025-02-11', type: 1, color: 'green' },
  { title: 'Glace', fullDay: true, date: '2025-02-11', type: 2, color: 'blue' },
])

const handleEdit = (data: any) => {
  edditing.value = data
  type.value = 'form:edit'
  show.value = true
}
</script>

<template>
  <Modal
    :show="show"
    :type="type"
    :event="edditing"
    @modal:show="((show = false), (type = ''))"
    @form:add="(values: any) => (events.push({ ...values, date: date?.dateStr }), (show = false))"
    @form:edit="
      (values: any) => {
        edditing.event.setProp('title', values.title)
        edditing.event.setAllDay(values.fullDay)
        if (values.fullDay == false) {
          edditing.event.setStart(values.start)
          edditing.event.setEnd(values.end)
        }
        show = false
        edditing = null
      }
    "
    @form:remove="(edditing.event.remove(), (show = false))"
  />

  <Calendar
    :events="events"
    @modal:create="(newDate) => ((show = true), (type = 'form:add'), (date = newDate))"
    @modal:edit="(event) => handleEdit(event)"
  />
</template>
