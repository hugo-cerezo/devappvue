export default class ApiService {
  async request(endpoint: string, options: RequestInit = {}) {
    try {
      const response = await fetch('https://localhost:5001/api/' + endpoint, options)
      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error(`${options.method || 'GET'} request error:`, error)
      throw error
    }
  }
}
