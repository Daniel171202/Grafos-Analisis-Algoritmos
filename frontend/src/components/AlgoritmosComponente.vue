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

            <button @click="algoritmoKruskal" class="btn-control-panel">
              Algoritmo Kruskal
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
  
  
  
   
  
    
 
  </template>
  
  <script setup>
  import { reactive, ref, toRefs } from "vue";
  import { useRouter } from "vue-router";
  import data from "../assets/data.js";
  import "v-network-graph/lib/style.css";
  import * as vNG from "v-network-graph";
  import axios from "axios";
  import Kruskal from "@/utils/Kruskal.js";  
  
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

  

  


  
  let graphOptions = [];
  
  
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
  
 
  
  function hideMatrixModal() {
    isMatrixModalVisible.value = false;
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
    console.log (adjacencyMatrix);
    showNodoModal();
  }
  
  function removeNode() {
    for (const nodeId of selectedNodes.value) {
      delete nodes[nodeId];
    }
  
    adjacencyMatrix = createAdjacencyMatrix(nodes, edges);
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
  
  function addEdge(edge) {
    if (selectedNodes.value.length !== 2 && selectedNodes.value.length !== 1) {
      // Si no hay exactamente dos nodos seleccionados, muestra un mensaje de error o realiza alguna otra acción de manejo de errores.
      console.error(
        "Selecciona exactamente dos nodos o un nodo para agregar un bucle."
      );
      return;
    }
    const [source, target] = selectedNodes.value;
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





  function quitarSumas(matriz) {
      // Obtener el número de filas y columnas de la matriz
      const numRows = matriz.length;
      const numCols = matriz[0].length;

      // Crear una nueva matriz sin la última fila y última columna
      const nuevaMatriz = [];
      for (let i = 0; i < numRows - 1; i++) {
        const fila = [];
        for (let j = 0; j < numCols - 1; j++) {
          fila.push(matriz[i][j]);
        }
        nuevaMatriz.push(fila);
      }

      return nuevaMatriz;
    }

  function algoritmoKruskal(){
    const matrix = quitarSumas(adjacencyMatrix);
    const graph = [];
    for (let i = 1; i < matrix.length; i++) {
        for (let j = i + 1; j < matrix[i].length; j++) {
            if (matrix[i][j] !== 0) {
                graph.push([i, j, matrix[i][j]]);
            }
        }
    }

    // Resolver el problema del árbol de expansión mínima
    const kruskal = new Kruskal(graph);
    const minimumSpanningTree = kruskal.kruskalMST();
    console.log("Árbol de expansión mínima:");
    minimumSpanningTree.forEach(([u, v, w]) => {
        console.log(`Node ${u} - Node ${v}: ${w}`);
    });

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
  