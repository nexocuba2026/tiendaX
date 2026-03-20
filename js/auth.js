// js/auth.js

async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    alert("Error al iniciar sesión: " + error.message);
    return;
  }

  // Obtener rol desde la tabla users
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('role')
    .eq('id', data.user.id)
    .single();

  if (userError) {
    alert("Error al obtener rol: " + userError.message);
    return;
  }

  if (userData.role === 'admin') {
    window.location.href = 'admin.html';
  } else {
    window.location.href = 'index.html';
  }
}

// Logout
async function logout() {
  await supabase.auth.signOut();
  window.location.href = "login.html";
}
