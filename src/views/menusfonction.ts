import { type Menu, type Plat ,type PlatDuMenu } from './type'

let menusData: Menu[] = []
let platsData: Plat[] = []
let products: any[] = [] // Définir le type approprié pour products
let editMode: boolean = false
let draggedPlat: HTMLElement | null = null
let selectedMenuIndex: number = -1

export function afficherMenus(menus: Menu[], plats: Plat[]): void {
  const selectedMenuValue = (document.getElementById('menu-selector') as HTMLSelectElement).value
  let menusAafficher: Menu[] = [...menus]

  if (selectedMenuValue !== 'all') {
    selectedMenuIndex = menus.findIndex((menu) => menu.Name === selectedMenuValue)
    menusAafficher = menus.filter((menu) => menu.Name === selectedMenuValue)
  } else {
    selectedMenuIndex = -1
  }

  const menusTable = document.getElementById('menus-table') as HTMLTableElement
  if (!menusTable) return // Gestion de l'erreur si l'élément n'existe pas

  menusTable.innerHTML = ''
  const detailsDiv = document.getElementById('plat-details') as HTMLDivElement
  if (detailsDiv) {
    detailsDiv.innerHTML = ''
  }

  if (!menusAafficher || menusAafficher.length === 0) {
    menusTable.innerHTML = '<p>Aucun menu disponible.</p>'
    return
  }

  const joursOrdonnes: string[] = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi']

  const table = document.createElement('table')
  const thead = table.createTHead()
  const tbody = table.createTBody()
  const headerRow = thead.insertRow()

  const headersFixes: string[] = ['Nom', 'Date']
  headersFixes.forEach((headerText) => {
    const th = document.createElement('th')
    th.textContent = headerText
    headerRow.appendChild(th)
  })

  joursOrdonnes.forEach((jour) => {
    const th = document.createElement('th')
    th.textContent = jour.toUpperCase()
    headerRow.appendChild(th)
  })

  menusAafficher.forEach((menu, menuIndex) => {
    const row = tbody.insertRow()
    const nameCell = row.insertCell()
    const dateCell = row.insertCell()
    nameCell.textContent = menu.Name
    dateCell.textContent = menu.Date

    const platsParJour: { [jour: string]: PlatDuMenu[] } = {}
    joursOrdonnes.forEach((jour) => (platsParJour[jour] = []))

    menu.Plats.forEach((platDuMenu) => {
      platsParJour[platDuMenu.jour].push(platDuMenu)
    })

    joursOrdonnes.forEach((jour) => {
      const jourCell = row.insertCell()
      jourCell.classList.add('dropzone')
      jourCell.dataset.jour = jour
      jourCell.dataset.menuIndex = menuIndex.toString() // Convertir en string
      jourCell.addEventListener('dragover', handleDragOver)
      jourCell.addEventListener('drop', handleDrop)

      let platsInfoJour = ''
      platsParJour[jour].forEach((platDuMenu) => {
        const plat = plats.find((p) => p.Name === platDuMenu.name)
        if (plat) {
          const productNames = plat.Products.join(', ')
          platsInfoJour += `<div class="draggable plat-item" data-plat-name="${plat.Name}" data-plat-jour="${platDuMenu.jour}" data-nbp="${plat.NombresPersonne}" data-produits="${productNames}" draggable="${editMode}" ondragstart="handleDragStart(event)" onclick="afficherDetails(this)">- ${plat.Name} <button onclick="supprimerPlat(this, ${menuIndex})">X</button></div>`
        } else {
          // Gérer le cas où le plat n'est pas trouvé dans platsData
          platsInfoJour += `<div class="draggable plat-item" data-plat-name="${platDuMenu.name}" data-plat-jour="${platDuMenu.jour}" draggable="${editMode}" ondragstart="handleDragStart(event)" onclick="afficherDetails(this)">- ${platDuMenu.name} (Plat non trouvé) <button onclick="supprimerPlat(this, ${menuIndex})">X</button></div>`
        }
      })
      jourCell.innerHTML = platsInfoJour
    })
  })

  menusTable.appendChild(table)
}

export function updateMenuSelector(menus: Menu[]): void {
  const menuSelector = document.getElementById('menu-selector') as HTMLSelectElement
  if (!menuSelector) return // Gestion de l'erreur

  menuSelector.innerHTML = '<option value="all">Tous les menus</option>'

  menus.forEach((menu) => {
    const option = document.createElement('option')
    option.value = menu.Name
    option.textContent = menu.Name
    menuSelector.appendChild(option)
  })
}


