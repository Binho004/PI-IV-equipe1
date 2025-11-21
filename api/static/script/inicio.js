function abrirCadastro() {
  document.getElementById('cadastro-barra').style.right = '0';
}

function fecharCadastro() {
  document.getElementById('cadastro-barra').style.right = '-100%';
}

// LOGIN
document.querySelector('.form-acesso form').addEventListener('submit', async (e) => {
  e.preventDefault();
  // const formData = new FormData(e.target);
  const email = document.getElementById("email_login").value.trim();
  const senha = document.getElementById("senha_login").value.trim();
  

  try {
    const res = await fetch('/login', {
      method: 'POST',
      body: JSON.stringify({ email, senha }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      window.location.href = '/home';
    }
  } catch (err) {
    alert('Erro ao conectar com a API');
  }
});

// CADASTRO
document.querySelector('#cadastro-barra form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome_usuario = document.getElementById("nome_usuario").value.trim();
  const email = document.getElementById("email_cadastro").value.trim();
  const senha = document.getElementById("senha_cadastro").value.trim();

  try {
    const res = await fetch('/cadastro', {
      method: 'POST',
      body: JSON.stringify({
        nome_usuario,
        email,
        senha
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      fecharCadastro();
      e.target.reset();
      window.location.href = '/home';
    }
  } catch (err) {
    alert('Erro ao conectar com a API');
  }
});