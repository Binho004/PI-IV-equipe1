const BASE_URL = "http://127.0.0.1:5001"; 

function abrirCadastro() {
  document.getElementById("cadastro-barra").classList.add("ativo");
}

function fecharCadastro() {
  document.getElementById("cadastro-barra").classList.remove("ativo"); 
}
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  if (!email || !senha) {
    alert("Preencha todos os campos de login.");
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("usuario_id", data.id);
      localStorage.setItem("nome_usuario", data.nome_usuario);
      window.location.href = "home.html";
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Erro de conexão:", error); 
    alert("Erro ao conectar com o servidor.");
  }
});

document.getElementById("cadastroForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome_usuario = document.getElementById("nome_usuario").value.trim();
  const email = document.getElementById("email_cadastro").value.trim();
  const senha = document.getElementById("senha_cadastro").value.trim();
  const confirmar_senha = document.getElementById("confirmar-senha").value.trim();

  if (!nome_usuario || !email || !senha || !confirmar_senha) {
    alert("Preencha todos os campos de cadastro.");
    return;
  }

  if (senha !== confirmar_senha) {
    alert("As senhas não coincidem!");
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/cadastro`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome_usuario, email, senha }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Cadastro realizado com sucesso!");
      document.getElementById("cadastroForm").reset();
      fecharCadastro();
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Erro de conexão:", error); 
    alert("Erro ao conectar com o servidor.");
  }
});

fetch(`${BASE_URL}/`)
  .then(res => res.text())
  .then(data => console.log("Backend ativo:", data))
  .catch(err => {
    alert("Servidor offline. Por favor, inicie o backend antes de usar o sistema.");
  });

