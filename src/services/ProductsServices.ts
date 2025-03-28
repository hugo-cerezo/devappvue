import ApiService from './apiService'
import type { Products } from '@/config/interfaces'

export class ProductsService extends ApiService {
  createProducts(Products: Products) {
    return this.request('Products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Products),
    })
  }

  getProducts() {
    return this.request('Products')
  }

  getproductsById(id: string) {
    return this.request(`Products/${id}`)
  }

  updateProducts(id: Products['id'], Products: Products) {
    return this.request(`Products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Products),
    })
  }

  deleteProducts(id: Products['id']) {
    return this.request(`Products/${id}`, {
      method: 'DELETE',
    })
  }
}
export default new ProductsService()
