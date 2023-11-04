<template>
  <div class="container">
    <h1>Arboles</h1>
    <div class="graph-container">
      <v-network-graph
        class="graph"
        :nodes="nodes"
        :edges="edges"
        :layouts="layouts"
      />
    </div>
    <div class="buttons">
      <button @click="showAddNodeModal">Agregar Nodo</button>
      <button @click="showDeleteNodeModal">Eliminar Nodo</button>
      <button @click="showConstructTreeModal">Generar a partir de recorridos</button>
      <button @click="inOrderTraversal">Recorrido InOrder</button>
      <button @click="preOrderTraversal">Recorrido PreOrder</button>
      <button @click="postOrderTraversal">Recorrido PostOrder</button>
      <button @click="reset">Reiniciar</button>
    </div>

    <!-- Modales -->
    <div v-if="isAddNodeModalVisible" class="modal">
      <div class="modal-content">
        <h3>Agregar Nodo</h3>
        <input v-model="newNodeValue" type="text" placeholder="Ingrese el valor del nodo" />
        <button @click="addNode">Agregar</button>
        <button @click="closeAddNodeModal">Cerrar</button>
      </div>
    </div>

    <div v-if="isDeleteNodeModalVisible" class="modal">
      <div class="modal-content">
        <h3>Eliminar Nodo</h3>
        <input v-model="nodeToDelete" type="text" placeholder="Ingrese el valor del nodo a eliminar" />
        <button @click="deleteNode">Eliminar</button>
        <button @click="closeDeleteNodeModal">Cerrar</button>
      </div>
    </div>

    <!-- Modal de Alerta -->
    <div v-if="isAlertModalVisible" class="modal">
      <div class="modal-content">
        <h3>Alerta!</h3>
        <p>{{alertMessage}}</p>
        <button @click="closeAlertModal">Cerrar</button>
      </div>
    </div>

    <!-- Modal de Recorridos -->
    <div v-if="isTraversalModalVisible" class="modal">
      <div class="modal-content">
        <h3>{{ traversalTitle }}</h3>
        <p>{{ traversalResult }}</p>
        <button @click="closeTraversalModal">Cerrar</button>
      </div>
    </div>

    <!--Modal de Contruccion de Arbol-->
    <div v-if="isConstructTreeModalVisible" class="modal">
      <div class="modal-content">
        <h3>Construir Arbol</h3>
        <input v-model="inOrder" type="text" placeholder="Ingrese el recorrido InOrder separado por comas" />
        <input v-model="preOrder" type="text" placeholder="Ingrese el recorrido PreOrder separado por comas" />
        <button @click="constructTree">Construir</button>
        <button @click="closeConstructTreeModal">Cerrar</button>
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
  const result = tree.InOrder();
  showTraversalModal("Recorrido InOrder", result.join(" -> "));
}

function preOrderTraversal() {
  const result = tree.PreOrder();
  showTraversalModal("Recorrido PreOrder", result.join(" -> "));
}

function postOrderTraversal() {
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.graph-container {
  width: 100%;
  height: 70vh;
  border: 1px solid #000;
}

.graph {
  width: 100%;
  height: 100%;
}

.buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.buttons button {
  padding: 10px 20px;
  font-size: 16px;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  text-align: center;
}

.modal button {
  margin-top: 10px;
}

</style>
