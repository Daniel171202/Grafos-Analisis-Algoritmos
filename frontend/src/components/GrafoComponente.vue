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
          <button
            class="btn-control-panel"
            :disabled="selectedNodes.length == 0"
            @click="removeNode"
          >
            Eliminar Nodo
          </button>
        </div>
        <label>Vértices:</label>
        <div class="buttons">
          <button
            class="btn-control-panel"
            :disabled="!isEdgeAddable()"
            @click="addBlackEdge"
          >
            Conexión Negro
          </button>
          <button class="btn-control-panel" @click="addLoopEdge">
            Conexión Loop
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
          <button
            @click="getGrafosAndShowSelectionModal"
            class="btn-control-panel"
          >
            Seleccionar Grafo
          </button>

          <button @click="showSaveModal" class="btn-control-panel">
            Guardar Grafo
          </button>

          <button @click="showUpdateModal" class="btn-control-panel">
            Actualizar Grafo
          </button>
          <button @click="johnson2" class="btn-control-panel">
            Actualizar Grafo
          </button>
          <button @click="usoAsignacion" class="btn-control-panel">
            Solucionar Algoritmo de Asignación
          </button>
          <button @click="usoAsignacionMax" class="btn-control-panel">
            Solucionar Algoritmo de Asignación Maximizacion
          </button>
          <button @click="showMatrixNorthWestModal" class="btn-control-panel">
            Método North West
          </button>
          <button @click="handleClick" class="btn-control-panel">
            Calcular Dijkstra
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
      :paths="paths"
      :configs="configs"
      @dblclick="addNodeOnDoubleClick"
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

    <div class="modal2" v-if="isNodoModalVisible">
      <div class="modal-content">
        <span class="close" @click="hideNodoModal">&times;</span>
        <h3>Nombre Nodo:</h3>
        <label>Nombre:</label>
        <!--obtener el nombre del ultimo nodo y cambiarlo mediante el vmodel -->
        <input type="text" v-model="nodes[actualNodeIndex].name" />
        <button class="btn-control-panel" @click="hideNodoModal">
          Aceptar
        </button>
      </div>
    </div>

    <div class="modal3" v-if="isEdgeModalVisible">
      <div class="modal-content">
        <span class="close" @click="hideEdgeModal">&times;</span>
        <h3>Nombre Conexión:</h3>
        <label>Nombre:</label>
        <!--obtener el nombre del ultimo nodo y cambiarlo mediante el vmodel -->
        <!--<input type="text" v-model="edges[actualEdgeIndex].label" />
        -->
        <br />
        <label>Peso: </label>
        <input type="number" v-model="edges[actualEdgeIndex].cost" />
        <button class="btn-control-panel" @click="hideEdgeModal">
          Aceptar
        </button>
      </div>
    </div>

    <div class="modal4" v-if="isSelectionVisible">
      <div class="modal-content">
        <span class="close" @click="getGrafoAndHideSelectionModal"
          >&times;</span
        >
        <h3>Elegir Grafo</h3>
        <!--obtener el nombre del ultimo nodo y cambiarlo mediante el vmodel -->
        <select v-model="selectedGraph">
          <option value="" disabled selected>Selecciona un grafo</option>
          <option
            v-for="graph in graphOptions"
            :key="graph.idGrafo"
            :value="graph.idGrafo"
          >
            {{ graph.nombre }}
          </option>
          <!-- Agrega más opciones según sea necesario -->
        </select>
        <br />
        <button
          class="btn-control-panel"
          @click="getGrafoAndHideSelectionModal(selectedGraph)"
        >
          Aceptar
        </button>
      </div>
    </div>

    <div class="modal5" v-if="isSaveVisible">
      <div class="modal-content">
        <span class="close" @click="saveAndHideSaveModal">&times;</span>
        <h3>Guardar Grafo</h3>
        <!--obtener el nombre del ultimo nodo y cambiarlo mediante el vmodel -->
        <label>Nombre grafo:</label>
        <!--obtener el nombre del ultimo nodo y cambiarlo mediante el vmodel -->
        <input type="text" id="nombre_grafo" />
        <br />
        <button class="btn-control-panel" @click="saveAndHideSaveModal">
          Guardar Grafo
        </button>
      </div>
    </div>
  </div>

  <div class="modal6" v-if="isUpdateVisible">
    <div class="modal-content">
      <span class="close" @click="isUpdateVisible = false">&times;</span>
      <h3>Elegir Grafo</h3>
      <!--obtener el nombre del ultimo nodo y cambiarlo mediante el vmodel -->
      <select v-model="selectedGraph">
        <option value="" disabled selected>Selecciona un grafo</option>
        <option
          v-for="graph in graphOptions"
          :key="graph.idGrafo"
          :value="graph.idGrafo"
        >
          {{ graph.nombre }}
        </option>
        <!-- Agrega más opciones según sea necesario -->
      </select>
      <br />
      <button
        class="btn-control-panel"
        @click="updateGrafoAndHideSelectionModal(selectedGraph)"
      >
        Aceptar
      </button>
    </div>
  </div>

  <div class="modal7" v-if="isResultadoAsignacionVisible">
    <div class="modal-content">
      <span class="close" @click="hideResultadoAsignacion()">&times;</span>
      <h4
        style="font-size: 1.5rem"
        v-for="linea in respuestaAsignacion"
        :key="linea"
      >
        {{ linea }}
      </h4>
    </div>
  </div>

  <div class="modal9" v-if="isResultadoNorthWestVisible">
    <div class="modal-content">
      <span class="close" @click="hideResultadoNorthWest()">&times;</span>
      <h4 v-for="(linea, index) in respuestaNorthWestSolve" :key="index">
        {{ linea }}
      </h4>
    </div>
  </div>

  <div class="modal8" v-if="isMatrixNorthWestModalVisible">
    <div class="modal-content">
      <span class="close" @click="hideMatrixNorthWestModal">&times;</span>
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
          <!-- Mostrar oferta sólo si la suma de la fila no es 0 -->
          <td v-if="rowIndex > 0 && row[row.length - 1] !== 0">
            <input
              type="number"
              v-model="supplies[rowIndex - 1]"
              placeholder="Oferta"
            />
          </td>
        </tr>
        <tr>
          <!-- Mostrar demanda sólo si la suma de la columna no es 0 y no es la última columna -->
          <td v-for="(value, colIndex) in adjacencyMatrix[0]" :key="colIndex">
            <input
              v-if="
                colIndex > 0 &&
                colIndex < adjacencyMatrix[0].length - 1 &&
                getColumnSum(colIndex) !== 0
              "
              type="number"
              v-model="demands[colIndex - 1]"
              placeholder="Demanda"
              style="width: 5vw"
            />
          </td>
        </tr>
      </table>
    </div>
    <button @click="northWestMethod">Resolver MIN</button>
    <button @click="northWestMethodMax">Resolver MAX</button>
  </div>

  <div class="modal10" v-if="isMatrixModalVisibleNorthWest">
    <div class="modal-content">
      <span class="close" @click="hideMatrixModalNorthWest">&times;</span>
      <h3>Matriz de Adyacencia:</h3>
      <table class="adjacency-matrix">
        <tr v-for="(row, rowIndex) in resultMatrix" :key="rowIndex">
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
      <div>
        <br />
        <h3>Decisiones:</h3>
        <ul>
          <li v-for="decision in respuestaNorthWestSolve" :key="decision">
            {{ decision }}
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div ref="errorModal" class="modal-error">
    <div class="modal-content-error">
      <span @click="closeErrorModal" class="close-btn-error">&times;</span>
      <p style="font-size: 2rem">
        No se puede conectar un nodo reciente con uno más antiguo. No está
        permitida la reversa.
      </p>
    </div>
  </div>
