import ApiService from './ApiService'
import type { Meals } from '@/config/interfaces'

export class MealsService extends ApiService {
  createMeals(Meals: Meals) {
    return this.request('Meals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Meals),
    })
  }

  getMeals() {
    return this.request('Meals/getallmeals')
  }

  getMealByName(name: string) {
    return this.request(`Meals/getmealsbyname?name=${name}`)
  }

  updateMeals(id: Meals['id'], Meals: Meals) {
    return this.request(`Meals/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Meals),
    })
  }

  deleteMeals(id: Meals['id']) {
    return this.request(`Meals/${id}`, {
      method: 'DELETE',
    })
  }
}
