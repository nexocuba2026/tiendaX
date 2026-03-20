async function agregarProducto() {
  const nombre = document.getElementById("nombre").value;
  const precio = document.getElementById("precio").value;
  const imagen = document.getElementById("imagen").value;
  const categoria = document.getElementById("categoria").value;

  await supabase.from('productos').insert([
    { nombre, precio, imagen, categoria }
  ]);

  alert("Producto agregado");
}