export function exporterCSV(): void {
  const menusTable = document.getElementById('menus-table')?.querySelector('table')
  if (!menusTable) {
    alert('Aucun menu à exporter.')
    return
  }

  const rows = Array.from(menusTable.querySelectorAll('tr'))
  const csvContent = rows
    .map((row) => {
      const cells = Array.from(row.querySelectorAll('th, td'))
      return cells
        .map((cell) => {
          let text = cell.textContent || '' // Gérer le cas où textContent est null

          // Gestion des guillemets doubles et des retours à la ligne
          text = text.replace(/"/g, '""')
          text = text.replace(/\n/g, ' ')

          return `"${text}"`
        })
        .join(',')
    })
    .join('\r\n')

  const csvData = '\ufeff' + csvContent

  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', 'menus.csv')
  link.click()
  URL.revokeObjectURL(url)
}

export function handleDragStart(event: DragEvent): void {
  draggedPlat = event.target as HTMLElement // Cast to HTMLElement
  if (draggedPlat) {
    // Check if draggedPlat is not null
    event.dataTransfer?.setData(
      // Optional chaining for dataTransfer
      'text/plain',
      draggedPlat.dataset.platName + ';' + draggedPlat.dataset.platJour,
    )
  }
}

export function handleDragOver(event: DragEvent): void {
  event.preventDefault()
}

export function handleDrop(event: DragEvent): void {
  event.preventDefault()

  if (
    draggedPlat &&
    event.target instanceof HTMLElement &&
    event.target.classList.contains('dropzone')
  ) {
    // Type guard
    const jour = event.target.dataset.jour
    const menuIndex = parseInt(event.target.dataset.menuIndex || '') // Parse as int, handle potential NaN
    const data = event.dataTransfer?.getData('text/plain') // Optional chaining
    if (data) {
      const [platName, platJour] = data.split(';')

      const menu = menusData[menuIndex]
      if (menu) {
        // Check if the menu exists
        const platIndex = menu.Plats.findIndex((p) => p.name === platName && p.jour === platJour)

        if (platIndex !== -1) {
          const plat = menu.Plats.splice(platIndex, 1)[0]
          // plat.jour = jour;
          menu.Plats.push(plat)

          afficherMenus(menusData, platsData)
          saveData() // Make sure saveData is defined
        }
      }
    }
  }
}

export function afficherDetails(element: HTMLElement): void {
  // Type the parameter
  const selectedMenuValue = (document.getElementById('menu-selector') as HTMLSelectElement)?.value // Optional chaining
  if (selectedMenuValue === 'all') return

  const detailsDiv = document.getElementById('plat-details') as HTMLDivElement
  if (!detailsDiv) {
    return
  }
  detailsDiv.innerHTML = ''

  const platName = element.dataset.platName
  const platJour = element.dataset.platJour
  const nbp = element.dataset.nbp
  const produits = element.dataset.produits

  let detailsHTML = `<strong>${platName}</strong><br>`

  if (nbp) {
    detailsHTML += `Nombre de personnes : ${nbp}<br>`
  }
  if (produits) {
    detailsHTML += `Produits : ${produits}<br>`
  }
  detailsDiv.innerHTML = detailsHTML
}


export function afficherFormulaireAjoutPlat(): void {
  const form = document.getElementById('formulaire-ajout-plat') as HTMLElement
  if (form) {
    form.style.display = 'block'
  }
}

export function sauvegarderMenu(): void {
  if (selectedMenuIndex !== -1) {
    const dataToSave = {
      plats: platsData,
      menus: menusData,
      products: products, // Make sure 'products' is defined with a proper type
    }

    fetch('http://localhost:3000/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSave),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`${response.status} ${response.statusText}: ${text}`)
          })
        }
        return response.json() // Parse the response as JSON
      })
      .then((data) => {
        // Type the 'data' parameter appropriately if needed
        console.log('Réponse du serveur:', data) // Log the parsed JSON data
        alert('Menu sauvegardé !')
      })
      .catch((error) => {
        console.error('Erreur lors du POST:', error)
        alert('Erreur lors de la sauvegarde du menu.')
      })
  } else {
    alert('Veuillez sélectionner un menu à sauvegarder.')
  }
}

