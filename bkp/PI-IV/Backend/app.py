from flask import Flask
from flask_cors import CORS
from database import db
from routes.auth_routes import auth_bp
from routes.user_routes import user_bp
from routes.home_routes import home_bp
from routes.chat_routes import chat_bp
from routes.post_routes import post_bp
from routes.search_routes import search_bp

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://127.0.0.1:5501"}})
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mentor.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
CORS(app, resources={r"/*": {"origins": "http://127.0.0.1:5500"}})

app.register_blueprint(auth_bp)
app.register_blueprint(user_bp)
app.register_blueprint(home_bp)
app.register_blueprint(chat_bp)
app.register_blueprint(post_bp)
app.register_blueprint(search_bp)

@app.route("/")
def index():
    return "Servidor Mentor.io está rodando com sucesso!"

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(port=5001, debug=True)