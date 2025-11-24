from flask import Blueprint, request, jsonify, render_template

chat_bp = Blueprint('chat_bp', __name__)

ROOMS = [
    {
        'id': 1,
        'name': 'Matemática Básica',
        'type': 'public',
        'password': '',
        'objective': 'Revisão de soma, subtração e tabuada',
        'created_by': 'Admin'
    },
    {
        'id': 2,
        'name': 'Física Quântica Avançada',
        'type': 'private',
        'password': '123',
        'objective': 'Discutir a teoria das cordas',
        'created_by': 'Sheldon'
    }
]
next_room_id = 3

# --- ROTAS DE TELA (HTML) ---

# Tela de Visualizar Salas (Acessada pelo menu "Salas")
@chat_bp.route('/salas')
def list_rooms_page():
    return render_template('salas.html')

# Tela de Criar Sala (Acessada pelos botões da Home)
@chat_bp.route('/salas/criar')
def create_room_page():
    return render_template('criar_sala.html')


@chat_bp.route('/api/rooms', methods=['GET'])
def get_rooms():
    return jsonify(ROOMS)

# Cria uma nova sala
@chat_bp.route('/api/rooms', methods=['POST'])
def create_room():
    global next_room_id
    global ROOMS
    
    data = request.get_json()
    
    name = data.get('name')
    room_type = data.get('type') # 'public' ou 'private'
    password = data.get('password', '')
    objective = data.get('objective')

    if not name or not objective:
        return jsonify({'error': 'Nome e Objetivo são obrigatórios'}), 400

    # Se for privada, exige senha
    if room_type == 'private' and not password:
        return jsonify({'error': 'Salas privadas precisam de senha'}), 400

    new_room = {
        'id': next_room_id,
        'name': name,
        'type': room_type,
        'password': password,
        'objective': objective,
        'created_by': 'Usuário Logado'
    }
    
    ROOMS.insert(0, new_room)
    next_room_id += 1
    return jsonify(new_room), 201


@chat_bp.route('/api/rooms/join', methods=['POST'])
def join_room():
    data = request.get_json()
    room_id = int(data.get('room_id'))
    password_attempt = data.get('password')

    # Procura a sala
    room = next((r for r in ROOMS if r['id'] == room_id), None)
    
    if not room:
        return jsonify({'error': 'Sala não encontrada'}), 404

    if room['type'] == 'private':
        if room['password'] != password_attempt:
            return jsonify({'success': False, 'error': 'Senha incorreta!'}), 401
    
    return jsonify({'success': True, 'message': 'Entrou na sala!'}), 200

@chat_bp.route('/chat/<int:room_id>')
def chat_page(room_id):
    # Busca as informações da sala para mostrar o nome no topo
    room = next((r for r in ROOMS if r['id'] == room_id), None)
    
    if not room:
        return "Sala não encontrada", 404
        
    return render_template('chat.html', room=room)

# --- SISTEMA DE MENSAGENS ---

MESSAGES = [] 

#Enviar mensagem
@chat_bp.route('/api/chat/<int:room_id>/messages', methods=['POST'])
def send_message(room_id):
    data = request.get_json()
    text = data.get('text')
    
    if not text:
        return jsonify({'error': 'Mensagem vazia'}), 400

    new_msg = {
        'room_id': room_id,
        'user': 'Usuário Anônimo', # Futuramente pegamos do login
        'text': text,
        'time': 'Agora' # Futuramente usamos datetime
    }
    
    MESSAGES.append(new_msg)
    return jsonify(new_msg), 201

# API: Ler mensagens da sala
@chat_bp.route('/api/chat/<int:room_id>/messages', methods=['GET'])
def get_messages(room_id):
    # Filtra apenas as mensagens DESSA sala específica
    room_msgs = [m for m in MESSAGES if m['room_id'] == room_id]
    return jsonify(room_msgs)