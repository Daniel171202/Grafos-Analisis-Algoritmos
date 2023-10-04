import db from "../config/database.js";

// Get all grafos
export const getGrafosModel = (idUsuario, result) => {
    db.query("SELECT * FROM grafos WHERE Usuarios_idUsuario = ?", [idUsuario], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        // Iterate through the result and parse JSON properties
        const parsedRes = res.map((row) => {
            const parsedNodes = parseJSON(row.nodes);
            const parsedEdges = parseJSON(row.edges);
            const parsedLayouts = parseJSON(row.layouts);

            return {
                ...row,
                nodes: parsedNodes,
                edges: parsedEdges,
                layouts: parsedLayouts,
            };
        });

        console.log("Grafos: ", parsedRes);
        result(null, parsedRes);
    });
}

function parseJSON(jsonString) {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        return null; // Handle invalid JSON
    }
}



// Create a new grafo
export const createGrafoModel = (grafo, result) => {
    // Stringify the JSON properties before inserting them into the database
    const grafoToInsert = {
        ...grafo,
        nodes: JSON.stringify(grafo.nodes),
        edges: JSON.stringify(grafo.edges),
        layouts: JSON.stringify(grafo.layouts),
    };

    db.query("INSERT INTO grafos SET ?", grafoToInsert, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Grafo creado: ", { id: res.insertId, ...grafo });
        result(null, { id: res.insertId, ...grafo });
    });
}


// Update a grafo by id

export const updateGrafoModel = (idGrafo, grafo, result) => {
    const grafoToInsert = {
        ...grafo,
        nodes: JSON.stringify(grafo.nodes),
        edges: JSON.stringify(grafo.edges),
        layouts: JSON.stringify(grafo.layouts),
    };
    //delete grafoToInsert.name;

    db.query("UPDATE grafos SET ? WHERE idGrafo = ?", [grafoToInsert,idGrafo], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;

        }
        if (res.affectedRows == 0) {
            // No se encontro el grafo con el id especificado
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Grafo actualizado: ", { idGrafo: idGrafo, ...grafo });
        result(null, { idGrafo: idGrafo, ...grafo });
    });
}