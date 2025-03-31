import saladUrl from '@/assets/icons/salad.png'
import foodUrl from '@/assets/icons/food.png'
import desertUrl from '@/assets/icons/dessert.png'

export const defineIconType = (event: any) => {
  let url = ''
  // const type = event.extendedProps.meal?.type.id
  const type = event.extendedProps.meals[0].mealType

  switch (type) {
    case 0:
      url = saladUrl
      break
    case 1:
      url = foodUrl
      break
    case 2:
      url = desertUrl
      break
  }

  switch (type) {
    case 0:
      let saladIcon = document.createElement('img')
      saladIcon.src = url
      saladIcon.style.height = '18px'
      saladIcon.classList.add('my-1')
      return saladIcon
    case 1:
      let foodIcon = document.createElement('img')
      foodIcon.src = url
      foodIcon.style.height = '18px'
      foodIcon.classList.add('my-1')
      return foodIcon
    case 2:
      let desertIcon = document.createElement('img')
      desertIcon.src = url
      desertIcon.style.height = '18px'
      desertIcon.classList.add('my-1')
      return desertIcon
    default:
      let error = document.createElement('i')
      error.classList.add('bi', 'bi-bug-fill', 'my-1')
      return error
  }
}

export const defineColor = (event: any) => {
  const type = event.meals[0].mealType
  let color = ''
  switch (type) {
    case 0:
      color = '#FFB800'
      break
    case 1:
      color = '#FF4C00'
      break
    case 2:
      color = '#FF4C00'
      break
    default:
      color = '#FF4C00'
  }
  return color
}
