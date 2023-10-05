import { reactive } from "vue";

/*const nodes = reactive({
  node1: { name: "Node 1", size: 16, color: "gray" },
  node2: { name: "Node 2", size: 32, color: "hotpink", label: true },
  node3: { name: "Node 3", size: 24, color: "lightskyblue", label: true },
  node4: { name: "Node 4", size: 16, color: "gray" },
  node5: { name: "Node 5", size: 32, color: "hotpink", label: true },
});

const edges = reactive({
  edge1: { source: "node1", target: "node2", width: 1, color: "black" , label: "edge1",cost: 10},
  edge2: { source: "node2", target: "node3", width: 5, color: "gray", dashed: true },
  edge3: { source: "node3", target: "node4", width: 1, color: "black" },
  edge4: { source: "node3", target: "node4", width: 3, color: "skyblue" },
  edge5: { source: "node4", target: "node5", width: 3, color: "hotpink" },
  edge6: { source: "node4", target: "node5", width: 1, color: "black" },
  edge7: { source: "node4", target: "node5", width: 3, color: "skyblue" },
});

const layouts = {
  nodes: {
    node1: { x: 0, y: 0 },
    node2: { x: 80, y: 80 },
    node3: { x: 160, y: 0 },
    node4: { x: 240, y: 80 },
    node5: { x: 320, y: 0 },
  },
};*/

const nodes = reactive({});
const edges = reactive({});
const layouts = { nodes: {} };
const paths = reactive({});
export default {
  nodes,
  edges,
  layouts,
};
