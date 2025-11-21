from flask import Blueprint, request, jsonify
from models import Postagem, Usuario
from database import db

post_bp = Blueprint("post", __name__)

@post_bp.route("/postar", methods=["POST"])
def postar():
    data = request.get_json()
    conteudo = data.get("conteudo")
    usuario_id = data.get("usuario_id")

    if not conteudo or not usuario_id:
        return jsonify({"message": "Conteúdo e usuário são obrigatórios"}), 400

    usuario = Usuario.query.get(usuario_id)
    if not usuario:
        return jsonify({"message": "Usuário não encontrado"}), 404

    nova_postagem = Postagem(conteudo=conteudo, usuario_id=usuario_id)
    db.session.add(nova_postagem)
    db.session.commit()

    return jsonify({"message": "Postagem criada com sucesso!"}), 201