export function toggleEditMode(): void {
  editMode = !editMode
  const modifierMenuButton = document.getElementById('modifier-menu') as HTMLButtonElement
  const sauvegarderMenuButton = document.getElementById('sauvegarder-menu') as HTMLButtonElement
  const ajouterPlatButton = document.getElementById('ajouter-plat') as HTMLButtonElement
  const formulaireAjoutPlat = document.getElementById('formulaire-ajout-plat') as HTMLElement
  const menuTable = document.querySelector('#menus-table table') as HTMLTableElement

  if (menuTable) {
    const jourCells = menuTable.querySelectorAll('td:not(:first-child):not(:nth-child(2))')
    jourCells.forEach((cell) => {
      cell.classList.toggle('dropzone', editMode)
      const platItems = cell.querySelectorAll('.plat-item')
      platItems.forEach((platItem) => {
        if (platItem instanceof HTMLElement) {
          // Type Guard
          platItem.draggable = editMode
        }
      })
    })
  }

  if (modifierMenuButton && sauvegarderMenuButton && ajouterPlatButton && formulaireAjoutPlat) {
    // Check if elements are not null
    modifierMenuButton.textContent = editMode ? 'Annuler les modifications' : 'Modifier le menu'
    formulaireAjoutPlat.style.display = editMode ? 'block' : 'none'
    sauvegarderMenuButton.style.display = editMode ? 'block' : 'none'
    ajouterPlatButton.style.display = editMode ? 'block' : 'none'
  }

  afficherMenus(menusData, platsData)
}

export function loadDataAndDisplay(): void {
  fetch('http://localhost:3000/data')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`)
      }
      return response.json()
    })
    .then((data: { menus: Menu[]; plats: Plat[]; products: any[] }) => {
      // Type the data
      menusData = data.menus || []
      platsData = data.plats || []
      products = data.products || [] // Assign products data

      const selectPlat = document.getElementById('select-plat') as HTMLSelectElement
      if (selectPlat) {
        // Check if element exists
        selectPlat.innerHTML = ''
        platsData.forEach((plat) => {
          const option = document.createElement('option')
          option.value = plat.Name
          option.textContent = plat.Name
          selectPlat.appendChild(option)
        })
      }

      updateMenuSelector(menusData)
      afficherMenus(menusData, platsData)
    })
    .catch((error) => {
      console.error('Erreur lors du chargement des données:', error)
      const menusTable = document.getElementById('menus-table') as HTMLElement
      if (menusTable) {
        // Check if element exists
        menusTable.innerHTML = '<p>Erreur lors du chargement des menus.</p>'
      }
    })
}

export function supprimerPlat(button: HTMLElement, menuIndex: number): void {
  const platItem = button.parentNode as HTMLElement
  if (!platItem) return // Check if parent exists

  const platName = platItem.dataset.platName
  const platJour = platItem.dataset.platJour

  const menu = menusData[menuIndex]
  if (menu) {
    // Check if menu exists
    const platIndex = menu.Plats.findIndex((p) => p.name === platName && p.jour === platJour)

    if (platIndex !== -1) {
      menu.Plats.splice(platIndex, 1)
      afficherMenus(menusData, platsData)
      saveData()
    }
  }
}

export function saveData(): void {
  const dataToSave = {
    plats: platsData,
    menus: menusData,
    products: products, // Make sure 'products' is defined with a proper type
  }

  fetch('http://localhost:3000/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataToSave),
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(`${response.status} ${response.statusText}: ${text}`)
        })
      }
      return response.json() // Expect JSON response
    })
    .then((data) => {
      console.log('Réponse du serveur:', data)
    })
    .catch((error) => console.error('Erreur lors du POST:', error))
}

export function ajouterPlatAuMenu(): void {
  const selectPlat = document.getElementById('select-plat') as HTMLSelectElement
  const jourPlatSelect = document.getElementById('jour-plat') as HTMLSelectElement

  if (!selectPlat || !jourPlatSelect) {
    // Check if elements exist
    alert('Erreur: Impossible de trouver les éléments du formulaire.')
    return
  }

  const nomPlat = selectPlat.value
  const jourPlat = jourPlatSelect.value
  const selectedMenuValue = (document.getElementById('menu-selector') as HTMLSelectElement)?.value

  if (!selectedMenuValue) {
    alert('Veuillez sélectionner un menu.')
    return
  }

  const selectedMenuIndex = menusData.findIndex((menu) => menu.Name === selectedMenuValue)

  if (selectedMenuIndex !== -1) {
    const menu = menusData[selectedMenuIndex]
    if (menu) {
      // Check if menu exists
      menu.Plats.push({
        name: nomPlat,
        jour: jourPlat,
      })

      const form = document.getElementById('formulaire-ajout-plat') as HTMLElement
      if (form) {
        form.style.display = 'none'
      }

      afficherMenus(menusData, platsData)
      saveData()
    }
  } else {
    alert('Sélectionnez un menu.')
  }
}