</template>

<style scoped>
.modal-error {
  display: none;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
}

.modal-content-error {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 10vh;
  width: auto;
  padding: 5% 7%;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.close-btn-error {
  color: #aaa;
  float: right;
  font-size: 3rem;
  font-weight: bold;
  cursor: pointer;
}
.close-btn-error:hover {
  color: red;
}
</style>

<script setup>
import { reactive, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import data from "../assets/data.js";
import "v-network-graph/lib/style.css";
import * as vNG from "v-network-graph";
import axios from "axios";
import { Munkres } from "munkres-js";

let nodes = reactive({ ...data.nodes });
let edges = reactive({ ...data.edges });
let paths = reactive({ ...data.paths });

var adjacencyMatrix = createAdjacencyMatrix(nodes, edges);
const isMatrixModalVisible = ref(false);
const isMatrixModalVisibleNorthWest = ref(false);
const isMatrixNorthWestModalVisible = ref(false);
const isNodoModalVisible = ref(false);
const isEdgeModalVisible = ref(false);
const isSelectionVisible = ref(false);
const isSaveVisible = ref(false);
const isUpdateVisible = ref(false);
const isResultadoAsignacionVisible = ref(false);
const isResultadoNorthWestVisible = ref(false);
const respuestaNorthWest = ref([]);
const resultMatrix = ref([]);
const errorModal = ref(null);

/**problem grafos */
const solucion = ref([]);
const costoTotal = ref(0);

let creatingEdge = false;
let startNode = null;

/**PARA NORTHWEST */
let suppliesReactive = reactive(new Array(adjacencyMatrix.length - 2).fill(0)); // Excluimos fila de encabezado y de sumas
let demandsReactive = reactive(
  new Array(adjacencyMatrix[0].length - 2).fill(0)
); // Excluimos columna de encabezado y de sumas

// Desestructurando las propiedades reactivas
const { supplies, demands } = toRefs({
  supplies: suppliesReactive,
  demands: demandsReactive,
});

let graphOptions = [];

let respuestaAsignacion = "";

const showSidebar = ref(false);

const configs = reactive(
  vNG.defineConfigs({
    view: {
      scalingObjects: true,
      minZoomLevel: 1,
      zoomEnabled: true,
      doubleClickZoomEnabled: false,
      mouseWheelZoomEnabled: true,
      panEnabled: true,
      autoPanAndZoomOnLoad: "fit-content",
      maxZoomLevel: 2,
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
      selectable: true,
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
    path: {
      visible: true,
      normal: {
        width: 10,
        color: (p) => p.color,
      },
    },
  })
);
const actualNodeIndex = ref(0);
const actualEdgeIndex = ref(0);
const nextNodeIndex = ref(Object.keys(data.nodes).length + 1);
const nextEdgeIndex = ref(Object.keys(data.edges).length + 1);
const selectedNodes = ref([]);
const selectedEdges = ref([]);
const router = useRouter();

function showMatrixModal() {
  adjacencyMatrix = createAdjacencyMatrix(nodes, edges);
  isMatrixModalVisible.value = true;
}

function showMatrixModalNorthWest() {
  isMatrixModalVisibleNorthWest.value = true;
}

function showMatrixNorthWestModal() {
  adjacencyMatrix = createAdjacencyMatrix(nodes, edges);
  isMatrixNorthWestModalVisible.value = true;
}

function hideMatrixModal() {
  isMatrixModalVisible.value = false;
}

function hideMatrixNorthWestModal() {
  isMatrixNorthWestModalVisible.value = false;
}

function hideMatrixModalNorthWest() {
  isMatrixModalVisibleNorthWest.value = false;
}

function showNodoModal() {
  isNodoModalVisible.value = true;
}

function hideNodoModal() {
  isNodoModalVisible.value = false;
}

function showEdgeModal() {
  isEdgeModalVisible.value = true;
}

function hideEdgeModal() {
  isEdgeModalVisible.value = false;
}

async function getGrafosAndShowSelectionModal() {
  //TODO: Agregar el id del usuario que está logueado

  graphOptions = await axios
    .get("http://ins.lpz.ucb.edu.bo:8084/grafos/1")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  console.log(graphOptions);
  isSelectionVisible.value = true;
}

function getGrafoAndHideSelectionModal(selectedGraph) {
  //TODO: Se requiere un endpount para reotornar un solo grafo
  axios
    .get("http://ins.lpz.ucb.edu.bo:8084/grafos/1")
    .then((response) => {
      console.log(response);
      let grafos = response.data;
      let grafoSeleccionado = grafos.find(
        (grafo) => grafo.idGrafo == selectedGraph
      );

      if (grafoSeleccionado) {
        nodes = grafoSeleccionado.nodes;
        edges = grafoSeleccionado.edges;
        data.layouts = grafoSeleccionado.layouts;
        console.log(nodes);
        console.log(edges);
        console.log(data.layouts);
        adjacencyMatrix = createAdjacencyMatrix(nodes, edges);
        console.log(adjacencyMatrix);
        toggleSidebar();
      } else {
        console.log("No se encontró el grafo");
      }
    })
    .catch((error) => {
      console.log(error);
    });
  isSelectionVisible.value = false;
}

async function getGrafosAndShowUpdateModal() {
  //TODO: Agregar el id del usuario que está logueado
  graphOptions = await axios
    .get("http://ins.lpz.ucb.edu.bo:8084/grafos/1")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  console.log(graphOptions);
  isUpdateVisible.value = true;
}
function updateGrafoAndHideSelectionModal(selectedGraph) {
  console.log(nodes);
  console.log(edges);
  console.log(data.layouts);
  console.log(selectedGraph);
  // locate the name of the graph that coincides with the id of the selected graph
  var nameSelectedGraph = "";
  graphOptions.forEach((graph) => {
    if (graph.idGrafo == selectedGraph) {
      nameSelectedGraph = graph.nombre;
    }
  });
  let grafo = {
    nombre: nameSelectedGraph,
    nodes: nodes,
    edges: edges,
    layouts: data.layouts,
    //TODO: Agregar el id del usuario que está logueado
    Usuarios_idUsuario: 1,
  };
  console.log(grafo);

  axios
    .put("http://ins.lpz.ucb.edu.bo:8084/grafos/" + selectedGraph, grafo)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });

  isUpdateVisible.value = false;
}

function showSaveModal() {
  isSaveVisible.value = true;
}

function showUpdateModal() {
  isUpdateVisible.value = true;
}

function saveAndHideSaveModal() {
  console.log(nodes);
  console.log(edges);
  console.log(data.layouts);
  let grafo = {
    nombre: document.getElementById("nombre_grafo").value,
    nodes: nodes,
    edges: edges,
    layouts: data.layouts,
    //TODO: Agregar el id del usuario que está logueado
    Usuarios_idUsuario: 1,
  };

  axios
    .post("http://ins.lpz.ucb.edu.bo:8084/grafos", grafo)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });

  isSaveVisible.value = false;
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
  addNode({ size: 16, color: "lightskyblue", label: true });
}

