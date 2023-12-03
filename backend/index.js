import express from "express";
import bodyParser from "body-parser";
import Router from "./routes/routes.js";
import { spawn } from "child_process";

const app = express();
//const port = 8080;
const port = 8084;
//const ipAddress = "localhost";
const ipAddress = "192.168.81.10"
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(Router);
app.listen(port, ipAddress, () => {
  console.log(`Server running at http://${ipAddress}:${port}/`);
});

app.post("/optimizar_transporte", (req, res) => {
  // Convertir los datos de entrada a una cadena que Python pueda evaluar
  const dataString = JSON.stringify(req.body);

  const pythonProcess = spawn("python", ["transporte_optimizer.py"]);
  pythonProcess.stdin.write(dataString);
  pythonProcess.stdin.end();

  pythonProcess.stdout.on("data", (data) => {
    const result = JSON.parse(data);
    res.json(result);
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`Error en Python: ${data}`);
    res.status(500).send(`Error al ejecutar el script de Python: ${data}`);
  });
});

app.post("/optimizar_transporte_max", (req, res) => {
  // Convertir los datos de entrada a una cadena que Python pueda evaluar
  const dataString = JSON.stringify(req.body);

  const pythonProcess = spawn("python", ["transporte_optimizer_max.py"]);
  pythonProcess.stdin.write(dataString);
  pythonProcess.stdin.end();

  pythonProcess.stdout.on("data", (data) => {
    const result = JSON.parse(data);
    res.json(result);
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`Error en Python: ${data}`);
    res.status(500).send(`Error al ejecutar el script de Python: ${data}`);
  });
});
