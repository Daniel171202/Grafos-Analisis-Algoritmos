<template>
    <div class="demo-control-panel appearance">
      <div>
        <label>Node:</label>
        <el-button @click="addSkyBlueNode">Add SkyBlue</el-button>
        <el-button @click="addHotPinkNode">Add HotPink</el-button>
        <el-button @click="addGrayNode">Add Gray</el-button>
        <el-button @click="addBlackNode">Add Black</el-button>
        <el-button :disabled="selectedNodes.length == 0" @click="removeNode"
          >Remove</el-button
        >
      </div>
      <div>
        <label>Edge:</label>
        <el-button :disabled="!isEdgeAddable()" @click="addSkyBlueEdge"
          >Add SkyBlue</el-button
        >
        <el-button :disabled="!isEdgeAddable()" @click="addHotPinkEdge"
          >Add HotPink</el-button
        >
        <el-button :disabled="!isEdgeAddable()" @click="addGrayEdge"
          >Add Gray</el-button
        >
        <el-button :disabled="!isEdgeAddable()" @click="addBlackEdge"
          >Add Black</el-button
        >
        <el-button :disabled="selectedEdges.length == 0" @click="removeEdge"
          >Remove</el-button
        >
      </div>
    </div>
  
    <v-network-graph
      v-model:selected-nodes="selectedNodes"
      v-model:selected-edges="selectedEdges"
      :nodes="nodes"
      :edges="edges"
      :layouts="data.layouts"
      :configs="configs"
    />
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
      },
    })
  );
  
  const nextNodeIndex = ref(Object.keys(data.nodes).length + 1);
  const nextEdgeIndex = ref(Object.keys(data.edges).length + 1);
  const selectedNodes = ref([]);
  const selectedEdges = ref([]);
  
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
  
  function addNode(node) {
    const nodeId = `node${nextNodeIndex.value}`;
    const name = `Node ${nextNodeIndex.value}`;
    nodes[nodeId] = { name, ...node };
    nextNodeIndex.value++;
    console.log(nodes);
  }
  
  function removeNode() {
    for (const nodeId of selectedNodes.value) {
      delete nodes[nodeId];
    }
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
  }
  
  function removeEdge() {
    for (const edgeId of selectedEdges.value) {
      delete edges[edgeId];
    }
  }
  
  function isEdgeAddable() {
    return selectedNodes.value.length == 2;
  }
  
  
  
  </script>
  
  <style scoped>
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
  </style>