function addHotPinkNode() {
  addNode({ size: 16, color: "hotpink", label: true });
}

function addGrayNode() {
  addNode({ size: 16, color: "gray", label: false });
}

function addBlackNode() {
  addNode({ size: 16, color: "black", label: false });
}

function addNode(node, x, y) {
  const nodeId = `node${nextNodeIndex.value}`;
  const name = `Node ${nextNodeIndex.value}`;
  nodes[nodeId] = { name, ...node };
  actualNodeIndex.value = nodeId;
  nextNodeIndex.value++;

  if (typeof x !== "undefined" && typeof y !== "undefined") {
    data.layouts.nodes[nodeId] = { x, y };
  }

  adjacencyMatrix = createAdjacencyMatrix(nodes, edges);
  showNodoModal();
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

/**función loop */
function addLoopEdge() {
  if (selectedNodes.value.length === 1) {
    const nodeId = selectedNodes.value[0];
    console.error("Seleccionado solo un nodo, acá bien.");
    addEdge({ source: nodeId, target: nodeId, width: 1, color: "black" });
  } else {
    // Muestra un mensaje de error o realiza alguna otra acción si no se cumple la condición.
    console.error("Para agregar un bucle, selecciona exactamente un nodo.");
  }
}
/**función loop */
const showErrorModal = () => {
  errorModal.value.style.display = "block";
};

const closeErrorModal = () => {
  errorModal.value.style.display = "none";
};
function addEdge(edge) {
  if (selectedNodes.value.length !== 2 && selectedNodes.value.length !== 1) {
    console.error(
      "Selecciona exactamente dos nodos o un nodo para agregar un bucle."
    );
    return;
  }

  const [source, target] = selectedNodes.value;

  // Comprueba si el nodo source es más reciente que el nodo target
  if (source > target) {
    showErrorModal();
    return;
  }

  const edgeId = `edge${nextEdgeIndex.value++}`;
  edges[edgeId] = { source, target, ...edge };
  actualEdgeIndex.value = edgeId;
  console.log(edges);
  showEdgeModal();
  adjacencyMatrix = createAdjacencyMatrix(nodes, edges);
}

function addNodeOnDoubleClick(event) {
  const clickX = event.clientX;
  const clickY = event.clientY;

  const graphElement = document.querySelector(".v-network-graph");
  const rect = graphElement.getBoundingClientRect();
  const localX = clickX * 0.92473 - 430;
  const localY = clickY * 0.96124 - 620;
  // get the x and y position of the first node

  addNode(
    { name: "New node", size: 16, color: "lightskyblue" },
    localX,
    localY
  );
}

function removeEdge() {
  for (const edgeId of selectedEdges.value) {
    console.log(edgeId);
    delete edges[edgeId];
  }

  adjacencyMatrix = createAdjacencyMatrix(nodes, edges);
}

function isEdgeAddable() {
  return selectedNodes.value.length == 2;
}

function createAdjacencyMatrix(nodes, edges) {
  const nodeKeys = Object.keys(nodes);
  const matrixSize = nodeKeys.length + 2; // Tamaño de la matriz
  const matrix = Array.from({ length: matrixSize }, () =>
    Array.from({ length: matrixSize }, () => 0)
  );

  // Rellenar encabezados de fila y columna con nombres de nodos
  for (let i = 1; i <= nodeKeys.length; i++) {
    const nodeName = nodes[nodeKeys[i - 1]].name;
    matrix[0][i] = nodeName;
    matrix[i][0] = nodeName;
  }

  matrix[0][0] = " ";
  matrix[matrixSize - 1][0] = "Suma (columna)";
  matrix[0][matrixSize - 1] = "Suma (fila)";

  // Llenar la matriz con valores de aristas
  for (const edgeKey in edges) {
    const edge = edges[edgeKey];
    const sourceIndex = nodeKeys.indexOf(edge.source) + 1;
    const targetIndex = nodeKeys.indexOf(edge.target) + 1;

    // Verificar si sourceIndex y targetIndex son válidos
    if (
      sourceIndex >= 1 &&
      targetIndex >= 1 &&
      sourceIndex < matrixSize &&
      targetIndex < matrixSize
    ) {
      matrix[sourceIndex][targetIndex] = edge.cost || 1;
    }
  }

  // Calcular las sumas por filas y columnas
  for (let i = 1; i <= nodeKeys.length; i++) {
    let rowSum = 0;
    let colSum = 0;

    for (let j = 1; j <= nodeKeys.length; j++) {
      rowSum += matrix[i][j];
      colSum += matrix[j][i];
    }

    matrix[i][matrixSize - 1] = rowSum;
    matrix[matrixSize - 1][i] = colSum;
  }

  return matrix;
}

function nameofEdge(edge) {
  const label = edge.label !== null ? edge.label : "";
  const cost = edge.cost !== null ? edge.cost : "";
  const aux = label || cost ? `${label && cost ? " " : ""}${cost}` : " ";
  return aux;
}

/**FUNCIÓN DE APLICACIÓN DE DJIKSTRA */
function getNodeNames(matrix) {
  return matrix[0].slice(1, -1);
}

function getWeightMatrix(matrix) {
  return matrix.slice(1, -1).map((row) => row.slice(1, -1));
}

function extractGraphData(nodes, edges) {
  const matrix = createAdjacencyMatrix(nodes, edges);
  const nodeNames = getNodeNames(matrix);
  const weightMatrix = getWeightMatrix(matrix);
  console.log("Nombres de nodos:", nodeNames);
  console.log("Matriz de adyacencia (solo pesos):", weightMatrix);
  // Puedes devolver los valores si necesitas hacer algo con ellos después del log
  return { nodeNames, weightMatrix };
}

// Función de Dijkstra para encontrar el camino más corto desde un nodo inicial
function dijkstra(weightMatrix, startNode) {
  const distances = Array(weightMatrix.length).fill(Infinity);
  const visited = Array(weightMatrix.length).fill(false);
  const predecessors = Array(weightMatrix.length).fill(null);

  // La distancia del nodo inicial a sí mismo es siempre 0
  distances[startNode] = 0;

  // Encuentra el nodo con la menor distancia desde el conjunto de nodos no visitados
  const findMinDistanceNode = (distances, visited) => {
    let minDistance = Infinity;
    let minIndex = -1;

    for (let i = 0; i < distances.length; i++) {
      if (!visited[i] && distances[i] < minDistance) {
        minDistance = distances[i];
        minIndex = i;
      }
    }

    return minIndex;
  };

  for (let i = 0; i < distances.length; i++) {
    const minIndex = findMinDistanceNode(distances, visited);
    visited[minIndex] = true;

    for (let j = 0; j < weightMatrix.length; j++) {
      if (weightMatrix[minIndex][j] && !visited[j]) {
        const currentDistance = distances[minIndex] + weightMatrix[minIndex][j];
        if (currentDistance < distances[j]) {
          distances[j] = currentDistance;
          predecessors[j] = minIndex;
        }
      }
    }
  }

  return { distances, predecessors };
}

// Esta función reconstruye el camino más corto desde el nodo inicial hasta el nodo destino.
function reconstructPath(predecessors, startNode, endNode) {
  let path = [];
  let currentNode = endNode;

  while (currentNode !== startNode) {
    path.unshift(currentNode);
    currentNode = predecessors[currentNode];
    if (currentNode === null) {
      return [];
    }
  }

  path.unshift(startNode);
  return path;
}

function applyDijkstra(nodes, weightMatrix) {
  console.log("Nodos:", nodes);
  console.log("Matriz de pesos:", weightMatrix);

  const startNode = 0;
  console.log("Nodo de inicio:", startNode);

  const results = dijkstra(weightMatrix, startNode);
  console.log("Resultados de Dijkstra:", results);

  for (let endNode = 0; endNode < nodes.length; endNode++) {
    console.log(`Nodo final actual: ${endNode} (${nodes[endNode]})`);

    if (startNode !== endNode) {
      console.log(
        `Procesando ruta del nodo de inicio ${startNode} al nodo final ${endNode}`
      );

      const pathIndices = reconstructPath(
        results.predecessors,
        startNode,
        endNode
      );
      console.log(`Índices de ruta para el nodo ${endNode}:`, pathIndices);

      if (pathIndices.length > 0) {
        const pathNames = pathIndices.map((index) => nodes[index]);
        console.log(`Nombres de ruta para el nodo ${endNode}:`, pathNames);

        const pathCost = results.distances[endNode];
        console.log(`Costo de la ruta para el nodo ${endNode}:`, pathCost);

        console.log(
          `Ruta más corta de '${nodes[startNode]}' a '${
            nodes[endNode]
          }': ${pathNames.join(" -> ")}, Costo: ${pathCost}`
        );
      } else {
        console.log(
          `No hay ruta disponible de '${nodes[startNode]}' a '${nodes[endNode]}'`
        );
      }
    }
  }
}

function handleClick() {
  console.log("Botón presionado");
  const { nodeNames, weightMatrix } = extractGraphData(nodes, edges);
  applyDijkstra(nodeNames, weightMatrix);
}

/** FIN DE LA FUNCIÓN */

/**Función de Johnson */

function johnson() {
  // Obtiene los datos de la matriz adyacente
  const numNodes = adjacencyMatrix.length - 1; // Ignoramos las filas/columnas de sumas
  let dist = Array.from({ length: numNodes }, () =>
    Array(numNodes).fill(Infinity)
  );
  let prev = Array.from({ length: numNodes }, () => Array(numNodes).fill(-1));

  //Va a llenar la matriz de distancias y previos con sus valores y todos los nodos
  //que no tienen conexión directa se les asigna un valor de infinito
  //solo toma en cuenta aristas con pesos
  //Acá hace la primera vuelta desde el nodo inicial al final
  for (let i = 1; i < numNodes; i++) {
    for (let j = 1; j < numNodes; j++) {
      if (adjacencyMatrix[i][j] !== 0) {
        dist[i - 1][j - 1] = adjacencyMatrix[i][j];
        prev[i - 1][j - 1] = i - 1;
      }
    }
  }

  //al recuperar de la matriz vamos a hacer la segunda vuelta desde el nodo final al inicial
  //para ver si hay un camino más corto

  for (let k = 0; k < numNodes; k++) {
    for (let i = 0; i < numNodes; i++) {
      for (let j = 0; j < numNodes; j++) {
        if (
          dist[i][k] !== Infinity &&
          dist[k][j] !== Infinity &&
          dist[i][j] > dist[i][k] + dist[k][j]
        ) {
          dist[i][j] = dist[i][k] + dist[k][j];
          prev[i][j] = prev[k][j];
        }
      }
    }
  }

  // Obtener la ruta más corta desde el nodo inicial al final
  //Acá estoy sacando los nombres y valores de la ruta más corta, pero lo tengo que va desde 0 hasta el nodo final
  //no saca el nombre del nodo como tal

  let node = numNodes - 1; // Nodo final
  const path = [];
  while (node !== -1) {
    path.unshift(node);
    node = prev[0][node];
  }

  // Imprimir la ruta más corta y la ruta crítica
  console.log("Ruta más corta desde nodo 0 al nodo final:", path);
  console.log("Distancia total:", dist[0][numNodes - 1]);
}

/**fin función de Johnson */

// Algoritmo de asignación

function hungarianAlgorithm(matrix) {
  const numRows = matrix.length;
  const numCols = matrix[0].length;

  // Paso 1: Reducir las filas
  for (let i = 0; i < numRows; i++) {
    const minInRow = Math.min(...matrix[i]);
    for (let j = 0; j < numCols; j++) {
      matrix[i][j] -= minInRow;
    }
  }

  // Paso 2: Reducir las columnas
  for (let j = 0; j < numCols; j++) {
    const minInColumn = Math.min(...matrix.map((row) => row[j]));
    for (let i = 0; i < numRows; i++) {
      matrix[i][j] -= minInColumn;
    }
  }

  const assignedRows = new Array(numRows).fill(false);
  const assignedCols = new Array(numCols).fill(false);

  const assignment = new Array(numCols).fill(-1);

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      if (matrix[row][col] === 0 && !assignedRows[row] && !assignedCols[col]) {
        assignment[col] = row;
        assignedRows[row] = true;
        assignedCols[col] = true;
        break;
      }
    }
  }

  // Paso 3: Buscar ceros sin asignar
  const unassignedRows = assignedRows
    .map((assigned, index) => (!assigned ? index : -1))
    .filter((index) => index !== -1);
  const unassignedCols = assignedCols
    .map((assigned, index) => (!assigned ? index : -1))
    .filter((index) => index !== -1);

  while (unassignedCols.length > 0) {
    let row = -1;
    let col = -1;
    let minVal = Infinity;

    for (let i = 0; i < unassignedRows.length; i++) {
      for (let j = 0; j < unassignedCols.length; j++) {
        const r = unassignedRows[i];
        const c = unassignedCols[j];
        if (matrix[r][c] < minVal) {
          minVal = matrix[r][c];
          row = r;
          col = c;
        }
      }
    }

    assignment[col] = row;
    assignedRows[row] = true;
    assignedCols[col] = true;

    const unassignedRowIdx = unassignedRows.indexOf(row);
    if (unassignedRowIdx !== -1) {
      unassignedRows.splice(unassignedRowIdx, 1);
    }

    const unassignedColIdx = unassignedCols.indexOf(col);
    if (unassignedColIdx !== -1) {
      unassignedCols.splice(unassignedColIdx, 1);
    }
  }

  return assignment;
}

