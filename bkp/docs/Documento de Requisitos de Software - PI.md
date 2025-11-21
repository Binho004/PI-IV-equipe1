**Projeto Integrador V**

Documento de Requisitos

**Aplicativo de Lista de Tarefas**

**Janeiro / 2025**

**Sumário**

[***1. INTRODUÇÃO 3***](#_gjdgxs)

[***2. REQUISITOS 3***](#_30j0zll)

> [**2.1 REQUISITOS FUNCIONAIS 3**](#_1fob9te)
>
> [**2.1 Requisitos Não Funcionais 4**](#_tyjcwt)

[***3 PRIORIZAÇÃO 4***](#_3dy6vkm)

***4*** [***CASOS DE USO 4***](#_3dy6vkm)

**Responsáveis técnicos**

Fulano de Tal

Ciclano da Silva

...

|                                    |            |                                                                           |
|------------------------------------|------------|---------------------------------------------------------------------------|
| **NOMES**                          | **VERSÃO** | **DESCRIÇÃO**                                                             |
| Fulano de Tal and Ciclano da Silva | **v0.1.0** | Nesta versão, foram definidos os principais requisitos funcionais.        |
| Fulano de Tal                      | **v0.1.1** | Foram adicionados requisitos não funcionais que não estavam contemplados. |

**Documento de Requisitos de Software**

[]{#_gjdgxs .anchor}

**1. INTRODUÇÃO**

Este documento estabelece os requisitos para o desenvolvimento de um
aplicativo de lista de tarefas. O aplicativo permitirá que os usuários
adicionem, gerenciem e acompanhem suas tarefas diárias de forma
eficiente e intuitiva.

**1.1 Objetivo**

O objetivo do aplicativo de lista de tarefas é oferecer uma ferramenta
simples e eficaz para ajudar os usuários a organizar suas atividades
diárias, aumentando a produtividade e reduzindo o esquecimento de
compromissos importantes.

**1.2 Escopo**

O aplicativo incluirá funcionalidades básicas de gerenciamento de
tarefas, como adicionar, editar, marcar como concluída e remover
tarefas. Ele será acessível via dispositivos móveis e desktops,
garantindo uma experiência de usuário consistente e responsiva.

**3. REQUISITOS**

Requisitos são ações ou estados que o software deve executar ou ter,
possuindo características e condições próprias, para automatizar uma
tarefa de um processo de negócio, sempre levando em consideração o
escopo de atuação da aplicação e seus *stakeholders*.

**3.1 REQUISITOS FUNCIONAIS**

**3.1.1 Tela de Login e Cadastro**

- **RF01**: **Login de Usuário:**

  - O sistema deve permitir que o usuário faça login usando seu e-mail e
    senha.

- **RF02**: **Verificação de Cadastro:**

  - O sistema deve verificar se as credenciais fornecidas correspondem a
    uma conta existente no banco de dados.

- **RF03**: **Criação de Conta(Cadastro):**

  - O sistema deve permitir a criação de uma nova conta, solicitando
    nome de usuário, e-mail, senha e a confirmação da senha.

- **RF04**: **Fechar Tela de Cadastro:**

  - O sistema deve permitir que o usuário feche a tela de cadastro.

**3.1.2 Tela Principal (Home)**

- **RF05**: **Interação com Postagens:**

  - O usuário deve ser capaz de compartilhar, repostar, responder e
    curtir postagens.

- **RF06**: **Criação de Salas:**

  - O usuário deve poder criar salas abertas (públicas) ou fechadas
    (privadas).

- **RF07**: **Gerenciamento de Conteúdo:**

  - O usuário deve poder excluir postagens que ele tenha criado.

**3.1.3 Perfil do Usuário e Configurações**

- **RF08**: **Edição de perfil**:

  - O usuário deve poder alterar as seguintes informações em seu perfil:

  - Imagem de perfil.

  - Nome de usuário.

  - E-mail.

  - Senha.

- **RF09**: **Exclusão de conta**

  - O sistema deve permitir que o usuário exclua sua própria conta.

**3.1.4 Chat e Mensagens**

- **RF10**: **Envio de Mensagens**:

  - O usuário deve poder enviar mensagens no chat aberto.

- **RF11**: **Envio de Convites**:

  - O usuário deve poder enviar convites para salas fechadas.

**3.1.5 Busca e Navegação**

- **RF12**: **Edição de perfil**:

  - O usuário deve poder buscar por nome de perfil ou por palavras.

- **RF13**: **Menu de Navegação**:

  - O sistema deve conter um botão de menu que retorne à tela inicial
    (Home).

**3.1 Requisitos Não Funcionais**

- **RNF01**: **Usabilidade e Responsividade:**

  - O sistema deve ser responsivo, adaptando-se a diferentes
    dispositivos (desktop, tablet, celular). A interface deve ser
    intuitiva, baseada em redes sociais conhecidas.

- **RNF02**: **Armazenamento**

  - Os dados devem ser armazenados em um banco de dados relacional, como
    o PostgreSQL.

- **RNF03**: **Desempenho**

  - O sistema deve suportar um mínimo de 10.000 usuários simultâneos. O
    tempo médio de resposta para operações comuns deve ser inferior a 2
    segundos.

- **RNF04**: **Segurança**

  - O sistema deve criptografar senhas com um algoritmo seguro, como o
    bcrypt.

**3 Priorização**

- **Imprescindível**: As funcionalidades essenciais para o lançamento
  incluem a criação, visualização e gerenciamento de tarefas (RF01,
  RF02, RF03, RF05) e a responsividade em diferentes dispositivos
  (RNF01).

- **Desejável**: A sincronização de tarefas entre dispositivos (RNF02) é
  importante, mas pode ser desenvolvida após o lançamento inicial.

- **Poderia Ter:** A funcionalidade de excluir tarefas (RF04) é útil,
  mas não crítica para o funcionamento inicial do aplicativo.

- **Não Terá**: Funcionalidades como colaboração em tarefas, integração
  com outros serviços e notificações avançadas não serão consideradas na
  versão inicial.

**4 CASOS DE USO**

### 4.1 Gerenciar Tarefas {#gerenciar-tarefas}

### 4.1.1 Realizar Login {#realizar-login}

- **Ator Principal**: Usuário

- **Objetivo**: Acessar o sistema com uma conta existente.

- **Pré-condições**: O usuário já possui uma conta cadastrada.

- **Fluxo Principal**:

  1.  O usuário acessa a tela de login.

  2.  Insere seu e-mail e senha.

  3.  Clica no botão \"Entrar\".

  4.  O sistema verifica as credenciais no banco de dados.

  5.  O sistema autentica o usuário e o redireciona para a tela
      principal (Home).

- **Fluxo Alternativo**: N/A

### 4.1.2 Criar Conta(Cadastro) {#criar-contacadastro}

- **Ator Principal**: Usuário

- **Objetivo**: Criar uma nova conta no sistema.

- **Pré-condições**: O usuário não possui uma conta existente.

- **Fluxo Principal**:

  1.  O usuário acessa a tela de login.

  2.  Clica no botão para iniciar o cadastro.

  3.  O sistema exibe a tela de cadastro.

  4.  O usuário preenche os campos obrigatórios (nome, e-mail, senha e
      confirmação de senha).

  5.  Clica no botão "Cadastrar"

  6.  O sistema salva as informações no banco de dados e cria a nova
      conta.

  7.  O usuário é notificado sobre a criação da conta

- **Fluxo Alternativo**: N/A

### 4.1.3 Editar Perfil {#editar-perfil}

- **Ator Principal**: Usuário autenticado

- **Objetivo**: Atualizar informações do seu perfil.

- **Pré-condições**: O usuário deve estar logado no sistema.

- **Fluxo Principal**:

  1.  O usuário navega até a seção de edição de perfil.

  2.  Altera as informações desejadas (Imagem de perfil, nome de
      usuário, e-mail, senha).

  3.  Salva as alterações.

  4.  O sistema atualiza as informações no banco de dados.

- **Fluxo Alternativo**: N/A
