<template>
  <!--@mousedown="handleClick"-->
  <div>
    <div>
      <button class="burger-button" @click="toggleSidebar">
        <img
          src="../assets/hamburger-menu-svgrepo-com.svg"
          width="33"
          height="33"
        />
      </button>
      <!--
        FUNCIONALIDAD DE MOSTRAR EL MENU CON DESPUÉS DE DOBLECLICK
        <div class="menu" v-if="menuVisible" :style="menuStyles" @dblclick.stop>
        <label>Nodos:</label>
        <div class="buttons">
          <button class="btn-control-panel" @click="addSkyBlueNode">
            Agregar Nodo Celeste
          </button>
          <button class="btn-control-panel" @click="addHotPinkNode">
            Agregar Nodo Rosado
          </button>
          <button class="btn-control-panel" @click="addGrayNode">
            Agregar Nodo Gris
          </button>
          <button class="btn-control-panel" @click="addBlackNode">
            Agregar Nodo Negro
          </button>
          <button
            class="btn-control-panel"
            :disabled="selectedNodes.length == 0"
            @click="removeNode"
          >
            Eliminar
          </button>
        </div>
      </div>
      -->

      <div class="sidebar" :class="{ 'show-sidebar': showSidebar }">
        <!--      <h3>Menú</h3>
-->
        <div></div>
        <label>Volver: </label>
        <div class="buttons">
          <button class="btn-control-panel" @click="backToHomePage">
            A La Página Principal
          </button>
        </div>
        <label>Nodos:</label>
        <div class="buttons">
          <button class="btn-control-panel" @click="addSkyBlueNode">
            Agregar Nodo Celeste
          </button>
          <button class="btn-control-panel" @click="addHotPinkNode">
            Agregar Nodo Rosado
          </button>
          <button class="btn-control-panel" @click="addGrayNode">
            Agregar Nodo Gris
          </button>
          <button class="btn-control-panel" @click="addBlackNode">
            Agregar Nodo Negro
          </button>
          <button
            class="btn-control-panel"
            :disabled="selectedNodes.length == 0"
            @click="removeNode"
          >
            Eliminar
          </button>
        </div>
        <label>Vértices:</label>
        <div class="buttons">
          <button
            class="btn-control-panel"
            :disabled="!isEdgeAddable()"
            @click="addSkyBlueEdge"
          >
            Conexión Celeste
          </button>
          <button
            class="btn-control-panel"
            :disabled="!isEdgeAddable()"
            @click="addHotPinkEdge"
          >
            Conexión Rosado
          </button>
          <button
            class="btn-control-panel"
            :disabled="!isEdgeAddable()"
            @click="addGrayEdge"
          >
            Conexión Gris
          </button>
          <button
            class="btn-control-panel"
            :disabled="!isEdgeAddable()"
            @click="addBlackEdge"
          >
            Conexión Negro
          </button>
          <button
            class="btn-control-panel"
            :disabled="selectedEdges.length == 0"
            @click="removeEdge"
          >
            Eliminar Vértice
          </button>
        </div>
        <label>Extras:</label>
        <div class="buttons">
          <button @click="showMatrixModal" class="btn-control-panel">
            Ver Matriz de Adyacencia
          </button>
        </div>
      </div>
    </div>
    <!--@dblclick="addNodeOnDoubleClick"  ES DENTRO DE V-NETWORK-->
    <v-network-graph
      v-model:selected-nodes="selectedNodes"
      v-model:selected-edges="selectedEdges"
      :nodes="nodes"
      :edges="edges"
      :layouts="data.layouts"
      :configs="configs"
    >
      <template #edge-label="{ edge, ...slotProps }">
        <v-edge-label
          :text="nameofEdge(edge)"
          align="center"
          vertical-align="above"
          v-bind="slotProps"
        />
      </template>
    </v-network-graph>

    <div class="modal" v-if="isMatrixModalVisible">
      <div class="modal-content">
        <span class="close" @click="hideMatrixModal">&times;</span>
        <h3>Matriz de Adyacencia:</h3>
        <table class="adjacency-matrix">
          <tr v-for="(row, rowIndex) in adjacencyMatrix" :key="rowIndex">
            <td v-for="(value, colIndex) in row" :key="colIndex">
              <template v-if="rowIndex === 0 || colIndex === 0">
                <th>{{ value }}</th>
              </template>
              <template v-else>
                {{ value }}
              </template>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import data from "../assets/data.js";