function usoAsignacion() {
  const originalMatrix = adjacencyMatrix;

  // Obtener una matriz 3x3 reducida
  const rowHeaders = originalMatrix.slice(1, 4).map((row) => row[0]);

  // Obtener una matriz 3x3 reducida con encabezados y títulos de fila
  const matrix = [];
  const headers = [" ", ...rowHeaders];

  for (let i = 1; i <= 3; i++) {
    const row = originalMatrix[i].slice(4, 7);
    row.unshift(rowHeaders[i - 1]);
    matrix.push(row);
  }

  matrix.unshift(headers);

  // Aplicar el algoritmo de asignación (máximización)
  let m = new Munkres();
  let indices = m.compute(matrix.slice(1).map((row) => row.slice(1)));

  // Imprimir la asignación en el formato deseado
  let respuesta = [];
  let costoTotal = 0;
  for (let i = 0; i < indices.length; i++) {
    const destination = rowHeaders[indices[i][0]];
    const city = ` ${indices[i][1] + 1}`;
    const cost = matrix[indices[i][0] + 1][indices[i][1] + 1];
    console.log(`Asignar ${destination} a ${city} con un costo de ${cost}`);
    respuesta.push(`Asignar ${destination} a ${city} con un costo de ${cost}`);
    costoTotal += cost;
  }
  respuesta.push(`Costo total: ${costoTotal}`);
  console.log(respuesta);
  respuestaAsignacion = respuesta;
  console.log(respuestaAsignacion);
  isResultadoAsignacionVisible.value = true;
}

