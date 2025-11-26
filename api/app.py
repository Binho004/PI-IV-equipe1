import os
from flask import Flask, render_template
from flask_cors import CORS
from database import db
from routes.auth_routes import auth_bp
from routes.user_routes import user_bp
from routes.home_routes import home_bp
from routes.chat_routes import chat_bp
from routes.post_routes import post_bp
from routes.search_routes import search_bp

app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)


db_uri = 'sqlite:///mentor.db'

env_db_url = os.environ.get('DATABASE_URL')
env_db_host = os.environ.get('DB_HOST')

if env_db_url:
    db_uri = env_db_url
elif env_db_host:
    user = os.environ.get('DB_USER', 'root')
    password = os.environ.get('DB_PASS', 'password')
    port = os.environ.get('DB_PORT', '3306')
    name = os.environ.get('DB_NAME', 'mentor')
    
    db_uri = f'mysql+pymysql://{user}:{password}@{env_db_host}:{port}/{name}'
    print(f"Ambiente Docker detectado. Usando MySQL em: {env_db_host}")

app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

try:
    from models import Usuario, Postagem, Mensagem
except Exception as e:
    print(f"Aviso ao importar modelos: {e}")

with app.app_context():
    db.create_all()

app.register_blueprint(auth_bp)
app.register_blueprint(user_bp)
app.register_blueprint(home_bp)
app.register_blueprint(chat_bp)
app.register_blueprint(post_bp, url_prefix='/api/posts')
app.register_blueprint(search_bp)

@app.route('/')
def serve_index():
    return render_template('index.html')

@app.route('/home')
def serve_home():
    return render_template('home.html')

if __name__ == "__main__":
    app.run(port=5001, debug=True)