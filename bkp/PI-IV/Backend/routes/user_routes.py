from flask import Blueprint, request, jsonify
# Importa a função de segurança para criar o hash da senha
from werkzeug.security import generate_password_hash 
from models import Usuario
from database import db

user_bp = Blueprint("user", __name__)

@user_bp.route("/cadastro", methods=["POST"])
def cadastro():
    data = request.get_json()
    nome_usuario = data.get("nome_usuario")
    email = data.get("email")
    senha = data.get("senha")

    if not nome_usuario or not email or not senha:
        return jsonify({"message": "Dados obrigatórios faltando"}), 400

    if Usuario.query.filter_by(email=email).first():
        return jsonify({"message": "E-mail já cadastrado"}), 400

    # CRÍTICO: Armazena o HASH da senha, não a senha em texto puro
    senha_hash = generate_password_hash(senha) 
    
    novo_usuario = Usuario(nome_usuario=nome_usuario, email=email, senha=senha_hash)
    db.session.add(novo_usuario)
    db.session.commit()

    return jsonify({"message": "Cadastro realizado com sucesso!"}), 201