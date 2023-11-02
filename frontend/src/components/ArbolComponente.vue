<template>
    <div class="container">
      <div class="graph-container">
        <v-network-graph
          class="graph"
          :nodes="nodes"
          :edges="edges"
          :layouts="layouts"
        />
      </div>
      <div class="buttons">
        <button @click="addNode">Agregar Nodo</button>
        <button @click="constructTree">Generar a partir de recorridos</button>
        <button @click="deleteNode">Eliminar Nodo</button>
        <button @click="inOrderTraversal">Recorrido InOrder</button>
      <button @click="preOrderTraversal">Recorrido PreOrder</button>
      <button @click="postOrderTraversal">Recorrido PostOrder</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive, ref } from 'vue';
  import BinaryTree from '../utils/BinaryTree';
  
  const tree = new BinaryTree();

  const nodes = ref({ ...tree.nodes });
  const edges = ref({ ...tree.edges });
  const layouts = ref({ ...tree.layouts });
  


function addNode() {
  let value = prompt('Ingrese el valor del nodo');
  tree.insert(value);
  updateGraphData();
}

function constructTree() {
  const inOrder = prompt('Ingrese el recorrido InOrder separado por comas').split(',').map(Number);
  const preOrder = prompt('Ingrese el recorrido PreOrder separado por comas').split(',').map(Number);

  tree.FromInOrderAndPreOrder(inOrder, preOrder);
  updateGraphData();
}

function updateGraphData() {
  nodes.value = { ...tree.nodes };
  edges.value = { ...tree.edges };
  layouts.value = { ...tree.layouts };
}

function inOrderTraversal() {
  const result = tree.InOrder();
  alert(`Recorrido InOrder: ${result.join(' -> ')}`);
}

function preOrderTraversal() {
  const result = tree.PreOrder();
  alert(`Recorrido PreOrder: ${result.join(' -> ')}`);
}

function postOrderTraversal() {
  const result = tree.PostOrder();
  alert(`Recorrido PostOrder: ${result.join(' -> ')}`);
}
  
  function generateTree() {
    // Implementa lógica para generar los recorridos
  }
  
  function deleteNode() {
    // Implementa lógica para eliminar un nodo
  }
  </script>
  
  <style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  
  .graph-container {
    width: 100%;
    height: 70vh; /* Ajusta la altura del contenedor del gráfico según tus necesidades */
    border: 1px solid #000;
  }
  
  .graph {
    width: 100%;
    height: 100%;
  }
  
  .buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
  }
  
  .buttons button {
    padding: 10px 20px;
    font-size: 16px;
  }
  </style>