// js/app.js

// Verificar sesión y rol
async function checkUserSession() {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const { data: userData } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();

  // Solo usuarios normales pueden usar esta página
  if (userData.role === 'admin') {
    console.log("Admin navegando la tienda");
    // opcional: redirigir a admin.html
    // window.location.href = "admin.html";
  }
}

// Cargar productos desde Supabase
async function loadProducts(category = 'all') {
  let query = supabase.from('products').select('*');

  if (category !== 'all') {
    query = query.eq('category', category);
  }

  const { data: products, error } = await query;

  if (error) {
    console.error("Error cargando productos:", error);
    return;
  }

  renderProducts(products);
}

// Renderizar productos en HTML
function renderProducts(products) {
  const container = document.getElementById("productContainer");
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
        <button onclick="buyProduct('${p.name}', '${p.whatsapp}')">Comprar por WhatsApp</button>
      </div>
    `;
    container.appendChild(card);
  });
}

// Comprar por WhatsApp
function buyProduct(name, phone) {
  const message = `Hola, quiero comprar: ${name}`;
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// Filtrar por categoría
document.getElementById("categoryFilter").addEventListener("change", e => {
  loadProducts(e.target.value);
});

// Inicialización
checkUserSession();
loadProducts();
