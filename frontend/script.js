const form = document.getElementById("conceptForm");
const lista = document.getElementById("listaConceptos");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const descripcion = document.getElementById("descripcion").value;

  await fetch("http://localhost:3000/conceptos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, descripcion })
  });

  cargarConceptos();
  form.reset();
});

async function cargarConceptos() {
  const res = await fetch("http://localhost:3000/conceptos");
  const conceptos = await res.json();

  lista.innerHTML = "";
  conceptos.forEach((c, i) => {
    const li = document.createElement("li");
    li.textContent = `${i + 1}. ${c.nombre}: ${c.descripcion}`;
    lista.appendChild(li);
  });
}

cargarConceptos();
