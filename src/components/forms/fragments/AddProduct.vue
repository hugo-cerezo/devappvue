<script setup lang="ts"></script>
<template>
  <div class="border rounded p-2 mb-2 form-group">
    <label for="" class="mb-3">Ajouter un produit</label>
    <input type="text" placeholder="Nom" class="form-control mb-2" />
    <div class="border rounded p-2 mb-2 form-group">
      <div class="d-flex">
        <div class="me-1">
          <label for="meat">Viande</label>
          <input class="form-check-input ms-1" type="checkbox" name="meat" />
        </div>
        <div class="me-1">
          <label for="fish">Poisson</label>
          <input class="form-check-input ms-1" type="checkbox" name="fish" />
        </div>
        <div class="me-1">
          <label for="vegetable">Légume</label>
          <input class="form-check-input ms-1" type="checkbox" name="vegetable" />
        </div>
        <div class="me-1">
          <label for="fruit">Fruit</label>
          <input class="form-check-input ms-1" type="checkbox" name="fruit" />
        </div>
        <div class="me-1">
          <label for="spice">Épice</label>
          <input class="form-check-input ms-1" type="checkbox" name="spice" />
        </div>
      </div>
    </div>
  </div>
</template>
