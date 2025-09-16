# Trabajo Práctico N°1 – Taller de Programación 2
**Alumno:** Catalina Guitelman  
**Materia:** Taller de Programación 2  
**Profesor:** Franco Borsani  
**Entrega:** 16/09/2025  

---

## Objetivo
Desarrollar una aplicación básica con Node.js como backend, utilizando los conceptos vistos en clase: manejo de GIT, DOM, Node.js, API REST y VSC.

---

## Funcionalidades
- Ingreso de conceptos con nombre y descripción desde un formulario.
- Visualización de conceptos en la interfaz.
- API REST con las siguientes rutas:
  - `GET /conceptos`: obtiene todos los conceptos.
  - `GET /conceptos/:id`: obtiene un concepto por ID.
  - `POST /conceptos`: agrega un concepto.
  - `DELETE /conceptos`: elimina todos los conceptos.
  - `DELETE /conceptos/:id`: elimina un concepto específico.

---

## Estructura del proyecto
TallerTP1/
│
├── frontend/
│ ├── index.html
│ ├── style.css
│ └── script.js
│
├── backend/
│ └── server.js
│
└── README.md


---

## Cómo ejecutar
1. Instalar Node.js.  
2. Entrar en la carpeta `backend` y correr:
   ```bash
   node server.js


## Caso 1 – Agregar concepto

Acción: Completar formulario con "Clase abstracta" y descripción.
Resultado esperado: Aparece en la lista.


## Caso 2 – Ver todos

Acción: Hacer GET /conceptos en navegador o Postman.
Resultado esperado: JSON con todos los conceptos.


## Caso 3 – Eliminar un concepto

Acción: DELETE /conceptos/1
Resultado esperado: Elimina el concepto con id=1.

## Conclusiones

Aprendizaje: Pude entender cómo funciona un backend sin librerías externas, manejando rutas manualmente.
Dificultad: El manejo del CORS y el parsing del body fueron complicados al principio, pero se resolvieron leyendo la documentación y probando casos.