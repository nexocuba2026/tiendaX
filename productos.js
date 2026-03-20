async function cargarProductos() {
  const { data, error } = await supabase
    .from('productos')
    .select('*');

  mostrarProductos(data);
  generarCategorias(data);
}

function mostrarProductos(productos) {
  const container = document.getElementById("productos-container");
  container.innerHTML = "";

  productos.forEach(p => {
    container.innerHTML += `
      <div class="tarjeta categoria-${p.categoria}">
        <img src="${p.imagen}" width="100%">
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        <strong>$${p.precio}</strong>
        <br><br>
        <a class="boton-acento"
           href="https://wa.me/5355415537?text=Quiero comprar ${p.nombre}">
           Comprar
        </a>
      </div>
    `;
  });
}

function generarCategorias(productos) {
  const menu = document.getElementById("menu-categorias");
  const categorias = [...new Set(productos.map(p => p.categoria))];

  categorias.forEach(cat => {
    menu.innerHTML += `
      <li><a href="#${cat}">${cat}</a></li>
    `;
  });
}

cargarProductos();
