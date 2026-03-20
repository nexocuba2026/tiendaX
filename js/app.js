// Verificar sesión
const user = supabase.auth.getUser();
if (!user) {
  window.location.href = "login.html";
}
function toggleMenu(){
  document.getElementById("menu").classList.toggle("show");
}
