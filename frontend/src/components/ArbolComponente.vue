<template>
  <div class="header">
    <h1 class="header_title">Arboles</h1>
  </div>
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
      <button @click="showAddNodeModal" class="buttons_blue">Agregar Nodo</button>
      <button @click="showDeleteNodeModal" class="buttons_red">Eliminar Nodo</button>
      <button @click="showConstructTreeModal" class="buttons_yellow">Generar a partir de recorridos</button>
      <button @click="inOrderTraversal" class="buttons_yellow">Recorrido InOrder</button>
      <button @click="preOrderTraversal" class="buttons_yellow">Recorrido PreOrder</button>
      <button @click="postOrderTraversal" class="buttons_yellow">Recorrido PostOrder</button>
      <button @click="reset" class="buttons_red">Reiniciar</button>
    </div>

    <!-- Modales -->
    <div v-if="isAddNodeModalVisible" class="modal">
      <div class="modal-content">
        <div class="modal-content-header">
          <h3 class = "modal-content-header-title">Agregar Nodo</h3>
          <span class="close" @click="closeAddNodeModal">&times;</span>
        </div>
        <div class="modal-content-body">
          <p class = "modal-content-body-label">Ingrese el valor del nodo a agregar.</p>
          <input v-model="newNodeValue" type="text" placeholder="Ingrese el valor del nodo" class="modal-content-body-input" />
        </div>
        <div class="modal-content-buttons">
          <button @click="addNode" class="buttons_blue">Agregar</button>
          <button @click="closeAddNodeModal" class="buttons_red">Cerrar</button>
        </div>
      </div>
    </div>

    <div v-if="isDeleteNodeModalVisible" class="modal">
      <div class="modal-content">
        <div class="modal-content-header">
          <h3 class = "modal-content-header-title">Eliminar Nodo</h3>
          <span class="close" @click="closeDeleteNodeModal">&times;</span>
        </div>
        <div class ="modal-content-body">
          <p class = "modal-content-body-label">Ingrese el valor del nodo a eliminar.</p>
          <input v-model="nodeToDelete" type="text" placeholder="Ingrese el valor del nodo a eliminar" class="modal-content-input"/>
        </div>
        <div class="modal-content-buttons">
          <button @click="deleteNode" class="buttons_blue">Eliminar</button>
          <button @click="closeDeleteNodeModal" class="buttons_red">Cerrar</button>
        </div>
      </div>
    </div>

    <!-- Modal de Alerta -->
    <div v-if="isAlertModalVisible" class="modal">
      <div class="modal-content">
        <div class="modal-content-header modal-content-header_alert">
          <h3 class = "modal-content-header-title">Alerta!</h3>
          <span class="close" @click="closeAlertModal">&times;</span>
        </div>
        <div class="modal-content-body">
          <p class="modal-content-alert">{{alertMessage}}</p>
        </div>
        <div class="modal-content-buttons">
          <button @click="closeAlertModal" class="buttons_red">Cerrar</button>
        </div>
      </div>
    </div>

    <!-- Modal de Recorridos -->
    <div v-if="isTraversalModalVisible" class="modal">
      <div class="modal-content">
        <div class="modal-content-header">
          <h3 class = "modal-content-header-title">{{ traversalTitle }}</h3>
          <span class="close" @click="closeTraversalModal">&times;</span>
        </div>
        <div class="modal-content-body">
          <p class="modal-content-body-message">{{ traversalResult }}</p>
        </div>
        <div class="modal-content-buttons">
          <button @click="closeTraversalModal" class="buttons_red">Cerrar</button>
        </div>
      </div>
    </div>

    <!--Modal de Contruccion de Arbol-->
    <div v-if="isConstructTreeModalVisible" class="modal">
      <div class="modal-content">
        <div class="modal-content-header">
          <h3 class = "modal-content-header-title">Construir Arbol</h3>
          <span class="close" @click="closeConstructTreeModal">&times;</span>
        </div>
        <div class="modal-content-body">
          <input v-model="inOrder" type="text" placeholder="Ingrese el recorrido InOrder separado por comas" class="modal-content-body-input"/>
          <input v-model="preOrder" type="text" placeholder="Ingrese el recorrido PreOrder separado por comas"  class="modal-content-body-input"/>
          <p class="modal-content-body-message">Los recorridos deben tener la misma cantidad de elementos.</p>
        </div>
        <div class="modal-content-buttons">
          <button @click="constructTree" class="buttons_blue">Construir</button>
          <button @click="closeConstructTreeModal" class="buttons_red">Cerrar</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import BinaryTree from "../utils/BinaryTree";

const tree = new BinaryTree();
const newNodeValue = ref("");
const nodeToDelete = ref("");
const isAddNodeModalVisible = ref(false);
const isDeleteNodeModalVisible = ref(false);
const isAlertModalVisible = ref(false);
const isTraversalModalVisible = ref(false);
const isConstructTreeModalVisible = ref(false);
const alertMessage = ref("");
const traversalResult = ref("");
const traversalTitle = ref("");
const inOrder = ref("");
const preOrder = ref("");

const nodes = ref({ ...tree.nodes });
const edges = ref({ ...tree.edges });
const layouts = ref({ ...tree.layouts });


function showAddNodeModal() {
  newNodeValue.value = "";
  isAddNodeModalVisible.value = true;
}

function showDeleteNodeModal() {
  nodeToDelete.value = "";
  isDeleteNodeModalVisible.value = true;
}

