<template>
  <div>
    <div class="sidebar">
      <button
        style="background-color: RED; cursor: pointer"
        @click="toggleSidebar"
      >
        Mostrar/Ocultar menú
      </button>
      <div>
        <label>Nodos:</label>
        <div>
          <input v-model="currentNodeName" placeholder="Nombre del nodo" />
          <button @click="addNode('Tarea')">Agregar tarea</button>
          <button @click="addNode('Recurso')">Agregar recurso</button>
          <button @click="removeNode">Eliminar nodo</button>
        </div>

        <label>Conexiones:</label>
        <div>
          <input
            v-model="currentCost"
            placeholder="Costo (peso de la arista)"
          />
          <button @click="addEdge">Conectar nodos</button>
          <button @click="removeEdge">Eliminar conexión</button>
        </div>
        <button class="help"  @click="redirectToDriveFile">Nesecitas ayuda?
        </button>
        <button @click="resolveAssignment">Resolver asignación</button>
      </div>
    </div>
  </div>
  <v-network-graph
    v-model:selected-nodes="selectedNodes"
    v-model:selected-edges="selectedEdges"
    :nodes="nodes"
    :edges="edges"
    @dblclick="addNodeOnDoubleClick"
  >
  </v-network-graph>
</template>

<script setup>
import { reactive, ref } from "vue";
import "v-network-graph/lib/style.css";
import * as vNG from "v-network-graph";
import { Munkres } from "munkres-js";

const nodes = reactive({});
const edges = reactive({});
const selectedNodes = ref([]);
const selectedEdges = ref([]);
const showSidebar = ref(false);
const currentCost = ref("");
const currentNodeName = ref("");
function toggleSidebar() {
  console.log("Toggling sidebar"); // Añade esto para diagnóstico
  showSidebar.value = !showSidebar.value;
}

function addNode(type) {
  const nodeId = `node${Object.keys(nodes).length + 1}`;
  const nodeName = currentNodeName.value || nodeId; // Si no se especifica un nombre, se usa el ID por defecto
  nodes[nodeId] = { label: nodeName, type: type };
  currentNodeName.value = ""; // Limpiamos el input
}
function removeNode() {
  for (const nodeId of selectedNodes.value) {
    delete nodes[nodeId];
  }
}

function addEdge() {
  if (selectedNodes.value.length !== 2) {
    alert("Selecciona dos nodos para conectar.");
    return;
  }

  const edgeId = `edge${Object.keys(edges).length + 1}`;
  const [source, target] = selectedNodes.value;
  edges[edgeId] = { source, target, label: currentCost.value };
  currentCost.value = "";
}

function removeEdge() {
  for (const edgeId of selectedEdges.value) {
    delete edges[edgeId];
  }
}

function addNodeOnDoubleClick(event) {
  addNode("Tarea");
}

function resolveAssignment() {
  // Crear matriz de costos a partir de los nodos y edges.
  const tareas = Object.keys(nodes).filter((id) => nodes[id].type === "Tarea");
  const recursos = Object.keys(nodes).filter(
    (id) => nodes[id].type === "Recurso"
  );

  // Inicializar matriz de costos con valores grandes (simulando "infinito").
  const maxVal = 1000000;
  const matrix = Array.from({ length: tareas.length }, () =>
    Array(recursos.length).fill(maxVal)
  );

  // Llenar la matriz con los costos de los edges.
  for (const edgeId in edges) {
    const edge = edges[edgeId];
    const tareaIndex = tareas.indexOf(edge.source);
    const recursoIndex = recursos.indexOf(edge.target);

    if (tareaIndex >= 0 && recursoIndex >= 0) {
      matrix[tareaIndex][recursoIndex] = parseFloat(edge.label);
    }
  }

  // Resolver el problema de asignación.
  const m = new Munkres();
  const indices = m.compute(matrix);

  // Resaltar las conexiones (edges) que forman la solución óptima.
  const optimalEdges = [];
  for (const [i, j] of indices) {
    const source = tareas[i];
    const target = recursos[j];
    const edgeId = Object.keys(edges).find(
      (id) => edges[id].source === source && edges[id].target === target
    );
    if (edgeId) optimalEdges.push(edgeId);
  }

  // Ahora podrías usar `optimalEdges` para resaltar visualmente estas conexiones en el gráfico.
  // Por simplicidad, aquí sólo vamos a mostrarlas en consola:
  console.log("Edges óptimos:", optimalEdges);
}
</script>

<style scoped>
.sidebar {
  width: 200px;
  padding: 10px;
  border-right: 1px solid #ddd;
  float: left;
  height: 20vh;
  background-color: aqua;
  z-index: 100;
}

v-network-graph {
  margin-left: 220px;
}
</style>
