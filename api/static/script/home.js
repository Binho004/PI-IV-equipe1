document.addEventListener('DOMContentLoaded', () => {
    const feed = document.querySelector('.feed');
    const postButton = document.querySelector('.btn-post');
    const postTextarea = document.querySelector('.criar-post textarea');
    
    // --- 1. SEGURANÇA E LOGIN ---
    const usuarioId = localStorage.getItem("usuario_id");
    const nomeUsuario = localStorage.getItem("nome_usuario");

    if (!usuarioId) {
        alert("Você precisa fazer login primeiro!");
        window.location.href = "/";    
        return; 
    }
    
    // Exibir nome do usuário na navbar
    const nomeDisplay = document.querySelector(".nome-usuario-display");
    if (nomeDisplay && nomeUsuario) {
        nomeDisplay.textContent = nomeUsuario;
    }

    // --- 2. TEMA (DARK MODE) ---
    const temaSalvo = localStorage.getItem("theme");
    if (temaSalvo === "dark") {
        document.body.classList.add("dark-mode");
    }

    const API_URL = '/api/posts'; 

    // --- 3. FUNÇÃO PARA CRIAR O HTML DO POST ---
    function createPostElement(postData) {
        const post = document.createElement('article');
        post.classList.add('postagem'); 
        post.setAttribute('data-id', postData.id); 

        // Lógica de Avatar: Se não tiver foto, gera iniciais
        const avatarSrc = postData.avatar && postData.avatar.trim() !== "" 
            ? postData.avatar 
            : `https://ui-avatars.com/api/?name=${postData.username}&background=random&color=fff&size=128`;

        // Verifica se EU curti esse post para pintar o coração
        const jaCurti = postData.liked_by && postData.liked_by.includes(nomeUsuario);

        post.innerHTML = `
            <div class="cabecalho-post">
                <img src="${avatarSrc}" alt="Foto" class="avatar">
                <div class="info-usuario">
                    <strong>${postData.username}</strong>
                    <span class="tempo">${postData.timestamp}</span>
                </div>
                ${postData.can_delete ? `<button class="btn-excluir" title="Excluir Post"><i class="fas fa-trash-alt"></i></button>` : ''}
            </div>
            <div class="conteudo-post">
                <p>${postData.content}</p>
            </div>
            <div class="acoes-post">
                <button class="btn-acao curtir ${jaCurti ? 'curtido' : ''}">
                    <i class="fas fa-heart"></i> ${postData.likes} Curtidas
                </button>
            </div>
        `;
        return post;
    }

    // --- 4. CARREGAR O FEED ---
    async function loadFeed() {
        try {
            const response = await fetch(API_URL);
            const posts = await response.json();
            
            // Limpa o feed mas mantém o título H2
            const title = feed.querySelector('h2');
            feed.innerHTML = ''; 
            if(title) feed.appendChild(title);

            posts.forEach(post => {
                feed.appendChild(createPostElement(post));
            });
        } catch (error) {
            console.error('Erro ao carregar feed:', error);
        }
    }

    // --- 5. BOTÃO POSTAR ---
    if (postButton) {
        postButton.addEventListener('click', async () => {
            const content = postTextarea.value.trim();
            const nomeUsuario = localStorage.getItem("nome_usuario") || "Anônimo"; 

            if (content.length > 0) {
                try {
                    const response = await fetch(API_URL, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 
                            content: content,
                            username: nomeUsuario 
                        })
                    });

                    if (response.ok) {
                        const newPost = await response.json();
                        postTextarea.value = ''; // Limpa caixa
                        
                        // Adiciona o novo post no topo
                        const newEl = createPostElement(newPost);
                        const title = feed.querySelector('h2');
                        if (title && title.nextSibling) {
                            feed.insertBefore(newEl, title.nextSibling);
                        } else {
                            feed.appendChild(newEl);
                        }
                    }
                } catch (error) {
                    console.error('Erro ao postar:', error);
                }
            } else {
                alert("Escreva algo antes de postar!");
            }
        });
    }

    // --- 6. CLIQUES NO FEED (EXCLUIR E CURTIR) ---
    if (feed) {
        feed.addEventListener('click', async (event) => {
            const deleteButton = event.target.closest('.btn-excluir');
            const likeButton = event.target.closest('.btn-acao.curtir');
            const post = event.target.closest('.postagem');
            
            if (!post) return;

            // Excluir
            if (deleteButton) {
                if (confirm('Excluir postagem?')) {
                    const postId = post.getAttribute('data-id');
                    try {
                        const res = await fetch(`${API_URL}/${postId}`, { method: 'DELETE' });
                        if (res.status === 204) post.remove();
                    } catch (e) { console.error(e); }
                }
            }
            
            // Curtir
            if (likeButton) {
                const postId = post.getAttribute('data-id');
                const nomeUsuario = localStorage.getItem("nome_usuario");

                try {
                    const res = await fetch(`${API_URL}/${postId}/like`, { 
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username: nomeUsuario }) 
                    });
                    
                    if (res.ok) {
                        const data = await res.json();
                        
                        if (data.action === 'liked') {
                            likeButton.classList.add('curtido');
                        } else {
                            likeButton.classList.remove('curtido');
                        }
                        likeButton.innerHTML = `<i class="fas fa-heart"></i> ${data.likes} Curtidas`;
                    }
                } catch (error) {
                    console.error("Erro ao curtir:", error);
                }
            }
        });
    }

    // Inicia carregando os posts
    loadFeed();
});

// --- FUNÇÕES GLOBAIS (FORA DO DOMContentLoaded) ---
function logout() {
    localStorage.clear(); 
    window.location.href = "/"; 
}

function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
}