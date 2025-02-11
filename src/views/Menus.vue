<template>
  <div>
    <h1>Planning des Menus</h1>

    <div>
      <label for="menu-selector">Sélectionner un menu:</label>
      <select id="menu-selector" v-model="selectedMenu">
        <option v-for="menu in menus" :key="menu.Name" :value="menu.Name">
          {{ menu.Name }}
        </option>
      </select>

      <button @click="toggleEditMode">
        {{ editMode ? 'Annuler les modifications' : 'Modifier le menu' }}
      </button>
      <button v-if="editMode" @click="saveMenu">Sauvegarder</button>
      <button v-if="editMode" @click="toggleForms">Afficher les formulaires</button>
    </div>

    <!-- TABLEAU SI MENUS ET UN MENU SELECT -->
    <table v-if="menus.length && selectedMenu">
      <thead>
        <tr>
          <th v-for="jour in jours" :key="jour">{{ jour }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td
            v-for="jour in jours"
            :key="jour"
            class="dropzone"
            @dragover.prevent
            @drop="handleDrop($event, jour)"
          >
            <div
              v-for="(plat, index) in getPlatsParJour(jour)"
              :key="plat.id"
              class="draggable"
              :draggable="editMode"
              @dragstart="handleDragStart($event, plat)"
            >
              <span @click="toggleDetails(plat)">
                {{ plat.name }}
              </span>
              <button v-if="editMode" @click="supprimerPlat(plat.id)">X</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>Aucun menu disponible</p>

    <!-- PRODUITS DU PLAT SELECTIONNE -->
    <div v-if="selectedPlat">
      <h3>Produits du plat: {{ selectedPlat.name }}</h3>
      <ul>
        <li v-for="product in selectedPlat.Products" :key="product">
          {{ product }}
        </li>
      </ul>
    </div>

    <!-- Formulaires affichés UNIQUEMENT si on est en mode edit ET que showForms est true -->
    <div v-if="editMode && showForms">
      <!-- FORMULAIRE D'AJOUT DE PLAT -->
      <form id="plat-form" @submit.prevent="addPlat">
        <h2>Ajouter un Plat</h2>

        <label for="plat-name">Nom du Plat :</label>
        <input type="text" id="plat-name" v-model="newPlatName" required />

        <label for="plat-people">Nombre de Personnes :</label>
        <input type="number" id="plat-people" v-model="newPlatPeople" required />

        <label for="plat-products">Produits :</label>
        <select id="plat-products" multiple v-model="newPlatProducts">
          <option
            v-for="product in products"
            :key="product.Name"
            :value="product.Name"
          >
            {{ product.Name }}
          </option>
        </select>

        <button type="submit">Ajouter Plat</button>
      </form>

      <!-- FORMULAIRE D'AJOUT DE PRODUIT -->
      <form id="product-form" @submit.prevent="addProduct">
        <h2>Ajouter un Produit</h2>

        <label for="product-name">Nom du Produit :</label>
        <input
          type="text"
          id="product-name"
          v-model="newProductName"
          required
        />

        <label for="product-quantity">Quantité :</label>
        <input
          type="number"
          id="product-quantity"
          v-model="newProductQuantity"
          required
        />

        <label for="product-date">Date de Commande :</label>
        <select id="product-date" v-model="newProductDate">
          <option value="viande">-7jours</option>
          <option value="poisson">-6jours</option>
          <option value="fruit_mer">-5jours</option>
          <option value="legumes">-4jours</option>
          <option value="fruits">-3jours</option>
          <option value="condiments">-2jours</option>
        </select>

        <label for="product-type">Type de produit :</label>
        <select id="product-type" v-model="newProductType">
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
</template>

<script>
import { ref, onMounted, watch } from "vue";

export default {
  setup() {
    const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
    const menus = ref([]);
    const selectedMenu = ref(null);
    const editMode = ref(false);
    const selectedPlat = ref(null);
    const originalMenus = ref([]);

    // Ajout d'un booléen pour afficher ou masquer les 2 formulaires
    const showForms = ref(false);

    // État pour le formulaire “ajouter un Plat”
    const newPlatName = ref("");
    const newPlatPeople = ref("");
    const newPlatProducts = ref([]);

    // État pour le formulaire “ajouter un Produit”
    const newProductName = ref("");
    const newProductQuantity = ref("");
    const newProductDate = ref("viande");
    const newProductType = ref("viande");

    // Liste globale de produits, chargée depuis le JSON
    const products = ref([]);

    /**
     * Récupère les données depuis l'API, puis enrichit chaque plat avec un id unique
     * et les Products (depuis data.plats).
     */
    const fetchMenus = async () => {
      try {
        const response = await fetch("http://localhost:3000/data");
        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}`);
        }
        const data = await response.json();

        // data = { products: [...], plats: [...], menus: [...] }
        menus.value = data.menus || [];
        products.value = data.products || [];

        // Pour chaque menu, pour chaque Plat
        menus.value.forEach((menu) => {
          menu.Plats.forEach((plat) => {
            // 1) Générer un id unique
            plat.id = crypto.randomUUID
              ? crypto.randomUUID()
              : Date.now() + "-" + Math.random();

            // 2) Enrichir avec .Products
            const detail = data.plats.find((p) => p.Name === plat.name);
            plat.Products = detail ? detail.Products : [];
          });
        });

        // Pour annuler si besoin
        originalMenus.value = JSON.parse(JSON.stringify(menus.value));
        if (menus.value.length) {
          selectedMenu.value = menus.value[0].Name;
        }
      } catch (error) {
        console.error("Erreur lors du chargement des menus:", error);
      }
    };

    onMounted(fetchMenus);

    /**
     * Récupère la liste des plats d'un jour
     */
    const getPlatsParJour = (jour) => {
      const menu = menus.value.find((m) => m.Name === selectedMenu.value);
      if (!menu) return [];
      return menu.Plats.filter(
        (p) => p.jour.toLowerCase() === jour.toLowerCase()
      );
    };

    /**
     * Bascule / annule l’édition
     */
    const toggleEditMode = () => {
      if (editMode.value) {
        menus.value = JSON.parse(JSON.stringify(originalMenus.value));
      }
      editMode.value = !editMode.value;
      // Quand on ferme l'édition, on masque aussi les formulaires
      if (!editMode.value) {
        showForms.value = false;
      }
    };

    /**
     * Bascule l'affichage des 2 formulaires
     */
    const toggleForms = () => {
      showForms.value = !showForms.value;
    };

    /**
     * DRAG START
     */
    const handleDragStart = (event, plat) => {
      if (!editMode.value) return;
      const payload = { id: plat.id };
      event.dataTransfer.setData("application/json", JSON.stringify(payload));
    };

    /**
     * DROP
     * On localise le plat par son id unique, on le retire, puis on modifie son jour
     */
    const handleDrop = (event, newJour) => {
      if (!editMode.value) return;
      try {
        const data = JSON.parse(event.dataTransfer.getData("application/json"));
        const menu = menus.value.find((m) => m.Name === selectedMenu.value);
        if (!menu) return;

        const platIndex = menu.Plats.findIndex((p) => p.id === data.id);
        if (platIndex === -1) return;

        const [movedPlat] = menu.Plats.splice(platIndex, 1);
        movedPlat.jour = newJour;
        menu.Plats.push(movedPlat);
        menus.value = [...menus.value];
      } catch (err) {
        console.error("Erreur Drop:", err);
      }
    };

    /**
     * Affiche / masque les produits
     */
    const toggleDetails = (plat) => {
      selectedPlat.value = selectedPlat.value === plat ? null : plat;
    };

    /**
     * Supprime un plat en le localisant par son id
     */
    const supprimerPlat = (platId) => {
      const menu = menus.value.find((m) => m.Name === selectedMenu.value);
      if (menu) {
        const index = menu.Plats.findIndex((p) => p.id === platId);
        if (index !== -1) {
          menu.Plats.splice(index, 1);
          menus.value = [...menus.value];
        }
      }
    };

    /**
     * Sauvegarder
     */
    const saveMenu = async () => {
      try {
        const response = await fetch("http://localhost:3000/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ menus: menus.value }),
        });
        if (!response.ok) {
          throw new Error("Erreur lors de la sauvegarde");
        }
        originalMenus.value = JSON.parse(JSON.stringify(menus.value));
        alert("Menu sauvegardé avec succès !");
      } catch (error) {
        console.error("Erreur lors de la sauvegarde du menu:", error);
      }
    };

    /**
     * Ajoute un nouveau plat dans la liste globale data.plats et dans le menu sélectionné
     */
    const addPlat = () => {
      if (!newPlatName.value) return alert("Veuillez saisir un nom de plat");
      if (!newPlatPeople.value) return alert("Veuillez saisir un nombre de personnes");
      const menu = menus.value.find((m) => m.Name === selectedMenu.value);
      if (!menu) return;

      // Générez un id unique
      const newId = crypto.randomUUID
        ? crypto.randomUUID()
        : Date.now() + "-" + Math.random();

      // On ajoute le plat
      const newPlat = {
        id: newId,
        name: newPlatName.value,
        jour: "lundi", // par défaut, à toi de choisir
        Products: [...newPlatProducts.value], // copie
      };

      menu.Plats.push(newPlat);
      menus.value = [...menus.value];

      // Réinitialisation du formulaire
      newPlatName.value = "";
      newPlatPeople.value = "";
      newPlatProducts.value = [];
      alert("Plat ajouté !");
    };

    /**
     * Ajoute un produit dans data.products 
     */
    const addProduct = () => {
      if (!newProductName.value) {
        return alert("Veuillez saisir un nom de produit");
      }
      // Simple ajout dans la liste
      products.value.push({
        Name: newProductName.value,
        Quantity: newProductQuantity.value,
        DateOfCommand: newProductDate.value,
        Type: newProductType.value,
      });
      alert("Produit ajouté !");
      // Reset
      newProductName.value = "";
      newProductQuantity.value = "";
      newProductDate.value = "viande";
      newProductType.value = "viande";
    };

    // Quand on change de menu sélectionné
    watch(selectedMenu, () => {
      selectedPlat.value = null;
    });

    return {
      jours,
      menus,
      selectedMenu,
      editMode,
      selectedPlat,
      originalMenus,
      products,
      showForms,

      // States pour new Plat
      newPlatName,
      newPlatPeople,
      newPlatProducts,

      // States pour new Product
      newProductName,
      newProductQuantity,
      newProductDate,
      newProductType,

      // Méthodes
      getPlatsParJour,
      toggleEditMode,
      toggleForms,
      handleDragStart,
      handleDrop,
      toggleDetails,
      supprimerPlat,
      saveMenu,
      addPlat,
      addProduct,
    };
  },
};
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
