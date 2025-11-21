from flask import Blueprint, jsonify
from models import Usuario

home_bp = Blueprint("home", __name__)

@home_bp.route("/home", methods=["GET"])
def home():
    return jsonify({"message": "Bem-vindo à página inicial do Mentor.io!"})

@home_bp.route("/perfil/<int:usuario_id>", methods=["GET"])
def perfil(usuario_id):
    usuario = Usuario.query.get(usuario_id)
    if not usuario:
        return jsonify({"message": "Usuário não encontrado"}), 404

    return jsonify({
        "id": usuario.id,
        "nome_usuario": usuario.nome_usuario,
        "email": usuario.email
    }), 200