function closeAddNodeModal() {
  isAddNodeModalVisible.value = false;
}

function closeDeleteNodeModal() {
  isDeleteNodeModalVisible.value = false;
}

function showAlertModal(message){
  alertMessage.value = message;
  isAlertModalVisible.value = true;
}

function closeAlertModal(){
  alertMessage.value = "";
  isAlertModalVisible.value = false;
}

function showTraversalModal(title, result) {
  traversalTitle.value = title;
  traversalResult.value = result;
  isTraversalModalVisible.value = true;
}

function closeTraversalModal() {
  traversalTitle.value = "";
  traversalResult.value = "";
  isTraversalModalVisible.value = false;
}

function showConstructTreeModal() {
  inOrder.value = "";
  preOrder.value = "";
  isConstructTreeModalVisible.value = true;
}

function closeConstructTreeModal() {
  isConstructTreeModalVisible.value = false;
}


function addNode() {
  const value = parseInt(newNodeValue.value);
  if (value || value === 0) {
    if (!tree.elements.has(value)) {
      tree.insert(value);
      updateGraphData();
      closeAddNodeModal();
    } else {
      showAlertModal("El valor ya existe en el árbol.");
    }
  } else {
    showAlertModal("Ingrese un valor válido.");
  }
}

function constructTree() {
  const inOrderArray = inOrder.value.split(",").map((value) => parseInt(value));
  const preOrderArray = preOrder.value.split(",").map((value) => parseInt(value));
  if (inOrderArray.length === preOrderArray.length) {
    tree.FromInOrderAndPreOrder(inOrderArray, preOrderArray);
    updateGraphData();
    closeConstructTreeModal();
  } else {
    showAlertModal("Los recorridos no tienen la misma cantidad de elementos.");
  }
}

function updateGraphData() {
  nodes.value = { ...tree.nodes };
  edges.value = { ...tree.edges };
  layouts.value = { ...tree.layouts };
}

function inOrderTraversal() {
  if (tree.root === null) {
    showAlertModal("El árbol está vacío.");
    return;
  }
  const result = tree.InOrder();
  showTraversalModal("Recorrido InOrder", result.join(" -> "));
}

function preOrderTraversal() {
  if (tree.root === null) {
    showAlertModal("El árbol está vacío.");
    return;
  }
  const result = tree.PreOrder();
  showTraversalModal("Recorrido PreOrder", result.join(" -> "));
}

function postOrderTraversal() {
  if (tree.root === null) {
    showAlertModal("El árbol está vacío.");
    return;
  }
  const result = tree.PostOrder();
  showTraversalModal("Recorrido PostOrder", result.join(" -> "));
}

function deleteNode() {
  const value = parseInt(nodeToDelete.value);
  if (value || value === 0) {
    if (tree.elements.has(value)) {
      tree.deleteNode(value);
      updateGraphData();
      closeDeleteNodeModal();
    } else {
      showAlertModal("El valor no existe en el árbol.");
    }
  } else {
    showAlertModal("Ingrese un valor válido.");
  }
}

function reset() {
  tree.reset();
  updateGraphData();
}
</script>

<style>

.container {
  margin-top: 20px;
  height: 100vh;
}

.graph-container {
  width: 100%;
  height: 70vh;
  margin-bottom: 20px;
  border: 1px solid #ccc;
}

.graph {
  width: 100%;
  height: 100%;
}

.header{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  background-color: #2196f3;
}

.header_title{
  color: #fff;
  font-size: 30px;  
  font-family: sans-serif;
}

.buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

button{
  border: none;
  background-color: none;
}

.buttons button {
  padding: 10px 20px;
  font-size: 16px;
}

.buttons_red {
  background-color: #f44336;
  color: #fff;
  border-radius: 10px;
}

.buttons_blue {
  background-color: #2196f3;
  color: #fff;
  border-radius: 10px;
}

.buttons_yellow {
  background-color: #ffeb3b;
  color: #000;
  border-radius: 10px;
}

.buttons_red:hover {
  background-color: #d32f2f;
}

.buttons_blue:hover {
  background-color: #1976d2;
}

.buttons_yellow:hover {
  background-color: #fbc02d;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.modal-content {
  width: 400px;
  height: wrap-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 25px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  text-align: center;
}

.modal-content-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-radius: 25px 25px 0 0;
  background-color: #2196f3;
  margin-bottom: 20px;
}


.close{
  color: #fff;
  cursor: pointer;
  padding-right: 10px;
}


.modal-content-header-title{
  margin-bottom: 20px;
  padding-left: 10px;
  font-family: sans-serif;
  font-size: 20px;
  color: #fff;
}

.modal-content-body{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.modal-content-body-label{
  font-family: sans-serif;
  font-size: 16px;
  margin-bottom: 10px;
}

.modal-content-body-input{
  width: 80%;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  padding-left: 10px;
}

.modal-content-body-input:focus{
  outline: #2196f3;
}

.modal-content-body-message{
  font-family: sans-serif;
  font-size: 16px;
  margin-bottom: 10px;
}

.modal-content-alert{
  font-family: sans-serif;
  font-size: 16px;
  margin-bottom: 10px;
  color: #f44336;
}

.modal-content-buttons{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
}

.modal button {
  margin-top: 10px;
  margin-right: 10px;
  padding: 10px 20px;
  font-size: 16px;

}

</style>
