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

  let categorias = {};

  productos.forEach(p => {
    if(!categorias[p.categoria]){
      categorias[p.categoria] = [];
    }
    categorias[p.categoria].push(p);
  });

  for(let cat in categorias){
    container.innerHTML += `<h2 id="${cat}">${cat}</h2>`;

    categorias[cat].forEach(p => {
      container.innerHTML += `
        <div class="tarjeta">
          <img src="${p.imagen}">
          <h3>${p.nombre}</h3>
          <p>${p.descripcion}</p>
          <strong>$${p.precio}</strong>
          <a class="boton-acento"
             href="https://wa.me/5355415537?text=Quiero comprar ${p.nombre}">
             Comprar
          </a>
        </div>
      `;
    });
  }
}

function generarCategorias(productos) {
  const menu = document.getElementById("menu-categorias");
  menu.innerHTML = "";

  const categorias = [...new Set(productos.map(p => p.categoria))];

  categorias.forEach(cat => {
    menu.innerHTML += `
      <li><a href="#${cat}" onclick="toggleMenu()">${cat}</a></li>
    `;
  });
}

cargarProductos();
