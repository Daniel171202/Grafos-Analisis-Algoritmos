<template>
   <div class="demo-control-panel appearance" id="controlPanel">
    <div class="nodos">
      <label>Nodos:     </label>
      
      <button class="btn-control-panel" :disabled="selectedNodes.length == 0" @click="removeNode"
          >Eliminar</button
        >
    </div>

   
      <div class="vertices">
        <label>Vértices:</label>
        <button class="btn-control-panel" :disabled="!isEdgeAddable()" @click="addSkyBlueEdge"
          >Conexión Celeste</button
        >
        <button class="btn-control-panel" :disabled="!isEdgeAddable()" @click="addHotPinkEdge"
          >Conexión Rosado</button
        >
        <button class="btn-control-panel" :disabled="!isEdgeAddable()" @click="addGrayEdge"
          >Conexión Gris</button
        >
        <button class="btn-control-panel" :disabled="!isEdgeAddable()" @click="addBlackEdge"
          >Conexión Negro</button
        >
        <button  class="btn-control-panel" :disabled="selectedEdges.length == 0" @click="removeEdge"
          >Eliminar Vértice</button
        >
      </div>
    </div>
  
    <v-network-graph
    v-model:selected-nodes="selectedNodes"
    v-model:selected-edges="selectedEdges"
    :nodes="nodes"
    :edges="edges"
    
    :layouts="layouts"
    :configs="configs"
    @dblclick ="addNodeOnDoubleClick"
  >
    <template #edge-label="{ edge, ...slotProps }">
      <v-edge-label  :text=" nameofEdge(edge)" align="center" vertical-align="above" v-bind="slotProps" />
    </template>
  </v-network-graph>
  </template>
  
  <script setup>
import { reactive, ref } from "vue";
import data from "../assets/data.js";
import "v-network-graph/lib/style.css";
import * as vNG from "v-network-graph";


  
  
  const nodes = reactive({ ...data.nodes });
  const edges = reactive({ ...data.edges });
  
  const configs = reactive(
    vNG.defineConfigs({
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
  }
  
  function removeEdge() {
    for (const edgeId of selectedEdges.value) {
      delete edges[edgeId];
    }
  }
  
  function isEdgeAddable() {
    return selectedNodes.value.length == 2;
  }


function nameofEdge(edge) {
  const label = edge.label !== null ? edge.label : "";
  const cost = edge.cost !== null ? edge.cost : "";
  const aux = label || cost ? `${label}${label && cost ? ": " : ""}${cost}` : " ";
  return aux;
}

function removeNode() {
    for (const nodeId of selectedNodes.value) {
      delete nodes[nodeId];
    }
  }

function addNode(node) {
  const nodeId = `node${nextNodeIndex.value}`;
  const name = `Node ${nextNodeIndex.value}`;
  nodes[nodeId] = { name, ...node };
  nextNodeIndex.value++;
}

function addNodeOnDoubleClick(event) {
  const newNode = {
    size: 24,
    color: "lightskyblue",
    label: true,
    x: event.offsetX, // X-coordinates based on the click position
    y: event.offsetY, // Y-coordinates based on the click position
  };
  addNode(newNode);
}
  








  
  
  </script>
  
  <style>


  #controlPanel{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 15vh;
    min-width: 100vw;
    padding: 1%;
  }

  #controlPanel .nodos{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin: 2% 0;
  }
  #controlPanel .vertices{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }

  #controlPanel .btn-control-panel{
    height: 15%;
    min-width: 25%;
  }
  
  .v-network-graph {
    width: 100vw;
    height: 100vh;
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
  color: #4A5568;
  border: 0px solid #A0AEC0;
  transition: background .2s ease, color .2s ease, box-shadow .2s ease, transform .2s ease;
  box-shadow: 0 0 0 #BEE3F8;
  transform: translateY(0);
  }

  #controlPanel .nodos .btn-control-panel:first-of-type,
  #controlPanel .vertices .btn-control-panel:first-of-type{
    border-radius: 0.5em 0 0 0.5em;
    margin: 0% 0% 0% 5%;
  }
  #controlPanel .vertices .btn-control-panel:last-of-type,
  #controlPanel .nodos .btn-control-panel:last-of-type{
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

  </style>