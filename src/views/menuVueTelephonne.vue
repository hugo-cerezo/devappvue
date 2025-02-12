<template>
    <div class="day-focus-container">
      <h1>Focus Jour par Jour (vue mobile)</h1>
  
      <!-- Sélecteur de menu -->
      <div class="select-row">
        <label for="menu-selector">Choisir un menu :</label>
        <select id="menu-selector" v-model="selectedMenuIndex">
          <option v-for="(menu, i) in menus" :key="i" :value="i">
            {{ menu.Name }}
          </option>
        </select>
      </div>
  
      <!-- Barre d'onglets pour les jours -->
      <div v-if="currentMenu?.days?.length" class="day-tabs">
        <button
          v-for="day in currentMenu.days"
          :key="day"
          :class="{ active: selectedDay === day }"
          @click="selectedDay = day"
        >
          {{ day }}
        </button>
      </div>
  
      <!-- Affichage des catégories & plats pour le jour sélectionné -->
      <div v-if="currentMenu && selectedDay" class="day-content">
        <div 
          v-for="cat in currentMenu.categories" 
          :key="cat.name" 
          class="category-block"
        >
          <h2>{{ cat.name }}</h2>
          <!-- On liste les plats du selectedDay -->
          <div 
            v-for="plat in cat[selectedDay]" 
            :key="plat.id" 
            class="plat-item"
            @click="toggleDetails(plat)"
          >
            <span>{{ plat.name }}</span>
          </div>
        </div>
      </div>
  
      <!-- Détails du plat sélectionné (facultatif) -->
      <div v-if="selectedPlat" class="plat-details">
        <h3>{{ selectedPlat.name }}</h3>
        <p v-if="selectedPlat.recette">
          <strong>Recette : </strong>{{ selectedPlat.recette }}
        </p>
        <ul v-if="selectedPlat.Products?.length">
          <li v-for="(prod, i) in selectedPlat.Products" :key="i">{{ prod }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, watch } from 'vue'
  
  /**
   * dataFetched = {
   *   menus: [
   *     {
   *       Name: 'Menu Semaine 1',
   *       days: [...],        // ex: ["Lundi","Mardi","Mercredi","Jeudi","Vendredi"]
   *       categories: [...],  // ex: [{ name:'ENTREES', Lundi:[], Mardi:[], ... }, ...]
   *       products: [...],
   *       plats: [...]
   *     },
   *     ... // plus d'autres menus
   *   ]
   * }
   */
  const dataFetched = ref({ menus: [] })
  
  const menus = computed(() => dataFetched.value.menus || [])
  
  // Sélection : index du menu, jour, et plat
  const selectedMenuIndex = ref(0)
  const selectedDay = ref('')       // sera défini plus tard
  const selectedPlat = ref(null)
  
  // menu actuel
  const currentMenu = computed(() => {
    if (!menus.value.length) return null
    return menus.value[selectedMenuIndex.value] || null
  })
  
  async function fetchData() {
    try {
      const resp = await fetch('http://localhost:3000/data')
      if (!resp.ok) throw new Error(`Erreur HTTP ${resp.status}`)
      const data = await resp.json()
  
      dataFetched.value = data
  
      // s'il existe au moins un menu
      if (menus.value.length) {
        selectedMenuIndex.value = 0
        // Par défaut, on sélectionne le premier jour
        if (currentMenu.value?.days?.length) {
          selectedDay.value = currentMenu.value.days[0]
        }
      }
    } catch (err) {
      console.error('Erreur fetchData:', err)
    }
  }
  
  onMounted(fetchData)
  
  /** 
   * Quand on change de menu, on réinitialise day & plat
   */
  watch(selectedMenuIndex, () => {
    selectedPlat.value = null
    if (currentMenu.value?.days?.length) {
      selectedDay.value = currentMenu.value.days[0]
    } else {
      selectedDay.value = ''
    }
  })
  
  /**
   * toggleDetails => clic sur un plat 
   */
  function toggleDetails(plat) {
    selectedPlat.value = (selectedPlat.value === plat) ? null : plat
  }
  </script>
  
  <style scoped>
  .day-focus-container {
    padding: 10px;
  }
  
  .select-row {
    margin: 8px 0;
  }
  .select-row label {
    display: inline-block;
    width: 120px;
    font-weight: 600;
  }
  
  /* Barres d'onglets pour jours */
  .day-tabs {
    display: flex;
    margin: 12px 0;
  }
  .day-tabs button {
    margin-right: 8px;
    padding: 6px 12px;
    cursor: pointer;
    border: 1px solid #ccc;
    background-color: #353535;
    border-radius: 4px;
  }
  .day-tabs button.active {
    background-color: #838383;
    border-bottom: 2px solid #42b983;
    font-weight: 600;
  }
  
  /* Layout jour par jour */
  .day-content {
    margin-top: 10px;
  }
  .category-block {
    margin: 16px 0;
    padding: 8px;
    background-color: #383737;
    border-radius: 5px;
  }
  .category-block h2 {
    margin-top: 0;
    color: #42b983;
    font-size: 1.1rem;
  }
  .plat-item {
    padding: 4px;
    margin: 4px 0;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.2s ease;
  }
  .plat-item:hover {
    background-color: #3f3f3f;
  }
  .plat-details {
    margin: 16px 0;
    border: 1px solid #ccc;
    background: #313131;
    padding: 8px;
  }
  </style>
  