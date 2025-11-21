from database import db

class Usuario(db.Model):
    __tablename__ = 'usuarios'
    id = db.Column(db.Integer, primary_key=True)
    nome_usuario = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    # A senha agora armazenará o HASH criptografado
    senha = db.Column(db.String(256), nullable=False) 
    # Adicionando relacionamento para postagens
    postagens = db.relationship('Postagem', backref='autor', lazy=True) 

    def __repr__(self):
        return f"<Usuario {self.nome_usuario}>"

class Postagem(db.Model):
    __tablename__ = 'postagens'
    id = db.Column(db.Integer, primary_key=True)
    conteudo = db.Column(db.Text, nullable=False)
    curtidas = db.Column(db.Integer, default=0)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)
    
    def __repr__(self):
        return f"<Postagem {self.id}>"

class Mensagem(db.Model):
    __tablename__ = 'mensagens'
    id = db.Column(db.Integer, primary_key=True)
    conteudo = db.Column(db.Text, nullable=False)
    sala_id = db.Column(db.Integer, nullable=False)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)
    
    def __repr__(self):
        return f"<Mensagem {self.id}>"