function usoAsignacionMax() {
  const originalMatrix = adjacencyMatrix;

  // Obtener una matriz 3x3 reducida
  const rowHeaders = originalMatrix.slice(1, 4).map((row) => row[0]);

  // Obtener una matriz 3x3 reducida con encabezados y títulos de fila
  const matrix = [];
  const headers = [" ", ...rowHeaders];

  for (let i = 1; i <= 3; i++) {
    const row = originalMatrix[i].slice(4, 7);
    row.unshift(rowHeaders[i - 1]);
    matrix.push(row);
  }

  matrix.unshift(headers);

  // Encontrar el valor máximo en la matriz original
  let maxValue = -Infinity;
  for (let i = 1; i < matrix.length; i++) {
    for (let j = 1; j < matrix[i].length; j++) {
      if (matrix[i][j] > maxValue) {
        maxValue = matrix[i][j];
      }
    }
  }

  // Calcular la matriz de costos ajustada para minimización
  const assignmentMatrix = [];
  for (let i = 1; i < matrix.length; i++) {
    const newRow = [];
    for (let j = 1; j < matrix[i].length; j++) {
      newRow.push(maxValue - matrix[i][j]);
    }
    assignmentMatrix.push(newRow);
  }

  // Aplicar el algoritmo de asignación (minimización)
  const m = new Munkres();
  const assignment = m.compute(assignmentMatrix);

  // Imprimir la asignación
  let respuesta = [];
  let costoTotal = 0;
  for (let i = 0; i < assignment.length; i++) {
    const destination = rowHeaders[i];
    const city = ` ${assignment[i][1] + 1}`;
    const cost = maxValue - assignmentMatrix[i][assignment[i][1]];
    console.log(`Asignar ${destination} a ${city} con un costo de ${cost}`);
    respuesta.push(`Asignar ${destination} a ${city} con un costo de ${cost}`);

    costoTotal += cost;
  }
  respuesta.push(`Costo total: ${costoTotal}`);
  console.log(respuesta);
  respuestaAsignacion = respuesta;
  console.log(respuestaAsignacion);
  isResultadoAsignacionVisible.value = true;
}

/**prueba */

function getAdjacencyMatrixWithoutHeaders() {
  const numNodes = adjacencyMatrix.length - 2;
  let numbersAdjacencyMatrix = Array.from({ length: numNodes }, () =>
    Array(numNodes).fill(0)
  );

  for (let i = 1; i <= numNodes; i++) {
    for (let j = 1; j <= numNodes; j++) {
      numbersAdjacencyMatrix[i - 1][j - 1] = adjacencyMatrix[i][j];
    }
  }
  console.log(numbersAdjacencyMatrix);

  return numbersAdjacencyMatrix;
}

