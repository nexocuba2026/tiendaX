// js/admin.js

// Verificar sesión y rol admin
async function checkAdminSession() {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    window.location.href = "../login.html";
    return;
  }

  const { data: userData } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();

  if (userData.role !== 'admin') {
    alert("No tienes permisos de administrador");
    window.location.href = "../index.html";
  }
}

// Cargar productos para admin
async function loadAdminProducts() {
  const { data: products, error } = await supabase.from('products').select('*');

  if (error) {
    console.error("Error cargando productos:", error);
    return;
  }

  renderAdminProducts(products);
}

// Renderizar productos con botones de editar/eliminar
function renderAdminProducts(products) {
  const container = document.getElementById("adminProductContainer");
  container.innerHTML = "";

  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.image}">
      <div class="card-content">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <p class="price">$${p.price}</p>
        <p>Categoria: ${p.category}</p>
        <button onclick="editProduct('${p.id}')">Editar</button>
        <button onclick="deleteProduct('${p.id}')">Eliminar</button>
      </div>
    `;
    container.appendChild(card);
  });
}

// Agregar producto
async function addProduct() {
  const product = {
    name: document.getElementById("name").value,
    description: document.getElementById("desc").value,
    price: Number(document.getElementById("price").value),
    category: document.getElementById("category").value,
    image: document.getElementById("image").value,
    whatsapp: document.getElementById("whatsapp").value || "5355415537"
  };

  const { data, error } = await supabase.from('products').insert([product]);

  if (error) {
    alert("Error agregando producto: " + error.message);
    return;
  }

  alert("Producto agregado");
  loadAdminProducts();
}

// Editar producto
function editProduct(id) {
  const name = prompt("Nuevo nombre del producto:");
  const description = prompt("Nueva descripción:");
  const price = prompt("Nuevo precio:");
  const category = prompt("Nueva categoría:");
  const image = prompt("Nueva URL de imagen:");

  updateProduct(id, { name, description, price: Number(price), category, image });
}

// Actualizar producto en Supabase
async function updateProduct(id, updatedFields) {
  const { error } = await supabase.from('products').update(updatedFields).eq('id', id);
  if (error) {
    alert("Error al actualizar: " + error.message);
    return;
  }
  alert("Producto actualizado");
  loadAdminProducts();
}

// Eliminar producto
async function deleteProduct(id) {
  if (!confirm("¿Seguro que deseas eliminar este producto?")) return;

  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) {
    alert("Error al eliminar: " + error.message);
    return;
  }

  alert("Producto eliminado");
  loadAdminProducts();
}

// Inicialización
checkAdminSession();
loadAdminProducts();

