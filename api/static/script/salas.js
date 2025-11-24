document.addEventListener('DOMContentLoaded', () => {
    const formCriar = document.getElementById('form-criar-sala');
    const selectType = document.getElementById('room-type');
    const listaSalas = document.getElementById('lista-salas');

    // 1. Lógica da Tela de CRIAR SALA
    if (selectType) {
        // Mostrar/Ocultar campo de senha
        selectType.addEventListener('change', () => {
            const passGroup = document.getElementById('password-group');
            if (selectType.value === 'private') {
                passGroup.style.display = 'block';
            } else {
                passGroup.style.display = 'none';
            }
        });
    }

    if (formCriar) {
        formCriar.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = document.getElementById('room-name').value;
            const objective = document.getElementById('room-objective').value;
            const type = document.getElementById('room-type').value;
            const password = document.getElementById('room-password').value;

            try {
                const res = await fetch('/api/rooms', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ name, objective, type, password })
                });

                if (res.ok) {
                    alert('Sala criada com sucesso!');
                    window.location.href = '/salas'; // Redireciona para a lista
                } else {
                    const err = await res.json();
                    alert('Erro: ' + err.error);
                }
            } catch (error) {
                console.error(error);
            }
        });
    }

    // 2. Lógica da Tela de LISTAR SALAS
    if (listaSalas) {
        loadRooms();
    }

    async function loadRooms() {
        try {
            const res = await fetch('/api/rooms');
            const rooms = await res.json();
            
            listaSalas.innerHTML = '';

            rooms.forEach(room => {
                const div = document.createElement('div');
                div.className = 'postagem'; // Reutilizando o estilo de card de post
                
                // Ícone muda se for pública ou privada
                const icon = room.type === 'private' ? '<i class="fas fa-lock" style="color: #ffc107;"></i>' : '<i class="fas fa-globe" style="color: #28a745;"></i>';
                const btnText = room.type === 'private' ? 'Entrar (Senha)' : 'Entrar na Sala';

                div.innerHTML = `
                    <div class="cabecalho-post">
                        <div class="info-usuario">
                            <strong style="font-size: 18px;">${icon} ${room.name}</strong>
                            <span class="tempo">Objetivo: ${room.objective}</span>
                        </div>
                    </div>
                    <div class="acoes-post" style="justify-content: flex-end;">
                        <button class="btn-post" onclick="tentarEntrar(${room.id}, '${room.type}')">${btnText}</button>
                    </div>
                `;
                listaSalas.appendChild(div);
            });
        } catch (error) {
            console.error(error);
        }
    }
});

// Função global para tentar entrar na sala
async function tentarEntrar(id, type) {
    let password = '';
    
    if (type === 'private') {
        password = prompt("Esta sala é privada. Digite a senha:");
        if (password === null) return; // Usuário cancelou
    }

    try {
        const res = await fetch('/api/rooms/join', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ room_id: id, password: password })
        });

        const data = await res.json();

        if (res.ok) {
            window.location.href = '/chat/' + id;
        } else {
            alert('Erro: ' + data.error);
        }
    } catch (error) {
        alert('Erro de conexão');
    }
}