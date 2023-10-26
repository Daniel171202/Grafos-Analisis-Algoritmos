import express from "express";
import cors from "cors";

//import { getGrafos, createGrafo, updateGrafo } from "../controllers/grafos.js";

const router = express.Router();

router.use(cors());
/*
router.get("/grafos/:idUsuario", getGrafos);
router.post("/grafos", createGrafo);
router.put("/grafos/:idGrafo", updateGrafo);*/

export default router;
