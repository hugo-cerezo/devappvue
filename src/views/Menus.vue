<template>
  <div>
    <h1>Planning Multi-Menus</h1>

    <!-- Sélecteur de menu -->
    <div>
      <label for="menu-selector">Choisir un menu :</label>
      <select id="menu-selector" v-model="selectedMenuIndex">
        <option
          v-for="(menu, i) in menus"
          :key="menu.Name"
          :value="i"
        >
          {{ menu.Name }}
        </option>
      </select>
    </div>

    <!-- Boutons globaux -->
    <div>
      <button @click="toggleEditMode">
        {{ editMode ? 'Annuler les modifications' : 'Modifier le menu' }}
      </button>
      <button v-if="editMode" @click="saveData">Sauvegarder</button>
      <button v-if="editMode" @click="toggleForms">Afficher Formulaires</button>
      <button @click="exportCSV">Exporter CSV</button>
    </div>

    <!-- Affichage du menu sélectionné -->
    <div v-if="currentMenu">
      <table v-if="currentMenu.days?.length && currentMenu.categories?.length">
        <thead>
          <tr>
            <th></th>
            <th v-for="day in currentMenu.days" :key="day">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cat in currentMenu.categories" :key="cat.name">
            <td><strong>{{ cat.name }}</strong></td>
            <td
              v-for="day in currentMenu.days"
              :key="day"
              class="dropzone"
              @dragover.prevent
              @drop="handleDrop($event, cat, day)"
            >
              <div
                v-for="(plat, index) in cat[day]"
                :key="plat.id"
                class="draggable"
                :draggable="editMode"
                :style="getPlatStyle(plat)"
                @dragstart="handleDragStart($event, cat, day, index)"
                @click="toggleDetails(plat)"
              >
                <span>{{ plat.name }}</span>
                <button v-if="editMode" @click.stop="supprimerPlat(cat, day, index)">X</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>Aucun menu disponible</p>

      <!-- Détails du plat sélectionné -->
      <div v-if="selectedPlat" class="plat-details">
        <h2>Détails : {{ selectedPlat.name }}</h2>
        <button @click="cyclePlatColor(selectedPlat)">
          Couleur : {{ selectedPlat.color || 'aucune' }}
        </button>

        <p v-if="selectedPlat.recette">
          <strong>Recette : </strong>{{ selectedPlat.recette }}
        </p>
      </div>

      <!-- Formulaires (onglets) -->
      <div v-if="editMode && showForms" class="forms-container">
        <div class="tabs">
          <button
            :class="{ active: selectedTab === 'new' }"
            @click="selectedTab = 'new'"
          >
            Nouveau Plat
          </button>
          <button
            :class="{ active: selectedTab === 'existing' }"
            @click="selectedTab = 'existing'"
          >
            Plat Existant
          </button>
        </div>

        <!-- Form : Nouveau Plat -->
        <form
          v-if="selectedTab === 'new'"
          @submit.prevent="addPlatNew"
          class="form-content"
        >
          <h3>Nouveau Plat</h3>

          <label>Nom du Plat :</label>
          <input type="text" v-model="newPlatName" required />

          <!-- On affiche TOUT LES PRODUITS (allProducts), pas ceux du current menu -->
          <label>Produits :</label>
          <select multiple v-model="newPlatProducts">
            <option
              v-for="product in allProducts"
              :key="product.Name"
              :value="product.Name"
            >
              {{ product.Name }}
            </option>
          </select>

          <label>Recette :</label>
          <textarea v-model="newPlatRecipe" rows="3"></textarea>

          <label>Catégorie :</label>
          <select v-model="newPlatCategory">
            <option
              v-for="cat in currentMenu.categories"
              :key="cat.name"
              :value="cat.name"
            >
              {{ cat.name }}
            </option>
          </select>

          <label>Jour :</label>
          <select v-model="newPlatDay">
            <option v-for="day in currentMenu.days" :key="day" :value="day">
              {{ day }}
            </option>
          </select>

          <button type="submit">Ajouter Plat</button>
        </form>

        <!-- Form : Plat Existant (on retire la zone Produits) -->
        <form
          v-else-if="selectedTab === 'existing'"
          @submit.prevent="addPlatExisting"
          class="form-content"
        >
          <h3>Plat Existant (Tous les menus confondus)</h3>

          <label>Choisir un plat :</label>
          <select v-model="selectedExistingPlatName" @change="loadExistingPlatFields">
            <option value="">-- Sélection --</option>
            <option
              v-for="p in allPlats"
              :key="p.Name"
              :value="p.Name"
            >
              {{ p.Name }}
            </option>
          </select>

          <!-- On retire la zone Produits -->
          <!-- On retire existingPlatProducts, n'est plus nécessaire -->

          <!-- On peut laisser le champ Recette si tu veux le modifier -->
          <label>Recette :</label>
          <textarea v-model="existingPlatRecipe" rows="3"></textarea>

          <label>Catégorie :</label>
          <select v-model="existingPlatCategory">
            <option
              v-for="cat in currentMenu.categories"
              :key="cat.name"
              :value="cat.name"
            >
              {{ cat.name }}
            </option>
          </select>

          <label>Jour :</label>
          <select v-model="existingPlatDay">
            <option
              v-for="day in currentMenu.days"
              :key="day"
              :value="day"
            >
              {{ day }}
            </option>
          </select>

          <button type="submit">Ajouter / Mettre à jour</button>
        </form>

        <!-- Form : Ajouter un Produit -->
        <form @submit.prevent="addProduct" class="form-content">
          <h3>Ajouter Produit</h3>

          <label>Nom du Produit :</label>
          <input type="text" v-model="newProductName" required />

          <label>Date de Commande :</label>
          <select v-model="newProductDate">
            <option value="viande">-7jours</option>
            <option value="poisson">-6jours</option>
            <option value="fruit_mer">-5jours</option>
            <option value="legumes">-4jours</option>
            <option value="fruits">-3jours</option>
            <option value="condiments">-2jours</option>
          </select>

          <label>Type de produit :</label>
          <select v-model="newProductType">
            <option value="viande">Viande</option>
            <option value="poisson">Poisson</option>
            <option value="fruit_mer">Fruit de mer</option>
            <option value="legumes">Légumes</option>
            <option value="fruits">Fruits</option>
            <option value="condiments">Condiments</option>
          </select>

          <button type="submit">Ajouter Produit</button>
        </form>
      </div>
    </div>
    <p v-else>Aucun menu sélectionné</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const dataFetched = ref({ menus: [] })
