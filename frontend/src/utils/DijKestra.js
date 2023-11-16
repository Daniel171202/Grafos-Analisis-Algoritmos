export default class Dijkstra {
    constructor(graph) {
        this.graph = graph;
        this.V = graph.length;
    }

    dijkstraMin(source) {
        const dist = new Array(this.V);
        const visited = new Array(this.V);
        for (let i = 0; i < this.V; i++) {
            dist[i] = Infinity;
            visited[i] = false;
        }

        dist[source] = 0;

        for (let count = 0; count < this.V - 1; count++) {
            const u = this.minDistance(dist, visited);
            visited[u] = true;

            for (let v = 0; v < this.V; v++) {
                if (!visited[v] && this.graph[u][v] && dist[u] !== Infinity && dist[u] + this.graph[u][v] < dist[v]) {
                    dist[v] = dist[u] + this.graph[u][v];
                }
            }
        }

        return dist;
    }

    dijkstraMax(source) {
        const dist = new Array(this.V);
        const visited = new Array(this.V);
        for (let i = 0; i < this.V; i++) {
            dist[i] = -Infinity; // Cambiado a -Infinity
            visited[i] = false;
        }
    
        dist[source] = 0;
    
        for (let count = 0; count < this.V - 1; count++) {
            const u = this.maxDistance(dist, visited);
            visited[u] = true;
    
            for (let v = 0; v < this.V; v++) {
                if (!visited[v] && this.graph[u][v] && dist[u] !== -Infinity && dist[u] + this.graph[u][v] > dist[v]) {
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
        let max = -Infinity;
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
