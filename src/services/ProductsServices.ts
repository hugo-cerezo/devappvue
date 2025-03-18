import ApiService from './ApiService'
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
