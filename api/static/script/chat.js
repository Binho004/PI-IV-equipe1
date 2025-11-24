document.addEventListener('DOMContentLoaded', () => {
    // Pega o ID da sala da URL 
    const roomId = window.location.pathname.split('/').pop();
    
    const msgInput = document.getElementById('msg-input');
    const sendBtn = document.getElementById('btn-enviar');
    const chatBox = document.getElementById('chat-box');

    // 1. Função para ENVIAR mensagem
    async function sendMessage() {
        const text = msgInput.value.trim();
        if (!text) return;

        try {
            await fetch(`/api/chat/${roomId}/messages`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ text: text })
            });
            
            msgInput.value = ''; // Limpa o campo
            loadMessages(); // Atualiza a tela imediatamente
        } catch (error) {
            console.error('Erro ao enviar:', error);
        }
    }

    // 2. Função para BUSCAR mensagens (Atualizar tela)
    async function loadMessages() {
        try {
            const res = await fetch(`/api/chat/${roomId}/messages`);
            const messages = await res.json();

            chatBox.innerHTML = ''; 

            messages.forEach(msg => {
                const div = document.createElement('div');
                div.className = 'msg-bubble';
                div.innerHTML = `<strong>${msg.user}:</strong> ${msg.text}`;
                chatBox.appendChild(div);
            });

            // Rola para baixo para ver a última mensagem
            chatBox.scrollTop = chatBox.scrollHeight;
        } catch (error) {
            console.error('Erro ao carregar:', error);
        }
    }

    // Eventos de Clique e Enter
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }
    
    if (msgInput) {
        msgInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    // 3. "Polling": Atualiza as mensagens a cada 2 segundos automaticamente
    setInterval(loadMessages, 2000);
    
    // Carrega a primeira vez ao abrir
    loadMessages();
});