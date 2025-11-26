document.addEventListener('DOMContentLoaded', () => {
    const roomId = window.location.pathname.split('/').pop();
    const msgInput = document.getElementById('msg-input');
    const sendBtn = document.getElementById('btn-enviar');
    const chatBox = document.getElementById('chat-box');


    async function sendMessage() {
        const text = msgInput.value.trim();
        // Pega o nome salvo no login
        const nomeUsuario = localStorage.getItem("nome_usuario") || "Visitante"; 

        if (!text) return;

        try {
            await fetch(`/api/chat/${roomId}/messages`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ 
                    text: text,
                    user: nomeUsuario
                })
            });
            msgInput.value = ''; 
            loadMessages(); 
        } catch (error) {
            console.error('Erro ao enviar:', error);
        }
    }

    // Função para BUSCAR mensagens (Sem piscar)
    async function loadMessages() {
        try {
            const res = await fetch(`/api/chat/${roomId}/messages`);
            const messages = await res.json();

            // Truque: Só atualiza se o número de mensagens mudou
            // (Para evitar que o chat fique piscando ou rolando sozinho se não tem nada novo)
            if (messages.length === chatBox.children.length) {
                return; 
            }

            chatBox.innerHTML = ''; // Limpa

            messages.forEach(msg => {
                const div = document.createElement('div');
                div.className = 'msg-bubble';
                div.innerHTML = `<strong>${msg.user}:</strong> ${msg.text} <span style="font-size:0.7em; color:#888; float:right; margin-left:10px;">${msg.time}</span>`;
                chatBox.appendChild(div);
            });

            // Rola para baixo suavemente
            chatBox.scrollTop = chatBox.scrollHeight;
        } catch (error) {
            console.error('Erro ao carregar:', error);
        }
    }

    if (sendBtn) sendBtn.addEventListener('click', sendMessage);
    
    if (msgInput) {
        msgInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    setInterval(loadMessages, 2000);
    loadMessages();
});