import "v-network-graph/lib/style.css";
import * as vNG from "v-network-graph";

/**SCRIPTS MENU EMERGENTE*/

/**const menuVisible = ref(false);
const menuStyles = ref({
  display: "none",
  position: "absolute",
  top: "0",
  left: "0",
});
function handleClick(event) {
  if (!event.target.classList.contains("v-network-graph")) {
    toggleMenu(event.clientX, event.clientY);
  }
}

function toggleMenu(clickX, clickY) {
  menuVisible.value = !menuVisible.value;
  menuStyles.value = {
    display: menuVisible.value ? "block" : "none",
    position: "absolute",
    top: `${clickY}px`,
    left: `${clickX}px`,
  };
} */

/**FIN SCRIPTS MENU EMERGENTE */

const nodes = reactive({ ...data.nodes });
const edges = reactive({ ...data.edges });

var adjacencyMatrix = createAdjacencyMatrix(nodes, edges);
const isMatrixModalVisible = ref(false);
const showSidebar = ref(false);

const configs = reactive(
  vNG.defineConfigs({
    view: {
      scalingObjects: true,
      minZoomLevel: 2,
      zoomEnabled: false,
    },
    node: {
      normal: {
        type: "circle",
        radius: (node) => node.size,
        color: (node) => node.color,
      },
      hover: {
        radius: (node) => node.size + 2,
        color: (node) => node.color,
      },
      selectable: true,
      label: {
        visible: (node) => !!node.label,
      },
      focusring: {
        color: "cyan",
      },
    },
    edge: {
      normal: {
        width: (edge) => edge.width,
        color: (edge) => edge.color,
        dasharray: (edge) => (edge.dashed ? "4" : "0"),
      },
      // estilo de la flecha de conexion
      marker: {
        source: {
          type: "none",
          width: 4,
          height: 4,
          margin: -1,
          offset: 0,
          units: "strokeWidth",
          color: null,
        },
        target: {
          type: "arrow",
          width: 4,
          height: 4,
          margin: -1,
          offset: 0,
          units: "strokeWidth",
          color: null,
        },
      },
    },
  })
);

const nextNodeIndex = ref(Object.keys(data.nodes).length + 1);
const nextEdgeIndex = ref(Object.keys(data.edges).length + 1);
const selectedNodes = ref([]);
const selectedEdges = ref([]);
const router = useRouter();

function showMatrixModal() {
  isMatrixModalVisible.value = true;
}

function hideMatrixModal() {
  isMatrixModalVisible.value = false;
}

function toggleSidebar() {
  showSidebar.value = !showSidebar.value;
  console.log(showSidebar.value);
}

const backToHomePage = () => {
  if (router) {
    router.push("/");
  }
};

function addSkyBlueNode() {
  addNode({ size: 24, color: "lightskyblue", label: true });
}

function addHotPinkNode() {
  addNode({ size: 32, color: "hotpink", label: true });
}

function addGrayNode() {
  addNode({ size: 16, color: "gray", label: false });
}

function addBlackNode() {
  addNode({ size: 48, color: "black", label: false });
}

function addNode(node, x, y) {
  const nodeId = `node${nextNodeIndex.value}`;
  const name = `Node ${nextNodeIndex.value}`;
  nodes[nodeId] = { name, ...node };
  nextNodeIndex.value++;

  if (typeof x !== "undefined" && typeof y !== "undefined") {
    data.layouts.nodes[nodeId] = { x, y };
  }

  adjacencyMatrix = createAdjacencyMatrix(nodes, edges);
}

