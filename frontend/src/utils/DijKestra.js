export default class Dijkstra {
    constructor(graph) {
        this.graph = graph;
        this.V = graph.length;
    }

    dijkstraMin(source) {
        const dist = new Array(this.V).fill(Infinity);
        const visited = new Array(this.V).fill(false);

        dist[source] = 0;

        for (let count = 0; count < this.V - 1; count++) {
            const u = this.minDistance(dist, visited);
            visited[u] = true;

            for (let v = 0; v < this.V; v++) {
                if (!visited[v] && this.graph[u][v] !== undefined && dist[u] !== Infinity && dist[u] + this.graph[u][v] < dist[v]) {
                    dist[v] = dist[u] + this.graph[u][v];
                }
            }
        }

        return dist;
    }

    dijkstraMax(source) {
        const dist = new Array(this.V).fill(Number.NEGATIVE_INFINITY);
        const visited = new Array(this.V).fill(false);

        dist[source] = 0;

        for (let count = 0; count < this.V - 1; count++) {
            const u = this.maxDistance(dist, visited);
            visited[u] = true;

            for (let v = 0; v < this.V; v++) {
                if (!visited[v] && this.graph[u][v] !== undefined && dist[u] !== Number.NEGATIVE_INFINITY && dist[u] + this.graph[u][v] > dist[v]) {
                    dist[v] = dist[u] + this.graph[u][v];
                }
            }
        }

        return dist;
    }

    minDistance(dist, visited) {
        let min = Infinity;
        let minIndex = -1;

        for (let v = 0; v < this.V; v++) {
            if (!visited[v] && dist[v] <= min) {
                min = dist[v];
                minIndex = v;
            }
        }

        return minIndex;
    }

    maxDistance(dist, visited) {
        let max = Number.NEGATIVE_INFINITY;
        let maxIndex = -1;

        for (let v = 0; v < this.V; v++) {
            if (!visited[v] && dist[v] >= max) {
                max = dist[v];
                maxIndex = v;
            }
        }

        return maxIndex;
    }
}
