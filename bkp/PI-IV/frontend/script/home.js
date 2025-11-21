const BASE_URL = "http://127.0.0.1:5001";

window.onload = async () => {
  const usuario_id = localStorage.getItem("usuario_id");
  const nome_usuario = localStorage.getItem("nome_usuario");

  if (!usuario_id || !nome_usuario) {
    alert("Usuário não autenticado.");
    window.location.href = "index.html";
    return;
  }

  console.log(`Usuário logado: ${nome_usuario}`);
};

function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}

function mostrarPerfil() {
  document.getElementById("perfil").classList.toggle("hidden");
}