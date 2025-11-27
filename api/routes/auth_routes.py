from flask import Blueprint, request, jsonify
from flask_login import login_user, logout_user, login_required, current_user
from models import Usuario
from database import db

auth_bp = Blueprint('auth_bp', __name__)

# --- ROTA DE CADASTRO (ESSENCIAL PARA CRIAR O USUÁRIO) ---
@auth_bp.route('/cadastro', methods=['POST'])
def register():
    data = request.get_json()
    nome = data.get('nome_usuario')
    email = data.get('email')
    senha = data.get('senha')

    if not nome or not email or not senha:
        return jsonify({"message": "Preencha todos os campos"}), 400

    # Verifica se já existe
    if Usuario.query.filter_by(email=email).first():
        return jsonify({"message": "E-mail já cadastrado"}), 400

    novo_usuario = Usuario(nome_usuario=nome, email=email, senha=senha)
    
    db.session.add(novo_usuario)
    db.session.commit()

    return jsonify({"message": "Cadastro realizado com sucesso!"}), 201

# --- ROTA DE LOGIN (COM SESSÃO) ---
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    senha = data.get('senha')

    # Busca usuário no banco
    usuario = Usuario.query.filter_by(email=email).first()

    # Verifica se usuário existe e a senha bate
    if usuario and usuario.senha == senha:
        
        # CRIA O COOKIE DE SESSÃO (LOGIN REAL)
        login_user(usuario) 
        
        return jsonify({
            "message": "Login realizado com sucesso!",
            "id": usuario.id,
            "nome_usuario": usuario.nome_usuario
        }), 200
    
    return jsonify({"message": "E-mail ou senha inválidos"}), 401

# --- ROTA DE LOGOUT ---
@auth_bp.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user() # Destrói a sessão
    return jsonify({"message": "Logout realizado"}), 200

# --- VERIFICAÇÃO DE SESSÃO ---
@auth_bp.route('/api/check_session', methods=['GET'])
def check_session():
    if current_user.is_authenticated:
        return jsonify({'is_logged_in': True, 'user': current_user.nome_usuario}), 200
    else:
        return jsonify({'is_logged_in': False}), 401