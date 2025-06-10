# Prog.avan-ada-ADS5sBN
Atividade avaliativa SpringBoot

# start do projeto e configuração
-> foi criado a pasta (mkdir Prog.avan-ada-ADS5sBN)
-> selecionada a pasta (cd Prog.avan-ada-ADS5sBN)

# Instalar Dependências Essenciais
npm init -y

# Framework, DB e utilitários
npm install express mongoose dotenv cors

# Para segurança (JWT e criptografia de senha)
npm install jsonwebtoken bcryptjs

# (Opcional) Ferramenta de desenvolvimento para reiniciar o servidor automaticamente
npm install -D nodemon



# estrutura inicial do projeto 

/
├── controllers/    # Lógica das rotas (o que fazer quando um endpoint é acessado)
├── models/         # Definição dos dados (schema do usuário)
├── routes/         # Definição dos endpoints da API
├── middleware/     # Funções de segurança (verificar token)
├── config/         # Configuração do banco de dados
└── index.js        # Arquivo principal do servidor

