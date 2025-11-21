from flask import Blueprint, request, jsonify
# Importa as funções de segurança do Werkzeug
from werkzeug.security import check_password_hash 
from models import Usuario

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    senha = data.get("senha")

    if not email or not senha:
        return jsonify({"message": "Email e senha são obrigatórios"}), 400

    usuario = Usuario.query.filter_by(email=email).first()

    # CRÍTICO: Compara a senha fornecida com o hash armazenado
    if not usuario or not check_password_hash(usuario.senha, senha):
        return jsonify({"message": "Credenciais inválidas"}), 401

    return jsonify({
        "message": "Login realizado com sucesso!",
        "id": usuario.id,
        "nome_usuario": usuario.nome_usuario
    }), 200