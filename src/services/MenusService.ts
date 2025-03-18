import ApiService from './ApiService'
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
}
export default new MenusService()
