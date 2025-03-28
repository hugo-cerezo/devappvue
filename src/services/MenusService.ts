import ApiService from './apiService'
import type { Menu } from '@/config/interfaces'

export class MenusService extends ApiService {
  createMenus(Menu: Menu) {
    return this.request('Menus', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Menu),
    })
  }

  getMenus() {
    return this.request('Menus')
  }

  getMenuById(id: Menu['id']) {
    return this.request(`Menus/${id}`)
  }
}
export default new MenusService()
