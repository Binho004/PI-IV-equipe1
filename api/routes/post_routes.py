from flask import Blueprint, request, jsonify
from models import Postagem, Usuario
from database import db
from datetime import datetime

post_bp = Blueprint('post_bp', __name__)

# --- ROTA GET: Pega todos os posts ---
@post_bp.route('/', methods=['GET'])
def get_posts():
    posts_db = Postagem.query.order_by(Postagem.id.desc()).all()
    
    posts_list = []
    for p in posts_db:
        autor_nome = p.autor.nome_usuario if p.autor else "Desconhecido"
        
        # Verifica se o post tem data, senão põe string vazia
        data_formatada = p.criado_em.strftime("%d/%m %H:%M") if p.criado_em else ""

        posts_list.append({
            'id': p.id,
            'username': autor_nome,
            'content': p.conteudo if p.conteudo else "Conteúdo indisponível", 
            'timestamp': data_formatada,
            'avatar': "", 
            'likes': p.curtidas, # Retorna o número físico salvo no banco
            'can_delete': True,
            # Cria uma lista com os nomes de quem curtiu para o JS saber se pinta de vermelho
            'liked_by': [u.nome_usuario for u in p.quem_curtiu] 
        })
        
    return jsonify(posts_list)

# --- ROTA POST: Cria novo post ---
@post_bp.route('/', methods=['POST'])
def create_post():
    data = request.get_json()
    
    content = data.get('content')
    username = data.get('username')

    if not content:
        return jsonify({'error': 'Conteúdo vazio'}), 400

    usuario = Usuario.query.filter_by(nome_usuario=username).first()
    
    # Se não achar usuário (teste), usa ID 1 ou cria sem dono (cuidado)
    if not usuario:
        # Tenta pegar o primeiro usuário do banco como fallback
        usuario = Usuario.query.first()
        if not usuario:
             return jsonify({'error': 'Nenhum usuário encontrado. Cadastre-se primeiro.'}), 400
    
    new_post = Postagem(
        conteudo=content, # Usa o nome correto da coluna do models.py
        usuario_id=usuario.id,
        curtidas=0 # Inicia com 0
    )
    
    db.session.add(new_post)
    db.session.commit()
    
    return jsonify({
        'id': new_post.id,
        'username': usuario.nome_usuario,
        'content': new_post.conteudo,
        'timestamp': 'Agora',
        'avatar': '',
        'likes': 0,
        'can_delete': True,
        'liked': False
    }), 201

# --- ROTA DELETE ---
@post_bp.route('/<int:post_id>', methods=['DELETE'])
def delete_post(post_id):
    post = Postagem.query.get(post_id)
    
    if not post:
        return jsonify({'error': 'Não encontrado'}), 404
    
    db.session.delete(post)
    db.session.commit()
    
    return '', 204

# --- ROTA CURTIR (CORRIGIDA) ---
@post_bp.route('/<int:post_id>/like', methods=['POST'])
def like_post(post_id):
    data = request.get_json()
    username = data.get('username')

    if not username:
        return jsonify({'error': 'Usuário não identificado'}), 400

    post = Postagem.query.get(post_id)
    usuario = Usuario.query.filter_by(nome_usuario=username).first()

    if not post or not usuario:
        return jsonify({'error': 'Erro ao processar'}), 404
    
    # CORREÇÃO 2: Atualizar o contador físico E a relação
    if usuario in post.quem_curtiu:
        post.quem_curtiu.remove(usuario) # Remove da lista de quem curtiu
        post.curtidas = max(0, post.curtidas - 1) # Diminui o número (evita negativo)
        action = 'unliked'
    else:
        post.quem_curtiu.append(usuario) # Adiciona na lista
        post.curtidas += 1 # Aumenta o número
        action = 'liked'

    db.session.commit()
    
    return jsonify({
        'likes': post.curtidas, # Retorna o novo número atualizado
        'action': action
    }), 200