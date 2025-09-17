const http = require("http");
const fs = require("fs");
const path = require("path");

let conceptos = [];
let idCounter = 1;

const server = http.createServer((req, res) => {
  // Configuración CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // Servir index.html
  if (req.url === "/" && req.method === "GET") {
    const filePath = path.join(__dirname, "../frontend/index.html");
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end("Error cargando index.html");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
    return;
  }
  

  // Servir style.css
  if (req.url === "/style.css" && req.method === "GET") {
    const filePath = path.join(__dirname, "../frontend/style.css");
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("No encontrado");
      } else {
        res.writeHead(200, { "Content-Type": "text/css" });
        res.end(data);
      }
    });
    return;
  }

  // Servir script.js
  if (req.url === "/script.js" && req.method === "GET") {
    const filePath = path.join(__dirname, "../frontend/script.js");
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("No encontrado");
      } else {
        res.writeHead(200, { "Content-Type": "application/javascript" });
        res.end(data);
      }
    });
    return;
  }

  // API REST
  if (req.url === "/conceptos" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(conceptos));
  }
  else if (req.url === "/conceptos" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => { body += chunk; });
    req.on("end", () => {
      const { nombre, descripcion } = JSON.parse(body);
      conceptos.push({ id: idCounter++, nombre, descripcion });
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ mensaje: "Concepto agregado" }));
    });
  }
  else if (req.url.match(/^\/conceptos\/\d+$/) && req.method === "GET") {
    const id = parseInt(req.url.split("/")[2]);
    const concepto = conceptos.find(c => c.id === id);
    if (concepto) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(concepto));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "No encontrado" }));
    }
  }
  else if (req.url === "/conceptos" && req.method === "DELETE") {
    conceptos = [];
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ mensaje: "Todos los conceptos eliminados" }));
  }
  else if (req.url.match(/^\/conceptos\/\d+$/) && req.method === "DELETE") {
    const id = parseInt(req.url.split("/")[2]);
    const antes = conceptos.length;
    conceptos = conceptos.filter(c => c.id !== id);
    if (conceptos.length < antes) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ mensaje: `Concepto con id=${id} eliminado` }));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "No encontrado" }));
    }
  }
  else {
    res.writeHead(404);
    res.end("Ruta no encontrada");
  }
});

server.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});

