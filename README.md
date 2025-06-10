# Prog.avan-ada-ADS5sBN

Atividade avaliativa SpringBoot
PROJETO: APLICAÇÃO WEB COM AUTENTICAÇÃO E NÍVEIS DE ACESSO (ADMIN/USER)
========================================================================

Este projeto implementa uma solução web completa e segura para cadastro e autenticação de usuários, utilizando um sistema de controle de acesso baseado em papéis (roles). A aplicação distingue usuários comuns (USER) de administradores (ADMIN), onde administradores possuem permissões elevadas para gerenciamento de dados.

## FUNCIONALIDADES

- Cadastro de Usuários: Permite que novos usuários se registrem com nome, e-mail e senha.
- Sistema de Login: Autenticação segura que gera uma sessão baseada em JWT (gerenciado automaticamente pelo Supabase).
- Controle de Acesso por Papel (Role):
  - No momento do cadastro, é possível definir o papel do usuário como USER ou ADMIN.
  - A interface se adapta, mostrando funcionalidades exclusivas para administradores.
- Gerenciamento de Perfis:
  - Usuário Comum (USER): Pode visualizar e editar apenas o seu próprio perfil.
  - Administrador (ADMIN): Tem permissão para visualizar, editar e deletar o perfil de qualquer usuário.
- Segurança Robusta: As permissões não são controladas apenas no frontend, mas impostas diretamente no banco de dados através de políticas de segurança a nível de linha (Row-Level Security).

## TECNOLOGIAS UTILIZADAS

- Supabase: Plataforma de Backend como Serviço (BaaS) que forneceu a infraestrutura completa.
  - PostgreSQL: Banco de dados relacional para armazenar os perfis e papéis dos usuários.
  - Auth: Sistema de autenticação integrado que gerencia usuários, senhas e sessões JWT.
  - Instant APIs: Geração automática de uma API RESTful segura sobre o banco de dados.
  - RLS: Row-Level Security para criar regras de acesso granulares diretamente no banco.
- JavaScript (ES6+): Utilizado no frontend para interatividade, manipulação do DOM e comunicação com a API do Supabase.
- HTML5 & CSS3: Estrutura e estilização da interface do usuário.
- Git & GitHub: Para versionamento do código e gerenciamento do projeto.

## ACESSO E DEMONSTRAÇÃO

A aplicação foi desenvolvida para ser executada diretamente no navegador, conectando-se à infraestrutura na nuvem.

- Link da Aplicação: [INSIRA AQUI O LINK DO SEU SITE ESTÁTICO PUBLICADO NO RENDER OU GITHUB PAGES]
- Repositório: [INSIRA AQUI O LINK DO SEU REPOSITÓRIO NO GITHUB]

Para testar as funcionalidades, siga os passos:

1. Cadastre um usuário com a role USER.
2. Faça logout e cadastre um segundo usuário com a role ADMIN.
3. Faça login com cada um deles e observe as funcionalidades disponíveis para cada perfil, especialmente na área de gerenciamento de usuários.

## ARQUITETURA E PROCESSO DE DESENVOLVIMENTO

A concepção deste projeto foi guiada pela busca de uma arquitetura moderna, segura e eficiente.

1. Decisão Arquitetural: Adoção do Supabase (BaaS)
   Inicialmente, considerei uma abordagem tradicional com um backend customizado (ex: Node.js/Express). No entanto, optei por utilizar o Supabase como plataforma de Backend as a Service. Essa decisão estratégica me permitiu focar na lógica de negócio e na segurança, abstraindo a complexidade de gerenciar um servidor, gerar e validar tokens JWT manualmente e escrever a lógica de conexão com o banco de dados.

2. Modelagem dos Dados no PostgreSQL
   A autenticação do Supabase cria automaticamente uma tabela auth.users. Para adicionar nosso campo customizado "role", a melhor prática foi criar uma tabela public.profiles separada. Esta tabela possui uma relação de um-para-um com auth.users, referenciando o id do usuário.

Para automatizar a criação de perfis, implementei uma função e um trigger no PostgreSQL. Assim, sempre que um novo usuário se cadastra no sistema de autenticação, um perfil correspondente é criado automaticamente na tabela profiles, garantindo a integridade dos dados.

3. Implementação da Lógica de Negócio e Segurança
   O pilar da segurança deste projeto é o Row-Level Security (RLS) do PostgreSQL, habilitado e configurado no Supabase. Em vez de verificar permissões no código do servidor (que não temos), as regras foram escritas diretamente no banco de dados:

- Criei políticas que garantem que um usuário só pode selecionar e atualizar a linha (row) correspondente ao seu próprio id.
- Para os administradores, criei políticas mais permissivas, que os autorizam a selecionar, atualizar e deletar qualquer linha na tabela profiles. Isso foi feito com o auxílio de uma função SQL customizada (get_user_role()) que verifica o papel do usuário autenticado antes de permitir a operação.

4. Desenvolvimento do Frontend
   O frontend foi construído com HTML, CSS e JavaScript puros para ser leve e demonstrar a interação direta com a API do Supabase. Utilizei a biblioteca cliente supabase-js, que simplifica as chamadas de autenticação e as operações de banco de dados (CRUD), respeitando automaticamente as políticas de RLS definidas no backend. A interface é dinâmica e se adapta com base no papel do usuário logado, escondendo ou mostrando os painéis de funcionalidades.

## SEGURANÇA E CONTROLE DE ACESSO

A segurança é o ponto central desta aplicação e é garantida por múltiplas camadas:

- Autenticação Gerenciada: O Supabase Auth lida com todo o ciclo de vida do usuário, incluindo hashing seguro de senhas e gerenciamento de sessões JWT.
- Row-Level Security (RLS): É a garantia final de que os dados não podem ser acessados indevidamente. Mesmo que um usuário mal-intencionado tentasse forçar uma chamada de API para ver dados de outros, o banco de dados bloquearia a requisição na origem, com base no ID do usuário autenticado na sessão JWT.
- Políticas Claras: As políticas SQL implementadas seguem o princípio do menor privilégio, onde um usuário USER só tem acesso ao que é estritamente necessário (seus próprios dados), enquanto um ADMIN tem o acesso expandido necessário para suas funções.
