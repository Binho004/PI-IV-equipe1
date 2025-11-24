import os
from flask import Flask, send_from_directory, render_template
from flask_cors import CORS
from werkzeug.middleware.proxy_fix import ProxyFix
from database import db
from routes.auth_routes import auth_bp
from routes.user_routes import user_bp
from routes.home_routes import home_bp
from routes.chat_routes import chat_bp
from routes.post_routes import post_bp
from routes.search_routes import search_bp


app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)

default_sqlite = 'sqlite:///mentor.db'

database_url = os.environ.get('DATABASE_URL')

if not database_url:
    user = os.environ.get('DATABASE_USER') or os.environ.get('DB_USER', 'root')
    password = os.environ.get('DATABASE_PASSWORD') or os.environ.get('DB_PASS', 'password')
    host = os.environ.get('DATABASE_HOST') or os.environ.get('DB_HOST', '127.0.0.1')
    port = os.environ.get('DATABASE_PORT') or os.environ.get('DB_PORT', '3306')
    name = os.environ.get('DATABASE_NAME') or os.environ.get('DB_NAME', 'mentor')
    
    database_url = f'mysql+pymysql://{user}:{password}@{host}:{port}/{name}'

app.config['SQLALCHEMY_DATABASE_URI'] = database_url or default_sqlite
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
    with app.app_context():
        db.create_all()
    app.run(port=5001, debug=True)