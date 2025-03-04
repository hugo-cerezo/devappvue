import type { Plats } from '@/config/interfaces'
import type { Ingredients } from '@/config/interfaces'
export default {
  // GET: Retrieve all plats
  async getPlats() {
    try {
      const response = await fetch('https://localhost:7286/api/Plats')
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

  // POST: Create a new plat
  async createPlat(Plats: Plats) {
    try {
      const response = await fetch('https://localhost:7286/api/Plats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Plats),
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

  // PUT: Update an existing plat by ID
  async updatePlat(id: Plats['id'], Plats: Plats) {
    try {
      const response = await fetch(`https://localhost:7286/api/Plats/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Plats),
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
  async deletePlat(id: Plats['id']) {
    try {
      const response = await fetch(`https://localhost:7286/api/Plats/${id}`, {
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
  async getIngredients() {
    try {
      const response = await fetch('https://localhost:7286/api/Ingredients')
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

  // POST: Create a new plat
  async createIngredients(Ingredients: Ingredients) {
    try {
      const response = await fetch('https://localhost:7286/api/Ingredients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Ingredients),
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

  // PUT: Update an existing plat by ID
  async updateIngredients(id: Ingredients['id'], Ingredients: Ingredients) {
    try {
      const response = await fetch(`https://localhost:7286/api/Ingredients/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Ingredients),
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
  async deleteIngredients(id: Ingredients['id']) {
    try {
      const response = await fetch(`https://localhost:7286/api/Ingredients/${id}`, {
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
}