function hideResultadoAsignacion() {
  isResultadoAsignacionVisible.value = false;
}

function hideResultadoNorthWest() {
  isResultadoNorthWestVisible.value = false;
}

function johnson2() {
  adjacencyMatrix = createAdjacencyMatrix(nodes, edges);
  let numbersAdjacencyMatrix = getAdjacencyMatrixWithoutHeaders();
  console.log(numbersAdjacencyMatrix);
  const numNodes = adjacencyMatrix.length - 2;
  console.log(numNodes);

  let distArray = new Array(numNodes).fill(0);
  let prev = new Array(numNodes).fill(-1);

  let lastnode = numNodes - 1;
  let firstnode = 0;
  let nodesStack = [0];

  // Primera vuelta desde el nodo inicial al final
  while (nodesStack.length > 0) {
    let node = nodesStack.pop();
    if (node === lastnode) {
      continue;
    }
    for (let i = 0; i < numNodes; i++) {
      if (
        numbersAdjacencyMatrix[node][i] !== 0 &&
        distArray[node] + numbersAdjacencyMatrix[node][i] > distArray[i]
      ) {
        distArray[i] = distArray[node] + numbersAdjacencyMatrix[node][i];
        prev[i] = node; // Almacenamos el nodo anterior
        nodesStack.push(i);
      }
    }
  }

  // Reconstruir la ruta crítica desde el nodo final al inicial
  let criticRoute = [];
  let currentNode = lastnode;

  while (currentNode !== -1) {
    criticRoute.unshift(currentNode);
    currentNode = prev[currentNode];
  }

  // Extraer nombres y pesos de la ruta crítica
  let criticPathDetails = [];
  for (let i = 0; i < criticRoute.length - 1; i++) {
    let fromNode = criticRoute[i];
    let toNode = criticRoute[i + 1];
    let weight = numbersAdjacencyMatrix[fromNode][toNode];
    criticPathDetails.push({
      from: fromNode,
      to: toNode,
      weight: weight,
    });
  }

  let nombresNodos = adjacencyMatrix[0].slice(1, adjacencyMatrix.length - 1); //Solo los nombres de los noddos

  for (let i = 0; i < nombresNodos.length; i++) {
    nombresNodos[i] = nombresNodos[i].replace(" ", "");
    nombresNodos[i] = nombresNodos[i].toLowerCase();
  }

  console.log(nombresNodos);

  // obteniendo nombres de edges de la ruta crítica
  let criticPathEdges = [];

  for (const edgeKey in edges) {
    const edge = edges[edgeKey];
    for (let i = 0; i < criticPathDetails.length; i++) {
      if (
        edge.source === nombresNodos[criticPathDetails[i].from] &&
        edge.target === nombresNodos[criticPathDetails[i].to]
      ) {
        console.log("Encontrado", edge);
        criticPathEdges.push(edgeKey.toString());
      }
    }
  }

  for (const edgeKey of criticPathEdges) {
    if (edges[edgeKey]) {
      edges[edgeKey].color = "#ff00ff"; // Cambiamos el color a un morado brillante.
      edges[edgeKey].width = 4;
    }
  }

  console.log("Ruta crítica:", criticRoute);
  console.log("Detalles de la ruta crítica:", criticPathDetails);
}

function johnson3() {
  adjacencyMatrix = createAdjacencyMatrix(nodes, edges);
  let numbersAdjacencyMatrix = getAdjacencyMatrixWithoutHeaders();
  console.log(numbersAdjacencyMatrix);
  const numNodes = adjacencyMatrix.length - 2;
  console.log(numNodes);

  let distArray = new Array(numNodes).fill(0);
  let prev = new Array(numNodes).fill(-1);

  let lastnode = numNodes - 1;
  let firstnode = 0;
  let nodesStack = [0];

  // Primera vuelta desde el nodo inicial al final
  while (nodesStack.length > 0) {
    let node = nodesStack.pop();
    if (node === lastnode) {
      continue;
    }
    for (let i = 0; i < numNodes; i++) {
      if (
        numbersAdjacencyMatrix[node][i] !== 0 &&
        distArray[node] + numbersAdjacencyMatrix[node][i] > distArray[i]
      ) {
        distArray[i] = distArray[node] + numbersAdjacencyMatrix[node][i];
        prev[i] = node;
        nodesStack.push(i);
      }
    }
  }

  // Reconstruir la ruta crítica
  let criticRoute = [];
  let currentNode = lastnode;
  while (currentNode !== -1) {
    criticRoute.unshift(currentNode);
    currentNode = prev[currentNode];
  }

  // Extraer detalles de la ruta crítica
  let criticPathDetails = criticRoute
    .map((node, index) => {
      if (index < criticRoute.length - 1) {
        return {
          from: node,
          to: criticRoute[index + 1],
          weight: numbersAdjacencyMatrix[node][criticRoute[index + 1]],
        };
      }
      return null;
    })
    .filter((item) => item !== null);

  let nombresNodos = adjacencyMatrix[0].slice(1, adjacencyMatrix.length - 1);

  nombresNodos = nombresNodos.map((nombre) =>
    nombre.replace(" ", "").toLowerCase()
  );

  // Obtener aristas de la ruta crítica
  let criticPathEdges = Object.keys(edges).filter((edgeKey) => {
    const edge = edges[edgeKey];
    return criticPathDetails.some((detail) => {
      return (
        edge.source === nombresNodos[detail.from] &&
        edge.target === nombresNodos[detail.to]
      );
    });
  });

  // Construir paths para vue-network graph
  const paths = reactive({
    path1: {
      edges: criticPathEdges,
      color: "#ff00ff66",
    },
  });

  console.log("Ruta crítica:", criticRoute);
  console.log("Detalles de la ruta crítica:", criticPathDetails);

  // Retorna paths para que puedas usarlo donde lo necesites
  return paths;
}

//función método NorthWest para problema de transporte

function getColumnSum(colIndex) {
  let sum = 0;
  for (let i = 1; i < adjacencyMatrix.length; i++) {
    // Empezamos desde 1 para excluir el encabezado
    sum += adjacencyMatrix[i][colIndex];
  }
  return sum;
}

