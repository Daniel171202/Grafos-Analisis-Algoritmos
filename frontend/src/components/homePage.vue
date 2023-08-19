<template>
  <div class="home">
    <h1>Bienvenido a la Página de Inicio</h1>
    <button @click="goToPage('/grafo')">Ir a Otra Página</button>
    <button @click="goToPage('/tercera-pagina')">Ir a Tercera Página</button>
  </div>
</template>

<script>
export default {
  methods: {
    goToPage(route) {
      this.$router.push(route);
    }
  }
};
</script>

<style>
.home {
  text-align: center;
  margin-top: 50px;
}
</style>
