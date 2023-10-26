<<<<<<< Updated upstream
/*import db from "../config/database.js";
=======
/**import {
  getGrafosModel,
  createGrafoModel,
  updateGrafoModel,
} from "../models/grafosModel.js";
>>>>>>> Stashed changes

export const getGrafos = (req, res) => {
  getGrafosModel(req.params.idUsuario, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Ocurrio un error al obtener los grafos",
      });
    } else {
      res.send(data);
    }
  });
};

export const createGrafo = (req, res) => {
  createGrafoModel(req.body, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Ocurrio un error al crear el grafo",
      });
    } else {
      res.send(data);
    }
  });
};
<<<<<<< Updated upstream
*/
=======

export const updateGrafo = (req, res) => {
  updateGrafoModel(req.params.idGrafo, req.body, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Ocurrio un error al actualizar el grafo",
      });
    } else {
      res.send(data);
    }
  });
};
 */
>>>>>>> Stashed changes
