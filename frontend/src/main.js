import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import VNetworkGraph from "v-network-graph";
import "v-network-graph/lib/style.css";

import GrafoComponente from "./components/GrafoComponente.vue";
import HomePage from "./components/homePage.vue";
import Asignacion from "./components/grafoMetodo.vue";
import Sorts from "./components/sortsPage.vue";
import Arboles from "./components/ArbolComponente.vue";

const routes = [
  {
    name: "GrafoComponente",
    path: "/grafo",
    component: GrafoComponente,
  },
  {
    name: "HomePage",
    path: "/",
    component: HomePage,
  },
  {
    name: "Asignación",
    path: "/Asignación",
    component: Asignacion,
  },
  {
    name: "Sorts",
    path: "/Sorts",
    component: Sorts,
  },
  {
    name: "Arboles",
    path: "/Arboles",
    component: Arboles,
  },
  {
    name: "Algoritmos",
    path: "/Algoritmos",  
    component: () => import("./components/AlgoritmosComponente.vue"),
  },
  {
    name: "Compet",
    path: "/Compet",
    component: () => import("./components/CompetComponente.vue"),
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).use(VNetworkGraph).mount("#app");
