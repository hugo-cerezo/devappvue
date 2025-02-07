<script setup lang="ts">
import {
  afficherMenus,
  loadDataAndDisplay,
  ajouterPlatAuMenu,
  saveData,
  supprimerPlat,
  toggleEditMode,
  sauvegarderMenu,
  afficherFormulaireAjoutPlat,
  afficherDetails,
  handleDrop,
  handleDragOver,
  handleDragStart,
  exporterCSV,
  updateMenuSelector,
} from './menusfonction';
import { Menu, Plat, PlatDuMenu } from './types'; 

import { ref, reactive, computed, onMounted } from 'vue';
loadDataAndDisplay()
</script>
<template>
  <h1>Liste des Menus</h1>

  <label for="menu-selector">Sélectionner un menu:</label>
  <select id="menu-selector" v-model="selectedMenu">
    <option value="all">Tous les menus</option>
    <option v-for="menu in menusData":key="menu.Name":value="menu.Name">
      {{ menu.Name }}
    </option>
  </select>

  <button @click="exporterCSV">Exporter en CSV</button>
  <button
    id="modifier-menu"
    v-if="selectedMenu!== 'all'"
    @click="toggleEditMode"
  >
    {{ editMode? 'Annuler les modifications': 'Modifier le menu' }}
  </button>
  <button
    id="sauvegarder-menu"
    v-if="editMode"
    @click="sauvegarderMenu"
  >
    Sauvegarder le menu
  </button>
  <button id="ajouter-plat" v-if="editMode" @click="afficherFormulaireAjoutPlat">
    Ajouter un plat
  </button>

  <div id="menus-table">
    <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Date</th>
          <th v-for="jour in joursOrdonnes":key="jour">{{ jour.toUpperCase() }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(menu, menuIndex) in menusAafficher":key="menu.Name">
          <td>{{ menu.Name }}</td>
          <td>{{ menu.Date }}</td>
          <td
            v-for="jour in joursOrdonnes"
          :key="jour"
            class="dropzone"
          :data-jour="jour"
          :data-menu-index="menuIndex"
            @dragover.prevent="handleDragOver"
            @drop.prevent="handleDrop"
          >
            <div
              v-for="plat in menu.Plats.filter(p => p.jour === jour)"
            :key="plat.name"
              class="draggable plat-item"
            :draggable="editMode"
              @dragstart="handleDragStart($event, plat)"
              @click="afficherDetails(plat)"
            >
              {{ plat.name }}
              <button @click.stop="supprimerPlat(plat, menuIndex)">X</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div id="plat-details">
    <p v-if="selectedPlat">
        <strong>{{selectedPlat.name}}</strong><br>
        Nombre de personnes: {{selectedPlat.NombresPersonne}}<br>
        Produits: {{selectedPlat.Products.join(', ')}}
    </p>
  </div>

  <div id="formulaire-ajout-plat" v-if="showAddPlatForm">
    <label for="select-plat">Sélectionner un plat:</label>
    <select id="select-plat" v-model="newPlatName">
      <option v-for="plat in platsData":key="plat.Name":value="plat.Name">
        {{ plat.Name }}
      </option>
    </select>
    <label for="jour-plat">Jour:</label>
    <select id="jour-plat" v-model="newPlatJour">
      <option v-for="jour in joursOrdonnes":key="jour":value="jour">
          {{ jour }}
      </option>
    </select>
    <button @click="ajouterPlatAuMenu">Ajouter</button>
  </div>
</template>