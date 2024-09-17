# Cronograma de Desenvolvimento

Cronograma das principais etapas do desenvolvimento da plataforma de leitura e discussão de artigos.

## 1. Planejamento

| **Fase**                           | **Período**                        | **Descrição da atividade**                                                                                             |
|-------------------------------------|------------------------------------|-----------------------------------------------------------------------------------------------------------|
| **Autenticação e Configuração Inicial** | *08 de setembro - 20 de setembro de 2024* | - Finalizar sistema de registro e login<br>- Integrar banco de dados para usuários<br>- Configurar rotas de autenticação e criar páginas de login/cadastro no frontend |
| **CRUD de Artigos e Comentários**   | *20 de setembro - 13 de outubro de 2024* | - Implementar CRUD de artigos no backend<br>- Desenvolver interface de gerenciamento de artigos no frontend<br>- Sistema de comentários e anotações |
| **Discussões em Grupo**             | *14 de outubro - 27 de outubro de 2024* | - Implementar discussões síncronas (via WebSockets ou similar)<br>- Implementar discussões assíncronas (comentários)<br>- Criar interface de discussões |
| **Aprimoramento da Experiência do Usuário** | *28 de outubro - 10 de novembro de 2024* | - Melhorar UI/UX para facilitar a navegação e interação<br>- Implementar notificações<br>- Adicionar busca e filtragem de artigos<br>- Implementar controle de versão dos artigos |
| **Testes e Deploy**                 | *11 de novembro - 24 de novembro de 2024* | - Realizar testes de integração e unitários<br>- Verificar segurança (prevenção de ataques)<br>- Otimizar desempenho do frontend<br>- Configurar deploy do backend e frontend em produção |

## 2. Descrição das Fases

### Autenticação e Configuração Inicial (Semana 1-2)
**Período:** *08 de setembro - 20 de setembro de 2024*

- Finalizar sistema de registro e login utilizando JWT.
- Integrar banco de dados para armazenar usuários e artigos.
- Configurar rotas de autenticação e criar páginas de login/cadastro no frontend.

### CRUD de Artigos e Comentários (Semana 3-4)
**Período:** *20 de setembro - 13 de outubro de 2024*

- Implementar CRUD de artigos no backend (Node.js).
- Desenvolver a interface para criação, edição e visualização de artigos no frontend (Next.js).
- Implementar sistema de comentários e anotações para usuários.

### Discussões em Grupo (Semana 5-6)
**Período:** *14 de outubro - 27 de outubro de 2024*

- Implementar discussões síncronas (em tempo real) utilizando WebSockets ou outra solução.
- Criar funcionalidade de discussões assíncronas via comentários.
- Desenvolver interface para interações síncronas e assíncronas no frontend.

### Aprimoramento da Experiência do Usuário (Semana 7-8)
**Período:** *28 de outubro - 10 de novembro de 2024*

- Melhorar a interface do usuário para facilitar navegação e interação com os artigos.
- Implementar sistema de notificações para alertar sobre novos comentários ou discussões.
- Adicionar busca e filtragem de artigos.
- Implementar controle de versões ou histórico de edições de artigos.

### Testes e Deploy (Semana 9-10)
**Período:** *11 de novembro - 24 de novembro de 2024*

- Realizar testes de integração e unitários para garantir a estabilidade do sistema.
- Verificar a segurança do sistema contra ataques comuns (ex: injeção de SQL, manipulação de JWT).
- Otimizar o desempenho do frontend (caching, pré-renderização).
- Configurar o deploy do backend (Node.js) e frontend (Next.js) em ambiente de produção (ex: Vercel, Heroku, AWS).
