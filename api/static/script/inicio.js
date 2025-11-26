// Funções visuais (Abrir/Fechar cadastro)
function abrirCadastro() {
    const barra = document.getElementById('cadastro-barra');
    barra.classList.add('ativo');
}

function fecharCadastro() {
    const barra = document.getElementById('cadastro-barra');
    barra.classList.remove('ativo');
}

document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DE LOGIN ---
    const loginForm = document.getElementById("loginForm");
    
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.getElementById("email").value.trim();
            const senha = document.getElementById("senha").value.trim();

            if (!email || !senha) {
                alert("Preencha todos os campos de login.");
                return;
            }

            try {
                // Usa rota relativa (funciona local e online)
                const response = await fetch('/login', { 
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, senha }),
                });

                const data = await response.json();
                
                if (response.ok) {
                    localStorage.setItem("usuario_id", data.id);
                    localStorage.setItem("nome_usuario", data.nome_usuario);
                    
                    window.location.href = "/home"; 
                } else {
                    alert(data.message || "Erro ao fazer login");
                }
            } catch (error) {
                console.error("Erro de conexão:", error);
                alert("Erro ao conectar com o servidor.");
            }
        });
    }

    // --- LÓGICA DE CADASTRO ---
    const cadastroForm = document.getElementById("cadastroForm");

    if (cadastroForm) {
        cadastroForm.addEventListener("submit", async (e) => {
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
                const response = await fetch('/cadastro', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nome_usuario, email, senha }),
                });

                const data = await response.json();
                
                if (response.ok) {
                    alert("Cadastro realizado com sucesso!");
                    cadastroForm.reset();
                    fecharCadastro();
                } else {
                    alert(data.message || "Erro ao cadastrar");
                }
            } catch (error) {
                console.error("Erro de conexão:", error);
                alert("Erro ao conectar com o servidor.");
            }
        });
    }
});