function removeNode() {
  for (const nodeId of selectedNodes.value) {
    delete nodes[nodeId];
  }

  adjacencyMatrix = createAdjacencyMatrix(nodes, edges);
}

function addSkyBlueEdge() {
  addEdge({ width: 3, color: "skyblue" });
}

function addHotPinkEdge() {
  addEdge({ width: 3, color: "hotpink" });
}

function addGrayEdge() {
  addEdge({ width: 5, color: "gray", dashed: true });
}

function addBlackEdge() {
  addEdge({ width: 1, color: "black" });
}

function addEdge(edge) {
  if (selectedNodes.value.length !== 2) return;
  const [source, target] = selectedNodes.value;
  const edgeId = `edge${nextEdgeIndex.value++}`;
  edges[edgeId] = { source, target, ...edge };
  console.log(edges);

  adjacencyMatrix = createAdjacencyMatrix(nodes, edges);
}

function removeEdge() {
  for (const edgeId of selectedEdges.value) {
    delete edges[edgeId];
  }

  adjacencyMatrix = createAdjacencyMatrix(nodes, edges);
}

function isEdgeAddable() {
  return selectedNodes.value.length == 2;
}

function createAdjacencyMatrix(nodes, edges) {
  const nodeKeys = Object.keys(nodes);
  const matrix = Array.from({ length: nodeKeys.length + 1 }, () =>
    Array.from({ length: nodeKeys.length + 1 }, () => 0)
  );

  for (let i = 1; i <= nodeKeys.length; i++) {
    matrix[0][i] = nodes[nodeKeys[i - 1]].name;
    matrix[i][0] = nodes[nodeKeys[i - 1]].name;
  }

  matrix[0][0] = " ";

  for (const edgeKey in edges) {
    const edge = edges[edgeKey];
    const sourceIndex = nodeKeys.indexOf(edge.source) + 1;
    const targetIndex = nodeKeys.indexOf(edge.target) + 1;

    if (sourceIndex !== 0 && targetIndex !== 0) {
      matrix[sourceIndex][targetIndex] = edge.cost || 1;
    }
  }

  return matrix;
}

/**function addNodeOnDoubleClick(event) {
  const newNode = {
    size: 24,
    color: "lightskyblue",
    label: true,
    x: event.offsetX, // X-coordinates based on the click position
    y: event.offsetY, // Y-coordinates based on the click position
  };
  console.log(event.clientX, event.clientY);
  // get the x and y position of the first node

  addNode(newNode, event.clientX, event.clientY);
} */

/* function createAdjacencyMatrix(nodesJSON, edgesJSON) {
   const nodes = nodesJSON;
   const edges = edgesJSON;
   
   const nodeKeys = Object.keys(nodes);
   const nodeIndexMap = {};
   
   console.log(nodeKeys);

   nodeKeys.forEach((key, index) => {
       nodeIndexMap[key] = index;
   });

   console.log(nodeIndexMap)
   
   const matrix = Array.from({ length: nodeKeys.length }, () =>
       Array.from({ length: nodeKeys.length }, () => 0)
   );

   console.log(matrix);
   
   Object.values(edges).forEach((edge) => {
       const sourceIndex = nodeIndexMap[edge.source];
       const targetIndex = nodeIndexMap[edge.target];
       
       matrix[sourceIndex][targetIndex] = 1; // You can also set edge properties if needed
   });
   
   return matrix;
}*/

function nameofEdge(edge) {
  const label = edge.label !== null ? edge.label : "";
  const cost = edge.cost !== null ? edge.cost : "";
  const aux =
    label || cost ? `${label}${label && cost ? ": " : ""}${cost}` : " ";
  return aux;
}
</script>

<style scoped>
body {
  margin: 0;
  height: 100%;
  overflow-x: hidden;
  padding: 0% !important;
}

#controlPanel {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 15vh;
  min-width: 100vw;
  padding: 1%;
}

#controlPanel .nodos {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin: 2% 0;
}

