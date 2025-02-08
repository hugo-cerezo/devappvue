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
<style>
@import url('../assets/menus.css');
</style>
<template>
  <h1>Liste des Menus</h1>
  <div>
    <label for="menu-selector">Sélectionner un menu:</label>
    <select id="menu-selector" v-model="selectedMenu">
      <option value="all">Tous les menus</option>
      <option v-for="menu in menusData" :key="menu.Name" :value="menu.Name">
        {{ menu.Name }}
      </option>
    </select>
  </div>
  <div>
    <button @click="exporterCSV">Exporter en CSV</button>
    <button id="modifier-menu" v-if="selectedMenu !== 'all'" @click="toggleEditMode">
      {{ editMode ? 'Annuler les modifications' : 'Modifier le menu' }}
    </button>
  </div>
  <button id="sauvegarder-menu" v-if="editMode" @click="sauvegarderMenu">
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
          <th v-for="jour in joursOrdonnes" :key="jour">{{ jour.toUpperCase() }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(menu, menuIndex) in menusAafficher" :key="menu.Name">
          <td>{{ menu.Name }}</td>
          <td>{{ menu.Date }}</td>
          <td v-for="jour in joursOrdonnes" :key="jour" class="dropzone" :data-jour="jour" :data-menu-index="menuIndex"
            @dragover.prevent="handleDragOver" @drop.prevent="handleDrop">
            <div v-for="plat in menu.Plats.filter(p => p.jour === jour)" :key="plat.name" class="draggable plat-item"
              :draggable="editMode" @dragstart="handleDragStart($event, plat)" @click="afficherDetails(plat)">
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
      <strong>{{ selectedPlat.name }}</strong><br>
      Nombre de personnes: {{ selectedPlat.NombresPersonne }}<br>
      Produits: {{ selectedPlat.Products.join(', ') }}
    </p>
  </div>

  <div id="formulaire-ajout-plat" v-if="showAddPlatForm">
    <label for="select-plat">Sélectionner un plat:</label>
    <select id="select-plat" v-model="newPlatName">
      <option v-for="plat in platsData" :key="plat.Name" :value="plat.Name">
        {{ plat.Name }}
      </option>
    </select>
    <label for="jour-plat">Jour:</label>
    <select id="jour-plat" v-model="newPlatJour">
      <option v-for="jour in joursOrdonnes" :key="jour" :value="jour">
        {{ jour }}
      </option>
    </select>
    <button @click="ajouterPlatAuMenu">Ajouter</button>
  </div>
  <div>
  <div id="addproducts">
    <form id="plat-form">
      <h2>Ajouter un Plat</h2>
      <label for="plat-name">Nom du Plat :</label>
      <input type="text" id="plat-name" required />
      <label for="plat-people">Nombre de Personnes :</label>
      <input type="number" id="plat-people" required />
      <label for="plat-products">Produits :</label>
      <select id="plat-products" multiple></select>
      <button type="button" onclick="addPlat(),updateMenuList()">
        Ajouter Plat
      </button>
    </form>
    <form id="product-form">
      <h2>Ajouter un Produit</h2>
      <label for="product-name">Nom du Produit :</label>
      <input type="text" id="product-name" required />
      <label for="product-quantity">Quantité :</label>
      <input type="number" id="product-quantity" required />
      <label for="product-date">Date de Commande :</label>
      <select id="product-date">
        <option value="viande">-7jours</option>
        <option value="poisson">-6jours</option>
        <option value="fruit_mer">-5jours</option>
        <option value="legumes">-4jours</option>
        <option value="fruits">-3jours</option>
        <option value="condiments">-2jours</option>
      </select>
      <label for="product-type">Type de produit :</label>
      <select id="product-type">
        <option value="viande">Viande</option>
        <option value="poisson">Poisson</option>
        <option value="fruit_mer">Fruit de mer</option>
        <option value="legumes">Légumes</option>
        <option value="fruits">Fruits</option>
        <option value="condiments">Condiments</option>
      </select>
      <button type="button" onclick="addProduct()">Ajouter Produit</button>
    </form>
  </div>
</div>
</template>