const menus = computed(() => dataFetched.value.menus)

const selectedMenuIndex = ref(0)
const currentMenu = computed(() => {
  if (!menus.value.length) return null
  return menus.value[selectedMenuIndex.value] || null
})

const editMode = ref(false)
const showForms = ref(false)
const selectedPlat = ref(null)
const selectedTab = ref('new')

// ALL PRODUCTS => on va cumuler tous les products de tous les menus
const allProducts = ref([])

// CHAMPS NOUVEAU PLAT
const newPlatName = ref('')
const newPlatProducts = ref([])
const newPlatRecipe = ref('')
const newPlatCategory = ref('')
const newPlatDay = ref('')

// CHAMPS PLAT EXISTANT
const selectedExistingPlatName = ref('')
const existingPlatRecipe = ref('')
const existingPlatCategory = ref('')
const existingPlatDay = ref('')

// CHAMPS PRODUIT
const newProductName = ref('')
const newProductDate = ref('viande')
const newProductType = ref('viande')

// ALL PLATS => cumul de tous les plats
const allPlats = ref([])

async function fetchAll() {
  try {
    const response = await fetch('http://localhost:3000/data')
    if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`)
    const data = await response.json()

    dataFetched.value = data

    // On boucle sur chaque menu pour générer ID / color
    dataFetched.value.menus.forEach(menu => {
      menu.categories.forEach(cat => {
        menu.days.forEach(day => {
          cat[day] = cat[day] || []
          cat[day].forEach(plat => {
            if (!plat.id) {
              plat.id = crypto.randomUUID
                ? crypto.randomUUID()
                : Date.now() + '-' + Math.random()
            }
            if (!plat.color) {
              plat.color = ''
            }
          })
        })
      })
    })

    // Construire allProducts => cumuler le .products de chaque menu
    const prodsSet = new Set()
    const tmpProds = []
    dataFetched.value.menus.forEach(menu => {
      if (menu.products) {
        menu.products.forEach(prod => {
          if (!prodsSet.has(prod.Name)) {
            prodsSet.add(prod.Name)
            tmpProds.push(prod)
          }
        })
      }
    })
    allProducts.value = tmpProds

    // Construire allPlats => cumuler le .plats de chaque menu
    const platsSet = new Set()
    const tmpPlats = []
    dataFetched.value.menus.forEach(menu => {
      if (menu.plats) {
        menu.plats.forEach(p => {
          if (!platsSet.has(p.Name)) {
            platsSet.add(p.Name)
            tmpPlats.push(p)
          }
        })
      }
    })
    allPlats.value = tmpPlats

    // Sélection par défaut
    if (dataFetched.value.menus.length) {
      selectedMenuIndex.value = 0
    }
  } catch (err) {
    console.error('Erreur fetchAll:', err)
  }
}

onMounted(fetchAll)

/** 
 * Boutons globaux
 */
function toggleEditMode() {
  editMode.value = !editMode.value
  if (!editMode.value) showForms.value = false
}
function toggleForms() {
  showForms.value = !showForms.value
  if (showForms.value) {
    selectedTab.value = 'new'
  }
}

/** 
 * DRAG & DROP
 */
function handleDragStart(evt, cat, day, index) {
  if (!editMode.value) return
  const payload = { catName: cat.name, day, index }
  evt.dataTransfer.setData('application/json', JSON.stringify(payload))
}
function handleDrop(evt, cat, newDay) {
  if (!editMode.value) return
  if (!currentMenu.value) return
  try {
    const data = JSON.parse(evt.dataTransfer.getData('application/json'))
    const originCat = currentMenu.value.categories.find(c => c.name === data.catName)
    if (!originCat) return
    const oldDay = data.day
    const idx = data.index
    const [movedPlat] = originCat[oldDay].splice(idx, 1)
    movedPlat.jour = newDay
    cat[newDay].push(movedPlat)
  } catch (err) {
    console.error('Erreur handleDrop:', err)
  }
}

/**
 * toggleDetails
 */
function toggleDetails(plat) {
  selectedPlat.value = (selectedPlat.value === plat) ? null : plat
}

/**
 * Supprimer plat
 */
function supprimerPlat(cat, day, index) {
  cat[day].splice(index, 1)
}

/**
 * cycle color
 */
function cyclePlatColor(plat) {
  const colors = ['', 'vert', 'jaune', 'rouge']
  const idx = colors.indexOf(plat.color)
  plat.color = colors[(idx + 1) % colors.length]
}

/**
 * getPlatStyle
 */
function getPlatStyle(plat) {
  let bg = '#f9f9f9'
  if (plat.color === 'vert') bg = '#b1e0b5'
  if (plat.color === 'jaune') bg = '#f7eb99'
  if (plat.color === 'rouge') bg = '#f7a7a7'
  return {
    backgroundColor: bg,
    margin: '4px 0',
    padding: '4px 8px',
    borderRadius: '4px',
    cursor: 'grab'
  }
}

/**
 * saveData
 */
async function saveData() {
  try {
    const response = await fetch('http://localhost:3000/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataFetched.value)
    })
    if (!response.ok) throw new Error('Erreur saveData')
    alert('Menus sauvegardés !')
  } catch (err) {
    console.error('Erreur saveData:', err)
  }
}

/**
 * addPlatNew
 */
async function addPlatNew() {
  if (!currentMenu.value) return
  if (!newPlatName.value) return alert('Saisir un nom de plat')
  if (!newPlatCategory.value || !newPlatDay.value) {
    return alert('Choisir cat + jour')
  }
  const cat = currentMenu.value.categories.find(c => c.name === newPlatCategory.value)
  if (!cat) return

  const newId = crypto.randomUUID
    ? crypto.randomUUID()
    : Date.now() + '-' + Math.random()

  const newPlat = {
    id: newId,
    name: newPlatName.value,
    Products: [...newPlatProducts.value],
    recette: newPlatRecipe.value,
    color: '',
    jour: newPlatDay.value
  }
  cat[newPlatDay.value].push(newPlat)

  // On l'ajoute dans .plats du currentMenu
  currentMenu.value.plats.push({
    Name: newPlatName.value,
    Products: [...newPlatProducts.value],
    recette: newPlatRecipe.value
  })

  // On l'ajoute dans allPlats si absent
  if (!allPlats.value.find(x => x.Name === newPlatName.value)) {
    allPlats.value.push({
      Name: newPlatName.value,
      Products: [...newPlatProducts.value],
      recette: newPlatRecipe.value
    })
  }

  newPlatName.value = ''
  newPlatProducts.value = []
  newPlatRecipe.value = ''

  await saveData()
  alert('Nouveau plat ajouté & sauvegardé.')
}

/**
 * addPlatExisting 
 * On supprime la zone Produits => on n'a plus existingPlatProducts
 * Juste la recette, cat, day
 */
async function addPlatExisting() {
  if (!currentMenu.value) return
  if (!selectedExistingPlatName.value) {
    return alert('Sélectionnez un plat existant')
  }
  if (!existingPlatCategory.value || !existingPlatDay.value) {
    return alert('Choisir cat + jour')
  }

  // On trouve le plat dans allPlats
  const detail = allPlats.value.find(p => p.Name === selectedExistingPlatName.value)
  if (!detail) {
    return alert('Plat introuvable dans allPlats')
  }

  const newId = crypto.randomUUID
    ? crypto.randomUUID()
    : Date.now() + '-' + Math.random()

  const cat = currentMenu.value.categories.find(c => c.name === existingPlatCategory.value)
  if (!cat) return

  // On crée un nouveau plat à insérer
  const newPlat = {
    id: newId,
    name: detail.Name,
    Products: detail.Products ? [...detail.Products] : [], // si tu veux y mettre ou pas
    recette: existingPlatRecipe.value || detail.recette || '',
    color: '',
    jour: existingPlatDay.value
  }
  cat[existingPlatDay.value].push(newPlat)

  // On peut mettre à jour la recette dans detail si tu veux
  detail.recette = existingPlatRecipe.value || detail.recette

  // On l'ajoute dans currentMenu.value.plats s'il n'existe pas déjà
  if (!currentMenu.value.plats.find(p => p.Name === detail.Name)) {
    currentMenu.value.plats.push(detail)
  }

  // reset
  selectedExistingPlatName.value = ''
  existingPlatRecipe.value = ''
  existingPlatCategory.value = ''
  existingPlatDay.value = ''

  await saveData()
  alert('Plat existant ajouté / mis à jour & sauvegardé.')
}

/**
 * loadExistingPlatFields 
 * => On ne charge plus de Products, car tu dis “supprimer la zone produits”
 */
function loadExistingPlatFields() {
  const detail = allPlats.value.find(p => p.Name === selectedExistingPlatName.value)
  if (!detail) {
    existingPlatRecipe.value = ''
    return
  }
  existingPlatRecipe.value = detail.recette || ''
}

/**
 * addProduct
 */
async function addProduct() {
  if (!currentMenu.value) return
  if (!newProductName.value) {
    return alert('Saisir un nom de produit')
  }
  currentMenu.value.products.push({
    Name: newProductName.value,
    DateOfCommand: newProductDate.value,
    Type: newProductType.value
  })

  // On l'ajoute dans allProducts s'il n'y est pas
  if (!allProducts.value.find(x => x.Name === newProductName.value)) {
    allProducts.value.push({
      Name: newProductName.value,
      DateOfCommand: newProductDate.value,
      Type: newProductType.value
    })
  }

  newProductName.value = ''
  newProductDate.value = 'viande'
  newProductType.value = 'viande'

  await saveData()
  alert('Produit ajouté & sauvegardé')
}

/**
 * exportCSV
 */
function exportCSV() {
  if (!currentMenu.value) return
  let csv = 'Catégorie,Jour,Nom,Couleur,Recette\\r\\n'
  const cm = currentMenu.value

  cm.categories.forEach(cat => {
    cm.days.forEach(day => {
      ;(cat[day] || []).forEach(plat => {
        const catName = cat.name.replace(/\"/g, '\"\"')
        const d = day.replace(/\"/g, '\"\"')
        const nm = plat.name.replace(/\"/g, '\"\"')
        const clr = (plat.color || '').replace(/\"/g, '\"\"')
        const rct = (plat.recette || '').replace(/\"/g, '\"\"')
        csv += `"${catName}","${d}","${nm}","${clr}","${rct}"\\r\\n`
      })
    })
  })

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', cm.Name.replace(/ /g, '_') + '.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
  alert('CSV exporté pour ' + cm.Name)
}
</script>

<style scoped>
.draggable {
  cursor: grab;
  background-color: #f0f0f0;
  padding: 5px;
  margin: 5px;
  border-radius: 5px;
}
.dropzone {
  min-height: 50px;
  border: 1px dashed #ccc;
  padding: 10px;
}
</style>
