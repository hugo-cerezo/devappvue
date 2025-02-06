
<template>
    <h1>Gestion des Produits, Plats et Menus</h1>
    <h2>liste des menus existants</h2>
    <div id="menu-list"></div>
    <div></div>

    <!-- Formulaire pour ajouter un produit -->


    <!-- Formulaire pour ajouter un plat -->
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
      <label for="product-type">Type de produit :</label> <--- Nouveau sélecteur
      -->
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

    <form id="menu-form">
      <h2>Ajouter un Menu</h2>
      <label for="menu-name">Nom du Menu :</label>
      <input type="text" id="menu-name" required />
      <label for="menu-people">Nombre de Personnes :</label>
      <input type="number" id="menu-people" required />
      <label for="menu-date">Date :</label>
      <input type="date" id="menu-date" required />

      <div id="menu-plats-container">
        <select id="menu-plats-select"></select>
        <select id="menu-jour-select">
          <option value="lundi">Lundi</option>
          <option value="mardi">Mardi</option>
          <option value="mercredi">Mercredi</option>
          <option value="jeudi">Jeudi</option>
          <option value="vendredi">Vendredi</option>
        </select>
        <button type="button" onclick="addPlatAuMenu()">
          Ajouter Plat au Menu
        </button>
      </div>

      <button type="button" onclick="addMenu(),saveData( )">
        Créer le Menu
      </button>
    </form>
</template>