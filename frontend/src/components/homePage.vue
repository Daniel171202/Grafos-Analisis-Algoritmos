<template>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
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
    <!--<div style="height: 20vh; width: 100vw; margin-top: 30vh">
        <nav-bar></nav-bar>

    </div>-->

    <body>
      <div class="home container">
        <h1>Bienvenido a la Página de Algoritmos</h1>
        <div class="botones-home row">
          <button class="opciones col-md-4" @click="goToPage('/grafo')">
            <span class="move"
              ><i class="fas fa-cogs fa-bounce"></i><a> Ir a Grafos</a></span
            >
          </button>
          <!--<button class="opciones col-md-4" @click="goToPage('/Asignación')">
            <span class="move"
              ><i class="fas fa-th fa-bounce"></i
              ><a> Ir a Algoritmo de Asignación</a></span
            >
          </button>-->
        </div>
        <button class="help" @click="redirectToDriveFile">
          Nesecitas ayuda?
        </button>
        <button class="help" @click="redirectToDriveFile1">
          Nesecitas ayuda con la asignación?
        </button>
      </div>
    </body>
  </div>
</template>

<script>
//import NavBar from "./navBar.vue";
export default {
  components: {
    //NavBar,
  },
  methods: {
    redirectToDriveFile() {
      // Reemplaza 'URL_DEL_ARCHIVO_EN_GOOGLE_DRIVE' con el enlace público a tu archivo en Google Drive
      const driveFileUrl =
        "https://drive.google.com/file/d/16xFKaWOGo6UIOXd1LE_dta-X-z87Ob5Y/view?usp=drive_link";

      // Abre el enlace en una nueva ventana o pestaña
      window.open(driveFileUrl, "_blank");
    },
    redirectToDriveFile1() {
      // Reemplaza 'URL_DEL_ARCHIVO_EN_GOOGLE_DRIVE' con el enlace público a tu archivo en Google Drive
      const driveFileUrl =
        "https://drive.google.com/file/d/1kFsLpXhDA4tWQszhebeCT-schWlhVvuB/view?usp=sharing";

      // Abre el enlace en una nueva ventana o pestaña
      window.open(driveFileUrl, "_blank");
    },
    goToPage(route) {
      this.$router.push(route);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap");

* {
  font-family: "Poppins", sans-serif;
  margin: 0;
  padding: 0;
}

body {
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
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 100%;
  flex-direction: column;
}

.home h1 {
  font-size: 5rem;
  font-weight: 700;
}

.botones-home {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  min-height: 35%;
  width: 100%;
  border-radius: 20px;
}

.home .botones-home .opciones {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 25%;
  height: 25%;
  margin: 1% 5%;
  font-size: 2rem;
  border-radius: 20px;
  transition: ease-in 0.5s;
}

.home .botones-home .opciones .move {
  transform: translateX(42%);
  transition: 0.5s ease-in;
}

.home .botones-home .opciones:hover .move {
  transform: translateX(0%);
  transition: 0.5s ease-in-out;
}

.home .botones-home .opciones .move a {
  opacity: 0;
}

.home .botones-home .opciones:hover .move a {
  opacity: 1;
}

@media screen and (max-width: 440px) {
  .home h1 {
    font-size: 3rem;
    font-weight: 700;
  }
  .home .botones-home .opciones {
    font-size: 1.5rem;
    border-radius: 20px;
  }
  .help {
    background-color: #2ecc71;
    font-size: 1.5rem;
    border: none;
    border-radius: 20px;
    padding: 5px;
  }
}
</style>
