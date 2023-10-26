import express from "express";
import cors from "cors";

<<<<<<< Updated upstream
//import { getGrafos, createGrafo, updateGrafo } from "../controllers/grafos.js";

const router = express.Router();

router.use(cors());
/*
router.get("/grafos/:idUsuario", getGrafos);
router.post("/grafos", createGrafo);
router.put("/grafos/:idGrafo", updateGrafo);*/
=======
/**import { getGrafos, createGrafo, updateGrafo } from "../controllers/grafos.js";
 */
const router = express.Router();

router.use(cors());
/**router.get("/grafos/:idUsuario", getGrafos);
router.post("/grafos", createGrafo);
router.put("/grafos/:idGrafo", updateGrafo); */
>>>>>>> Stashed changes

export default router;
