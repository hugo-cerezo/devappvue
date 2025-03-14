import type { Meals } from '@/config/interfaces'
import type { Products } from '@/config/interfaces'
// import { create } from 'domain'
import type { Menu } from '@/config/interfaces'

export default {
  async createMenus(Menu: Menu) {
    console.log(Menu)
    try {
      const response = await fetch('https://localhost:7286/api/Menus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Menu),
      })
      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`)
      }
      const data = await response.json()
      console.log('POST createPlat:', data)
      return data
    } catch (error) {
      console.error('POST createPlat error:', error)
      throw error
    }
  },
  // POST: Create a new meal
  async createMeals(Meals: Meals) {
    try {
      const response = await fetch('https://localhost:7286/api/Meals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Meals),
      })
      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`)
      }
      const data = await response.json()
      console.log('POST createPlat:', data)
      return data
    } catch (error) {
      console.error('POST createPlat error:', error)
      throw error
    }
  },
  // GET: Retrieve all meals
  async getMeals() {
    try {
      const response = await fetch('https://localhost:7286/api/Meals')
      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`)
      }
      const data = await response.json()
      console.log('GET plats:', data)
      return data
    } catch (error) {
      console.error('GET plats error:', error)
      throw error
    }
  },

  // GET: Retrieve a meal by name
  async getMealByName(name: string) {
    try {
      const response = await fetch(`https://localhost:7286/api/Meals/${name}`)
      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`)
      }
      const data = await response.json()
      console.log('GET plats:', data)
      return data
    } catch (error) {
      console.error('GET plats error:', error)
      throw error
    }
  },

  // PUT: Update an existing meal by ID
  async updateMeals(id: Meals['id'], Meals: Meals) {
    try {
      const response = await fetch(`https://localhost:7286/api/Meals/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Meals),
      })
      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`)
      }
      const data = await response.json()
      console.log('PUT updatePlat:', data)
      return data
    } catch (error) {
      console.error('PUT updatePlat error:', error)
      throw error
    }
  },

  // DELETE: Remove a plat by ID
  async deleteMeals(id: Meals['id']) {
    try {
      const response = await fetch(`https://localhost:7286/api/Meals/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`)
      }
      console.log(`DELETE plat with ID: ${id} successful`)
      return true
    } catch (error) {
      console.error('DELETE plat error:', error)
      throw error
    }
  },

  // POST: Create a new plat
  async createProducts(Products: Products) {
    try {
      const response = await fetch('https://localhost:7286/api/Products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Products),
      })
      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`)
      }
      const data = await response.json()
      console.log('POST createPlat:', data)
      return data
    } catch (error) {
      console.error('POST createPlat error:', error)
      throw error
    }
  },

  async getProducts() {
    try {
      const response = await fetch('https://localhost:7286/api/Products')
      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`)
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('getProducts error:', error)
      throw error
    }
  },

  // PUT: Update an existing plat by ID
  async updateProducts(id: Products['id'], Products: Products) {
    try {
      const response = await fetch(`https://localhost:7286/api/Products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Products),
      })
      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`)
      }
      const data = await response.json()
      console.log('PUT updatePlat:', data)
      return data
    } catch (error) {
      console.error('PUT updatePlat error:', error)
      throw error
    }
  },

  // DELETE: Remove a plat by ID
  async deleteProducts(id: Products['id']) {
    try {
      const response = await fetch(`https://localhost:7286/api/Products/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`)
      }
      console.log(`DELETE plat with ID: ${id} successful`)
      return true
    } catch (error) {
      console.error('DELETE plat error:', error)
      throw error
    }
  },

  async getMenus() {
    try {
      const response = await fetch('https://localhost:7286/api/Menus')
      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`)
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.log('GET menus error:', error)
    }
  },
}
