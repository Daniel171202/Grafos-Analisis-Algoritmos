class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

export default class BinaryTree {
    constructor() {
        this.root = null;
        this.elements = new Set();
        this.nodes = {};
        this.edges = {};
        this.layouts = { nodes: {} };
    }

    insert(value) {
        let newNode = new TreeNode(value);
        value = parseInt(value);
        if (this.root === null) {
            this.root = newNode;
        } else {
            let currentNode = this.root;
            let positionFounded = false;
            while (!positionFounded) {
                if (value < currentNode.value) {
                    //left
                    if (!currentNode.left) {
                        currentNode.left = newNode;
                        positionFounded = true;
                    }
                    currentNode = currentNode.left;
                } else {
                    //right
                    if (!currentNode.right) {
                        currentNode.right = newNode;
                        positionFounded = true;
                    }
                    currentNode = currentNode.right;
                }
            }
        }

        this.elements.add(value);
        this.updateGraphData();
    }


    updateGraphData() {
        this.nodes = {};
        this.edges = {};
        this.layouts.nodes = {}; // Inicializa el objeto de layouts

        let nodeIndex = 1;
        let edgeIndex = 1;

        // Función para calcular la posición de los nodos en el árbol
        function calculateNodePositions(node, x, y, horizontalGap, verticalGap) {
            if (node) {
                const nodeName = `node${nodeIndex}`;
                this.nodes[nodeName] = { name: node.value };

                // Calcula la posición en el objeto de layouts
                this.layouts.nodes[nodeName] = { x, y };

                if (node.left) {
                    const edgeName = `edge${edgeIndex}`;
                    this.edges[edgeName] = { source: nodeName, target: `node${nodeIndex + 1}` };
                    edgeIndex++;
                    nodeIndex++;

                    // Calcula las coordenadas para el nodo izquierdo
                    const leftX = x - horizontalGap;
                    const leftY = y + verticalGap;

                    calculateNodePositions.call(this, node.left, leftX, leftY, horizontalGap / 2, verticalGap);
                }

                if (node.right) {
                    const edgeName = `edge${edgeIndex}`;
                    this.edges[edgeName] = { source: nodeName, target: `node${nodeIndex + 1}` };
                    edgeIndex++;
                    nodeIndex++;

                    // Calcula las coordenadas para el nodo derecho
                    const rightX = x + horizontalGap;
                    const rightY = y + verticalGap;

                    calculateNodePositions.call(this, node.right, rightX, rightY, horizontalGap / 2, verticalGap);
                }
            }
        }

        calculateNodePositions.call(this, this.root, 0, -250, 200, 100); // Ajusta los valores de horizontalGap y verticalGap según tus necesidades

    }

    InOrder() {
        let result = [];
        function traverseInOrder(node) {
            if (node.left) traverseInOrder(node.left);
            result.push(node.value);
            if (node.right) traverseInOrder(node.right);
        }
        traverseInOrder(this.root);
        return result;
    }

    PreOrder() {
        let result = [];
        function traversePreOrder(node) {
            result.push(node.value);
            if (node.left) traversePreOrder(node.left);
            if (node.right) traversePreOrder(node.right);
        }
        traversePreOrder(this.root);
        return result;
    }

    PostOrder() {
        let result = [];
        function traversePostOrder(node) {
            if (node.left) traversePostOrder(node.left);
            if (node.right) traversePostOrder(node.right);
            result.push(node.value);
        }
        traversePostOrder(this.root);
        return result;
    }

    FromInOrderAndPreOrder(inOrder, preOrder) {
        this.root = this.buildTree(inOrder, preOrder);
        this.updateGraphData();
    }

    buildTree(inOrder, preOrder) {
        if (inOrder.length === 0) return null;

        const root = new TreeNode(preOrder[0]);
        const mid = inOrder.indexOf(preOrder[0]);

        root.left = this.buildTree(inOrder.slice(0, mid), preOrder.slice(1, mid + 1));
        root.right = this.buildTree(inOrder.slice(mid + 1), preOrder.slice(mid + 1));

        return root;
    }


    deleteNode(value) {
        this.root = this.removeNode(this.root, value);
        this.updateGraphData();
        this.updateElements();
    }

    removeNode(node, value) {
        if (node === null) {
            return null;
        }

        if (value < node.value) {
            node.left = this.removeNode(node.left, value);
        } else if (value > node.value) {
            node.right = this.removeNode(node.right, value);
        } else {
            // Nodo encontrado, procedemos a eliminarlo
            if (node.left === null && node.right === null) {
                // Caso 1: Nodo hoja
                node = null;
            } else if (node.left === null) {
                // Caso 2: Nodo con un hijo derecho
                node = node.right;
            } else if (node.right === null) {
                // Caso 2: Nodo con un hijo izquierdo
                node = node.left;
            } else {
                // Caso 3: Nodo con dos hijos
                const minValue = this.findMinValue(node.right);
                node.value = minValue;
                node.right = this.removeNode(node.right, minValue);
            }
        }

        return node;
    }

    // Función para actualizar la lista de elementos
    updateElements() {
        this.elements.clear(); // Limpiar el conjunto actual
        this.traverseTreeToAddElements(this.root);
    }

    // Función recursiva para recorrer el árbol y agregar elementos al conjunto
    traverseTreeToAddElements(node) {
        if (node) {
            this.elements.add(node.value);
            this.traverseTreeToAddElements(node.left);
            this.traverseTreeToAddElements(node.right);
        }
    }

    findMinValue(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node.value;
    }

    reset(){
        this.root = null;
        this.elements = new Set();
        this.nodes = {};
        this.edges = {};
        this.layouts = { nodes: {} };
    }

    getUniqueElements() {
        return Array.from(this.elements);
    }


    toString() {
        return JSON.stringify(this.root);
    }

}