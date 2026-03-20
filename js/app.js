// Verificar sesión y rol
async function checkUserSession() {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    window.location.href = "login.html"; // No hay sesión
    return;
  }

  const { data: userData } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();

  if (userData.role === 'admin') {
    // Si un admin entra a index, puede quedarse o redirigir a admin.html
    console.log("Admin navegando tienda");
  }
}

checkUserSession();
