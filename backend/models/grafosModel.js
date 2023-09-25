import db from "../config/database.js";

// Get all grafos
export const getGrafosModel = (idUsuario, result) => {
    db.query("SELECT * FROM grafos WHERE Usuarios_idUsuario = ?", [idUsuario], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Grafos: ", res);
        result(null, res);
    });
}

// Create a new grafo

export const createGrafoModel = (grafo, result) => {
    db.query("INSERT INTO grafos SET ?", grafo, (err, res) => {
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
    db.query("UPDATE grafos SET nombre = ?, nodes = ?  ,edges = ?, layouts = ? ,WHERE idGrafo = ?", [grafo.nombre, grafo.descripcion, idGrafo], (err, res) => {
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