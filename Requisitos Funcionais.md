# Requisitos Funcionais

### Os requisitos funcionais descrevem as funcionalidades que o sistema deve executar. Eles são organizados por tela para maior clareza.

Os requisitos funcionais descrevem as funcionalidades que o sistema deve executar. Eles são organizados por tela para maior clareza.

### 1.1.1 Tela de Login e Cadastro

RF01 – Login de Usuário:* O sistema deve permitir que o usuário faça login usando seu e-mail e senha.  
RF02 – Verificação de Cadastro:* O sistema deve verificar se as credenciais fornecidas correspondem a uma conta existente no banco de dados.  
RF03 – Criação de Conta (Cadastro): O sistema deve permitir a criação de uma nova conta, solicitando nome de usuário, e-mail, senha e a confirmação da senha.  
RF04 – Fechar Tela de Cadastro:* O sistema deve permitir que o usuário feche a tela de cadastro.

### 1.1.2 Tela Principal (Home)

RF05 – Interação com Postagens: O usuário deve ser capaz de compartilhar, repostar, responder e curtir postagens.  
RF06 – Criação de Salas:* O usuário deve poder criar salas abertas (públicas) ou fechadas (privadas).  
RF07 – Gerenciamento de Conteúdo:* O usuário deve poder excluir postagens que ele tenha criado.

### 1.1.3 Perfil do Usuário e Configurações

RF08 – Edição de Perfil:* O usuário deve poder alterar as seguintes informações em seu perfil:  
  * Imagem de perfil.  
  * Nome de usuário.  
  * E-mail.  
  * Senha.  
RF09 – Exclusão de Conta:* O sistema deve permitir que o usuário exclua sua própria conta.

### 1.1.4 Chat e Mensagens

RF10 – Envio de Mensagens: O usuário deve poder enviar mensagens no chat aberto.  
RF11 – Envio de Convites:* O usuário deve poder enviar convites para salas fechadas.

### 1.1.5 Busca e Navegação*

RF12 – Ferramenta de Busca:* O usuário deve poder buscar por nome de perfil ou por palavras.  
*RF13 – Menu de Navegação:* O sistema deve conter um botão de menu que retorne à tela inicial (Home).

### *2\. CASOS DE USO*

Os casos de uso detalham como os atores (usuários) interagem com o sistema para executar as funcionalidades.

#### *2.1 Caso de Uso: Realizar Login*

* *Ator:* Usuário.  
* *Objetivo:* Acessar o sistema com uma conta existente.  
* *Pré-condições:* O usuário já possui uma conta cadastrada.  
* *Fluxo Principal:*  
  1. O usuário acessa a tela de login.  
  2. Insere seu e-mail e senha.  
  3. Clica no botão "Entrar".  
  4. O sistema verifica as credenciais no banco de dados.  
  5. O sistema autentica o usuário e o redireciona para a tela principal (Home).

#### *2.2 Caso de Uso: Criar Conta (Cadastro)*

* *Ator:* Usuário.  
* *Objetivo:* Criar uma nova conta no sistema.  
* *Pré-condições:* O usuário não possui uma conta existente.  
* *Fluxo Principal:*  
  1. O usuário acessa a tela de login.  
  2. Clica no botão para iniciar o cadastro.  
  3. O sistema exibe a tela de cadastro.  
  4. O usuário preenche os campos obrigatórios (nome, e-mail, senha e confirmação de senha).  
  5. Clica no botão "Cadastrar".  
  6. O sistema salva as informações no banco de dados e cria a nova conta.  
  7. O usuário é notificado sobre a criação da conta.

#### *2.3 Caso de Uso: Editar Perfil*

* *Ator:* Usuário Autenticado.  
* *Objetivo:* Atualizar informações do seu perfil.  
* *Pré-condições:* O usuário deve estar logado no sistema.  
* *Fluxo Principal:*  
  1. O usuário navega até a seção de edição de perfil.  
  2. Altera as informações desejadas (imagem de perfil, nome de usuário, e-mail, senha).  
  3. Salva as alterações.  
  4. O sistema atualiza as informações no banco de dados.

### *3\. REQUISITOS NÃO FUNCIONAIS*

Os requisitos não funcionais descrevem as qualidades e restrições do sistema.

* *RNF01 – Usabilidade e Responsividade:* O sistema deve ser responsivo, adaptando-se a diferentes dispositivos (desktop, tablet, celular). A interface deve ser intuitiva, baseada em redes sociais conhecidas.  
* *RNF02 – Desempenho:* O sistema deve suportar um mínimo de 10.000 usuários simultâneos. O tempo médio de resposta para operações comuns deve ser inferior a 2 segundos.  
* *RNF03 – Segurança:* O sistema deve criptografar senhas com um algoritmo seguro, como o bcrypt.  
* *RNF04 – Armazenamento:* Os dados devem ser armazenados em um banco de dados relacional, como o PostgreSQL.