#controlPanel .vertices {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}

#controlPanel .btn-control-panel {
  height: 15%;
  min-width: 25%;
}

.v-network-graph {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 98vh;
  
}

.demo-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.demo-control-panel {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}



.control-group {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.label {
  font-weight: bold;
  margin-right: 10px;
}

.control-button {
  margin-right: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
}

.control-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

#controlPanel .nodos .btn-control-panel,
#controlPanel .vertices .btn-control-panel {
  font-size: 1rem;
  background: #fff;
  color: #4a5568;
  border: 0px solid #a0aec0;
  transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease,
    transform 0.2s ease;
  box-shadow: 0 0 0 #bee3f8;
  transform: translateY(0);
}

#controlPanel .nodos .btn-control-panel:first-of-type,
#controlPanel .vertices .btn-control-panel:first-of-type {
  border-radius: 0.5em 0 0 0.5em;
  margin: 0% 0% 0% 5%;
}

#controlPanel .vertices .btn-control-panel:last-of-type,
#controlPanel .nodos .btn-control-panel:last-of-type {
  border-radius: 0 0.5em 0.5em 0;
  margin: 0% 5% 0% 0%;
}

#controlPanel:hover .btn-control-panel {
  color: #a0aec0;
}

#controlPanel:hover .btn-control-panel:hover {
  background: #d53f8c;
  color: #fff;
  box-shadow: 0 0 0.8em 0 rgba(213, 63, 140, 0.8);
  transform: translateY(-0.2em);
}

.btn-control-panel {
  width: 100%;
  height: 100%;
  margin: 2%;
  padding: 3%;
  border-radius: 25px;
  transition: ease-in 0.5s;
  background-color: #ffdfd0;
  color: #000;
}

.btn-control-panel:hover {
  scale: 1.2;
  transition: ease-in-out 0.5s;
  margin: 5% 0;
  background-color: #c63637;
  color: #fffff2;
}

.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
  display: flex;
}

.modal-content {
  background-color: #fff;
  padding: 2.5%;
  border: 1px solid #888;
  width: 80%;
  position: relative;
  text-align: center;
}

.close {
  color: #888;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover {
  color: #000;
}

.adjacency-matrix {
  border-collapse: collapse;
  width: 100%;
}

.adjacency-matrix td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}

.adjacency-matrix th {
  font-weight: bold;
}

.adjacency-matrix td {
  background-color: #fff;
}

.sidebar {
  width: 25%;
  position: fixed;
  top: 0;
  left: -100%;
  height: calc(100vh - 20px);
  background-color: rgba(255, 255, 255, 0.5);
  overflow-x: hidden;
  transition: left 0.5s;
  padding: 3% 6%;
  z-index: 1;
  backdrop-filter: blur(5px);
  border: 1px solid #ccc;
  transition: ease-in-out 0.5s;
}

.show-sidebar {
  left: 0;
}

.sidebar a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: white;
  display: block;
  transition: 0.3s;
}

.sidebar a:hover {
  color: #3498db;
}

.burger-button {
  position: fixed;
  top: 20px;
  left: 20px;
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 24px;
  z-index: 2;
  transition: 0.3s;
}

.burger-button:hover {
  transform: scale(1.2);
}

.buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2% 0;
}
@media screen and (max-width: 440px) {
  .sidebar {
    width: 60%;
    padding: 20% 7%;
  }
  .modal-content {
    padding: 2.5% 0;
    width: 100%;
    position: relative;
    text-align: center;
    overflow-x: auto;
  }

  .close {
    color: #888;
    float: right;
    font-size: 1.7rem;
    font-weight: bold;
    cursor: pointer;
  }

  .adjacency-matrix {
    border-collapse: collapse;
    width: 100%;
    transform: scale(0.8);
  }
}

/**Estilos del menú emergente */
.menu {
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 150px;
  background-color: white;
  border: 1px solid gray;
}
/**fin estilos menúe emergente */
</style>
