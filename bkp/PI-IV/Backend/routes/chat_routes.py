from flask import Blueprint, jsonify

chat_bp = Blueprint("chat", __name__)

@chat_bp.route("/chat", methods=["GET"])
def chat():
    return jsonify({"message": "Chat do Mentor.io em construção."})