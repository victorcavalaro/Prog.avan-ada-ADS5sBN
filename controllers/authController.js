const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Função de Cadastro (Signup)
exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  // 1. Verifica se o usuário já existe
  // 2. Criptografa a senha com bcrypt:
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // 3. Cria e salva o novo usuário
  // 4. Retorna o usuário criado (sem a senha)
};

// Função de Login (Signin)
exports.signin = async (req, res) => {
  const { email, password } = req.body;
  // 1. Encontra o usuário pelo email
  // 2. Compara a senha enviada com a senha criptografada no banco:
  const isMatch = await bcrypt.compare(password, user.password);
  // 3. Se a senha for válida, gera um token JWT:
  const payload = { user: { id: user.id, role: user.role } };
  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: "24h" },
    (err, token) => {
      if (err) throw err;
      res.json({ token });
    }
  );
};
