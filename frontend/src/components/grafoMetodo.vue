<template>
  <div>
    <h1>Algoritmo de Asignación</h1>

    <section>
      <h2>Nodos</h2>
      <div>
        <input v-model="nodeName" placeholder="Nombre del nodo" />
        <select v-model="nodeSide">
          <option value="left">Izquierda</option>
          <option value="right">Derecha</option>
        </select>
        <button @click="addNode">Agregar nodo</button>
      </div>

      <div>
        <h3>Nodos Izquierda:</h3>
        <ul>
          <li v-for="node in leftNodes" :key="node.id">{{ node.name }}</li>
        </ul>
      </div>

      <div>
        <h3>Nodos Derecha:</h3>
        <ul>
          <li v-for="node in rightNodes" :key="node.id">{{ node.name }}</li>
        </ul>
      </div>
    </section>

    <section>
      <h2>Conexiones</h2>
      <div>
        <select v-model="selectedLeftNode">
          <option disabled value="">Seleccione nodo izquierdo</option>
          <option v-for="node in leftNodes" :key="node.id" :value="node.id">
            {{ node.name }}
          </option>
        </select>

        <select v-model="selectedRightNode">
          <option disabled value="">Seleccione nodo derecho</option>
          <option v-for="node in rightNodes" :key="node.id" :value="node.id">
            {{ node.name }}
          </option>
        </select>

        <input
          type="number"
          v-model="connectionWeight"
          placeholder="Peso de la conexión"
        />

        <button @click="addConnection" :disabled="!canAddConnection">
          Agregar conexión
        </button>
      </div>

      <ul>
        <li v-for="connection in connections" :key="connection.id">
          {{ getNodeName(connection.from) }} ->
          {{ getNodeName(connection.to) }} : {{ connection.weight }}
        </li>
      </ul>
    </section>

    <section v-if="connections.length">
      <h2>Resultado de Asignación</h2>
      <button @click="solveAssignmentProblem">Resolver</button>
      <ul v-if="assignmentResult.length">
        <li v-for="result in assignmentResult" :key="result.from">
          {{ getNodeName(result.from) }} -> {{ getNodeName(result.to) }} :
          {{ result.weight }}
        </li>
      </ul>
    </section>
    <section>
      <h2>Visualización Gráfica</h2>
      <v-network-graph
        class="network-graph"
        :nodes="graphNodes"
        :edges="graphEdges"
      />
    </section>
  </div>
</template>

<script>
import { Munkres } from "munkres-js";
import NetworkGraph from "v-network-graph";
import "v-network-graph/lib/style.css";

export default {
  data() {
    return {
      nodeName: "",
      nodeSide: "left",
      leftNodes: [],
      rightNodes: [],
      connections: [],
      nodeCounter: 1,
      connectionCounter: 1,
      selectedLeftNode: null,
      selectedRightNode: null,
      connectionWeight: null,
      assignmentResult: [],
    };
  },
  computed: {
    canAddConnection() {
      return (
        this.selectedLeftNode &&
        this.selectedRightNode &&
        this.connectionWeight &&
        this.connectionWeight > 0
      );
    },
    graphNodes() {
      const nodes = [
        ...this.leftNodes.map((node) => ({
          id: String(node.id),
          label: node.name,
        })),
        ...this.rightNodes.map((node) => ({
          id: String(node.id),
          label: node.name,
        })),
      ];
      console.log("Nodos para el gráfico:", nodes);
      return nodes;
    },

    graphEdges() {
      const edges = this.connections.map((conn) => ({
        from: String(conn.from),
        to: String(conn.to),
        label: String(conn.weight),
      }));
      console.log("Aristas para el gráfico:", edges);
      return edges;
    },
  },
  methods: {
    addNode() {
      if (!this.nodeName) return;
      let newNode = { id: this.nodeCounter++, name: this.nodeName };
      if (this.nodeSide === "left") {
        this.leftNodes = [...this.leftNodes, newNode];
      } else {
        this.rightNodes = [...this.rightNodes, newNode];
      }
      console.log("Nodo agregado:", newNode);
      console.log("Nodos de la izquierda:", this.leftNodes);
      console.log("Nodos de la derecha:", this.rightNodes);
      this.nodeName = "";
    },

    addConnection() {
      if (!this.canAddConnection) return;

      let newConnection = {
        id: this.connectionCounter++,
        from: this.selectedLeftNode,
        to: this.selectedRightNode,
        weight: parseFloat(this.connectionWeight),
      };
      this.connections = [...this.connections, newConnection];

      console.log("Conexión agregada:", newConnection);
      console.log("Conexiones totales:", this.connections);

      this.selectedLeftNode = null;
      this.selectedRightNode = null;
      this.connectionWeight = null;
    },

    getNodeName(id) {
      return [...this.leftNodes, ...this.rightNodes].find(
        (node) => node.id === id
      ).name;
    },

    generateCostMatrix() {
      let matrix = [];
      for (let leftNode of this.leftNodes) {
        let row = [];
        for (let rightNode of this.rightNodes) {
          let connection = this.connections.find(
            (conn) => conn.from === leftNode.id && conn.to === rightNode.id
          );
          row.push(connection ? connection.weight : Number.MAX_SAFE_INTEGER); // Usamos un valor grande para representar la falta de conexión
        }
        matrix.push(row);
      }
      return matrix;
    },

    solveAssignmentProblem() {
      let costMatrix = this.generateCostMatrix();
      console.log(costMatrix);
      let m = new Munkres();
      let indexes = m.compute(costMatrix);

      this.assignmentResult = indexes.map(([i, j]) => {
        return {
          from: this.leftNodes[i].id,
          to: this.rightNodes[j].id,
          weight: costMatrix[i][j],
        };
      });
    },
  },
};
</script>
<style scoped>
.network-graph {
  width: 100%;
  height: 500px;
}
</style>
