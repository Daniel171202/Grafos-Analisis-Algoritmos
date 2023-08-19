<template>
  <head>
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ"
        crossorigin="anonymous"
      />

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />

      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-aFq/bzH65dt+w6FI2ooMVUpc+21e0SRygnTpmBvdBgSdnuTN7QbdgL+OapgHtvPp"
        crossorigin="anonymous"
      />
    </head>
      <div>
        <div style="height: 20vh; width: 100vw; margin-top: 30vh;">
          <nav-bar></nav-bar>

        </div>
        <body>

      <div class="home">
      <h1>Bienvenido a la Página de Algoritmos</h1>
      <div class="botones-home">
        <button class="opciones" @click="goToPage('/grafo')">
          <span class="move"><i class="fas fa-cogs fa-bounce"></i><a> Ir a nodos</a></span>
        </button>
        <button class="opciones" @click="goToPage('/tercera-pagina')"><span class="move"><i class="fas fa-th fa-bounce"></i><a> Ir a Matriz</a></span></button>
      </div>
      </div>
      </body>
        
      </div>
 
</template>


<script>
import NavBar from './navBar.vue'
export default {
  components: {
    NavBar
  },
  methods: {
    goToPage(route) {
      this.$router.push(route);
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap');


* {
  font-family: 'Poppins', sans-serif;
}

body{
  background: linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%);
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5% 0;
}

.home {
  display: flex;
  text-align: center;
  width: 100%;
  height: 100%;
  flex-direction: column;
}
.home h1{
  font-size: 5rem;
}
.botones-home{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  min-height: 25%;
  width: 100%;
}

.home .botones-home .opciones{
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 25%;
  height: 25%;
  margin: 1% 5%;
  font-size: 2rem;
}

.home .botones-home .opciones .move{
  transform: translateX(42%);
  transition: 0.5s ease-in;
}
.home .botones-home .opciones:hover .move{
  transform: translateX(0%);
  transition: 0.5s ease-in-out;
}

.home .botones-home .opciones .move a{
  opacity: 0;
}

.home .botones-home .opciones:hover .move a{
  opacity: 1;
}

</style>
