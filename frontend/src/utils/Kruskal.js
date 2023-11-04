export default class Kruskal {
    constructor(graph) {
        this.graph = graph;
        this.V = graph.length;
        this.parent = new Array(this.V);

        for (let i = 0; i < this.V; i++) {
            this.parent[i] = i;
        }
    }

    find(i) {
        if (this.parent[i] === i) {
            return i;
        }
        return this.find(this.parent[i]);
    }

    union(i, j) {
        const a = this.find(i);
        const b = this.find(j);

        if (a !== b) {
            this.parent[a] = b;
        }
    }

    kruskalMST() {
        const result = [];
        this.graph.sort((a, b) => a[2] - b[2]);

        let edgeIndex = 0;

        while (result.length < this.V - 1) {
            if (edgeIndex >= this.graph.length) {
                break;  // Evitar un desbordamiento si no hay suficientes aristas
            }

            const [u, v, w] = this.graph[edgeIndex];
            edgeIndex++;

            const a = this.find(u);
            const b = this.find(v);

            if (a !== b) {
                result.push([u, v, w]);
                this.union(a, b);
            }
        }

        return result;
    }
}