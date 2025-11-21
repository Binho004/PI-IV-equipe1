document.addEventListener('DOMContentLoaded', () => {
    const feed = document.querySelector('.feed');

    if (feed) {
        feed.addEventListener('click', (event) => {
            const button = event.target.closest('.action-btn, .btn-delete');

            if (!button) return; 

            const post = button.closest('.post');
            if (!post) return;

            if (button.classList.contains('action-btn')) {
                const actionType = button.classList[1]; 

                switch (actionType) {
                    case 'like':
                       
                        button.classList.toggle('liked');

                        let currentLikes = parseInt(button.textContent.match(/\d+/) || 0);
                        
                        if (button.classList.contains('liked')) {
                            
                            currentLikes++;
                            button.innerHTML = `<i class="fas fa-heart"></i> ${currentLikes} Curtidas`;
                            console.log('Post curtido!');
                        } else {
                            
                            currentLikes = Math.max(0, currentLikes - 1);
                            button.innerHTML = `<i class="fas fa-heart"></i> Curtir`;
                            
                            if (currentLikes > 0) {
                                button.innerHTML = `<i class="fas fa-heart"></i> ${currentLikes} Curtidas`;
                            }
                            console.log('Curtida removida.');
                        }
                        break;

                    case 'comment':
                        alert(`Respondendo ao post: "${post.querySelector('p').textContent.substring(0, 30)}..."`);
                        break;

                    case 'repost':
                        alert('Postagem repostada com sucesso!');
                        break;

                    case 'share':
                        alert('Abrindo modal de compartilhamento...');
                        break;
                }
            } 
            
            else if (button.classList.contains('btn-delete')) {
                const isConfirmed = confirm('Tem certeza que deseja excluir esta postagem? Esta ação não pode ser desfeita.');
                
                if (isConfirmed) {
                    // Remove o elemento postagem 
                    post.remove();
                    console.log('Postagem excluída com sucesso!');
                }
            }
        });
    }

    const btnPublic = document.querySelector('.btn-room.public');
    const btnPrivate = document.querySelector('.btn-room.private');

    if (btnPublic) {
        btnPublic.addEventListener('click', () => {
            alert('Aguardando Back-end: Abrindo formulário para criar uma Sala Pública...');
        });
    }

    if (btnPrivate) {
        btnPrivate.addEventListener('click', () => {
            alert('Aguardando Back-end: Abrindo formulário para criar uma Sala Privada (com convites)...');
        });
    }

    const postButton = document.querySelector('.btn-post');
    const postTextarea = document.querySelector('.create-post textarea');

    if (postButton) {
        postButton.addEventListener('click', () => {
            const content = postTextarea.value.trim();

            if (content.length > 0) {
                alert(`Postando: "${content.substring(0, 50)}..."\n(Esta postagem será visível após recarregar a página na versão real)`);
                postTextarea.value = '';
            } else {
                alert('O conteúdo da postagem não pode estar vazio.');
            }
        });
    }
});