function northWestMethod() {
  let totalCost = 0;
  let result = [];
  let i = 0,
    j = supplies.value.length;

  console.log("Iniciando northWestMethod");

  if (
    !adjacencyMatrix ||
    !adjacencyMatrix.length ||
    !adjacencyMatrix[0].length
  ) {
    console.error("Datos de matriz no inicializados");
    return;
  }

  const extractedCosts = [];
  for (let i = 1; i < adjacencyMatrix.length; i++) {
    const row = [];
    for (let j = 1; j < adjacencyMatrix[i].length; j++) {
      row.push(adjacencyMatrix[i][j]);
    }
    extractedCosts.push(row);
  }
  const extractedSupplies = [...supplies.value];
  const extractedDemands = [...demands.value];

  // Paso 2: Actualizar referencias en Vue
  costos.value = extractedCosts;
  oferta.value = extractedSupplies;
  demanda.value = extractedDemands;

  console.log("Iniciando northWestMethod");
  console.log("Supplies:", supplies.value);
  console.log("Demands:", demands.value);
  console.log("Matriz de adyacencia:", adjacencyMatrix);

  // Corregimos el acceso a las propiedades .length aquí
  while (i < supplies.value.length && j < demands.value.length) {
    console.log(`Iteración actual: i=${i}, j=${j}`);
    console.log(`supplies[${i}] = ${supplies.value[i]}`);
    console.log(`demands[${j}] = ${demands.value[j]}`);

    let qty = Math.min(supplies.value[i], demands.value[j]);
    console.log(`Cantidad mínima determinada: ${qty}`);

    supplies.value[i] -= qty;
    demands.value[j] -= qty;
    console.log(`Nuevo valor de supplies en índice ${i}: ${supplies.value[i]}`);
    console.log(`Nuevo valor de demands en índice ${j}: ${demands.value[j]}`);

    result.push({
      source: adjacencyMatrix[i + 1][0],
      destination: adjacencyMatrix[0][j + 1],
      quantity: qty,
      cost: adjacencyMatrix[i + 1][j + 1],
    });
    totalCost += qty * adjacencyMatrix[i + 1][j + 1];

    console.log("Resultado parcial:", result);

    if (supplies.value[i] === 0) {
      console.log(`Supplies en índice ${i} es 0, incrementando i`);
      i++;
    }
    if (demands.value[j] === 0) {
      console.log(`Demands en índice ${j} es 0, incrementando j`);
      j++;
    }
  }

  console.log("Resultado final:", result);

  respuestaNorthWest.value = result.map((entry) => {
    return `De ${entry.source} a ${entry.destination}: ${entry.quantity} unidades con costo de ${entry.cost}`;
  });

  respuestaNorthWest.value.push(`Costo total de transporte: ${totalCost}`);

  // Mostrar el modal

  isResultadoNorthWestVisible.value = false;
  isMatrixNorthWestModalVisible.value = false;

  // Paso 3: Llamada a resolver
  resolver();
  //isMatrixModalVisibleNorthWest.value = true;

  return result;
}

//Funciones de complemento

const costos = ref([]);
const oferta = ref([]);
const demanda = ref([]);
const result = ref({});

const respuestaNorthWestSolve = ref([]);

var costoTotalMAX = "";

const resolver = async () => {
  const url = "http://localhost:8080/optimizar_transporte";

  try {
    const response = await axios.post(url, {
      costos: costos.value,
      oferta: oferta.value,
      demanda: demanda.value,
    });

    const decisionesProcesadas = [];
    const decisiones = response.data.decisiones;
    const matrizDecisiones = [];

    let di = 0;
    let dj = 0;
    let pf = 0;
    console.log("Matriz de decisiones: " + decisiones);

    /***for (let di = 0; di < decisiones.length; di++) {
      for (let dj = 0; dj < decisiones[di].length; dj++) {
        console.log(
          "di: [" + di + "] - dj: [" + dj + "] " + decisiones[di][dj]
        );
      }
    } */

    for (let i = 0; i < adjacencyMatrix.length - 1; i++) {
      const fila = [];
      if (pf == 1) {
        di++;
      }
      dj = 0;
      for (let j = 0; j < adjacencyMatrix[i].length - 1; j++) {
        if (i == 0 && j == 0) {
          fila.push(" ");
        } else {
          if (j >= 0 && i == 0) {
            fila.push(adjacencyMatrix[0][j]);
          } else {
            if (i >= 0 && j == 0) {
              fila.push(adjacencyMatrix[i][0]);
            } else {
              //console.log(supplies.value.length);
              if (
                i > 0 &&
                j > supplies.value.length &&
                di < decisiones.length
              ) {
                console.log("di: " + di + " dj: " + dj);
                console.log(
                  "decisiones: " + decisiones[di][dj + decisiones.length - 1]
                );

                fila.push(decisiones[di][dj + decisiones.length - 1]);

                pf = 1;
                dj++;
              } else {
                fila.push(0);
              }
            }
          }
        }
      }
      matrizDecisiones.push(fila); // Añadimos la fila a la matrizDecisiones
    }

    for (let i = 0; i < decisiones.length; i++) {
      for (let j = 0; j < decisiones[i].length; j++) {
        if (decisiones[i][j] > 0) {
          decisionesProcesadas.push({
            source: adjacencyMatrix[i + 1][0], // Usando los nombres de la matriz de adyacencia
            destination: adjacencyMatrix[0][j + 1], // Usando los nombres de la matriz de adyacencia
            quantity: decisiones[i][j],
            cost: costos.value[i][j],
          });
        }
      }
    }

    if (parseInt(response.data.costo_total) < 0) {
      respuestaNorthWestSolve.value = decisionesProcesadas.map((decision) => {
        return `De ${decision.source} a ${decision.destination}: ${
          decision.quantity
        } unidades con costo de ${parseInt(decision.cost) * -1}`;
      });
      respuestaNorthWestSolve.value.push(
        (costoTotalMAX = `Costo total de transporte: ${
          parseInt(response.data.costo_total) * -1
        }`)
      );
    } else {
      respuestaNorthWestSolve.value = decisionesProcesadas.map((decision) => {
        return `De ${decision.source} a ${decision.destination}: ${
          decision.quantity
        } unidades con costo de ${parseInt(decision.cost)}`;
      });
      respuestaNorthWestSolve.value.push(
        (costoTotalMAX = `Costo total de transporte: ${parseInt(
          response.data.costo_total
        )}`)
      );
    }
    console.log("Respuesta NORTHWEST MAX: " + respuestaNorthWestSolve.value);

    resultMatrix.value = matrizDecisiones;
    isMatrixModalVisibleNorthWest.value = true;

    /**console.log(matrizDecisiones);
    console.log(response.data); */
  } catch (error) {
    console.error("Hubo un error al enviar la solicitud:", error);
  }
};

//**NORTHWEST MAXIMIZACIÓN */

