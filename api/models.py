from database import db
from datetime import datetime, timedelta # <--- ADICIONADO: timedelta

# Tabela de associação
tabela_curtidas = db.Table('curtidas_assoc',
    db.Column('usuario_id', db.Integer, db.ForeignKey('usuarios.id'), primary_key=True),
    db.Column('postagem_id', db.Integer, db.ForeignKey('postagens.id'), primary_key=True)
)

class Usuario(db.Model):
    __tablename__ = 'usuarios'
    id = db.Column(db.Integer, primary_key=True)
    nome_usuario = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    senha = db.Column(db.String(256), nullable=False)
    postagens = db.relationship('Postagem', backref='autor', lazy=True)

    def __repr__(self):
        return f"<Usuario {self.nome_usuario}>"

class Postagem(db.Model):
    __tablename__ = 'postagens'
    id = db.Column(db.Integer, primary_key=True)
    conteudo = db.Column(db.Text, nullable=False)
    imagem_url = db.Column(db.String(500), nullable=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)
    criado_em = db.Column(db.DateTime, default=datetime.utcnow)
    
    curtidas = db.Column(db.Integer, default=0)

    quem_curtiu = db.relationship('Usuario', secondary=tabela_curtidas, lazy='subquery',
        backref=db.backref('posts_curtidos', lazy=True))

    @property
    def total_curtidas(self):
        return self.curtidas
    
    def __repr__(self):
        return f"<Postagem {self.id}>"

class Mensagem(db.Model):
    __tablename__ = 'mensagens'
    id = db.Column(db.Integer, primary_key=True)
    room_id = db.Column(db.Integer, nullable=False)
    user = db.Column(db.String(100), nullable=False)
    text = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        # --- CORREÇÃO DE HORÁRIO ---
        # Pega o horário salvo (UTC) e diminui 3 horas para ficar horário do Brasil
        horario_brasil = self.timestamp - timedelta(hours=3)
        
        return {
            'id': self.id,
            'room_id': self.room_id,
            'user': self.user,
            'text': self.text,
            'time': horario_brasil.strftime('%H:%M') # Usa o horário ajustado
        }