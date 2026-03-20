async function agregarProducto() {
  const nombre = document.getElementById("nombre").value;
  const descripcion = document.getElementById("descripcion").value;
  const precio = document.getElementById("precio").value;
  const imagen = document.getElementById("imagen").value;
  const categoria = document.getElementById("categoria").value;

  await supabase.from('productos').insert([
    { nombre, descripcion, precio, imagen, categoria }
  ]);

  alert("Producto agregado");
  cargarLista();
}

async function cargarLista() {
  const { data } = await supabase.from('productos').select('*');

  const container = document.getElementById("lista-productos");
  container.innerHTML = "";

  data.forEach(p => {
    container.innerHTML += `
      <div>
        ${p.nombre} - $${p.precio}
        <button onclick="eliminar(${p.id})">Eliminar</button>
      </div>
    `;
  });
}

async function eliminar(id) {
  await supabase.from('productos').delete().eq('id', id);
  cargarLista();
}

cargarLista();