/**MÉTODO MAX NORTHWEST */
function northWestMethodMax() {
  let totalCost = 0;
  let result = [];
  let i = 0,
    j = supplies.value.length;

  console.log("Iniciando northWestMethodMax");

  if (
    !adjacencyMatrix ||
    !adjacencyMatrix.length ||
    !adjacencyMatrix[0].length
  ) {
    console.error("Datos de matriz no inicializados");
    return;
  }

  const extractedCosts = [];
  for (let i = 1; i < adjacencyMatrix.length; i++) {
    const row = [];
    for (let j = 1; j < adjacencyMatrix[i].length; j++) {
      row.push(adjacencyMatrix[i][j] * -1);
    }
    extractedCosts.push(row);
  }
  const extractedSupplies = [...supplies.value];
  const extractedDemands = [...demands.value];

  // Paso 2: Actualizar referencias en Vue
  costos.value = extractedCosts;
  oferta.value = extractedSupplies;
  demanda.value = extractedDemands;

  console.log("Iniciando northWestMethod");
  console.log("Supplies:", supplies.value);
  console.log("Demands:", demands.value);
  console.log("Matriz de adyacencia:", adjacencyMatrix);

  // Corregimos el acceso a las propiedades .length aquí
  while (i < supplies.value.length && j < demands.value.length) {
    console.log(`Iteración actual: i=${i}, j=${j}`);
    console.log(`supplies[${i}] = ${supplies.value[i]}`);
    console.log(`demands[${j}] = ${demands.value[j]}`);

    let qty = Math.min(supplies.value[i], demands.value[j]);
    console.log(`Cantidad mínima determinada: ${qty}`);

    supplies.value[i] -= qty;
    demands.value[j] -= qty;
    console.log(`Nuevo valor de supplies en índice ${i}: ${supplies.value[i]}`);
    console.log(`Nuevo valor de demands en índice ${j}: ${demands.value[j]}`);

    result.push({
      source: adjacencyMatrix[i + 1][0],
      destination: adjacencyMatrix[0][j + 1],
      quantity: qty,
      cost: adjacencyMatrix[i + 1][j + 1],
    });
    totalCost += qty * adjacencyMatrix[i + 1][j + 1];

    console.log("Resultado parcial:", result);

    if (supplies.value[i] === 0) {
      console.log(`Supplies en índice ${i} es 0, incrementando i`);
      i++;
    }
    if (demands.value[j] === 0) {
      console.log(`Demands en índice ${j} es 0, incrementando j`);
      j++;
    }
  }

  console.log("Resultado final:", result);

  respuestaNorthWest.value = result.map((entry) => {
    return `De ${entry.source} a ${entry.destination}: ${entry.quantity} unidades con costo de ${entry.cost}`;
  });

  respuestaNorthWest.value.push(`Costo total de transporte: ${totalCost}`);

  // Mostrar el modal

  isResultadoNorthWestVisible.value = false;
  isMatrixNorthWestModalVisible.value = false;

  // Paso 3: Llamada a resolver
  resolver();
  //isMatrixModalVisibleNorthWest.value = true;

  return result;
}

/**FIN MAX */
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
  height: 50%;
  margin: 2%;
  padding: 3%;
  border-radius: 25px;
  transition: ease-in 0.5s;
  background-color: #ffdfd0;
  color: #000;
}

.modal .btn-control-panel,
.modal2 .btn-control-panel,
.modal3 .btn-control-panel,
.modal4 .btn-control-panel,
.modal6 .btn-control-panel,
.modal7 .btn-control-panel,
.modal5 .btn-control-panel,
.modal8 .btn-control-panel,
.modal9 .btn-control-panel,
.modal10 .btn-control-panel {
  width: 50%;
  height: auto;
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

.modal10 {
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
.modal2 {
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
.modal3 {
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
.modal4 {
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

.modal5 {
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

.modal6 {
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

.modal7 {
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

.modal9 {
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
.modal8 {
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
  width: 50%;
  height: 50%;
  border-radius: 25px;
  position: relative;
  text-align: center;
}

.modal2 .modal-content,
.modal3 .modal-content,
.modal4 .modal-content,
.modal6 .modal-content,
.modal7 .modal-content,
.modal5 .modal-content,
.modal8 .modal-content,
.modal9 .modal-content,
.modal10 .modal-content {
  /**  background-color: #fff;
 */
  padding: 2.5%;
  border: 1px solid #888;
  width: 50%;
  height: auto;
  border-radius: 25px;
  position: relative;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%);
}

.modal4 .modal-content select {
  width: 50%;
  height: 25%;
  border-radius: 25px;
  position: relative;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%);
}

.modal2 .modal-content h3,
.modal3 .modal-content h3,
.modal4 .modal-content h3,
.modal6 .modal-content h3,
.modal7 .modal-content h3,
.modal5 .modal-content h3,
.modal8 .modal-content h3,
.modal9 .modal-content h3,
.modal10 .modal-content h3 {
  margin-top: -2%;
  font-size: 2.2rem;
  color: #c63637;
}

.modal2 .modal-content input,
.modal3 .modal-content input,
.modal4 .modal-content input,
.modal6 .modal-content input,
.modal7 .modal-content input,
.modal5 .modal-content input,
.modal8 .modal-content input,
.modal9 .modal-content input,
.modal10 .modal-content input {
  height: auto;
  width: 50%;
  font-size: 1rem;
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
    transform: scale(0.9);
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
  .modal2 .modal-content,
  .modal3 .modal-content,
  .modal4 .modal-content,
  .modal6 .modal-content,
  .modal7 .modal-content,
  .modal5 .modal-content,
  .modal8 .modal-content,
  .modal9 .modal-content,
  .modal10 .modal-content {
    /**  background-color: #fff;
 */
    width: 90%;
    height: 50%;
  }

  .modal2 .modal-content h3,
  .modal3 .modal-content h3,
  .modal4 .modal-content h3,
  .modal6 .modal-content h3,
  .modal7 .modal-content h3,
  .modal5 .modal-content h3,
  .modal8 .modal-content h3,
  .modal9 .modal-content h3,
  .modal10 .modal-content h3 {
    font-size: 1.5rem;
    color: #c63637;
  }

  .modal2 .modal-content input,
  .modal3 .modal-content input,
  .modal4 .modal-content input,
  .modal6 .modal-content input,
  .modal7 .modal-content input,
  .modal5 .modal-content input,
  .modal8 .modal-content input,
  .modal9 .modal-content input,
  .modal10 .modal-content input {
    margin-top: 0%;
    height: 7%;
    width: 75%;
    font-size: 0.7rem;
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
