const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // 1. Pega o token do header 'Authorization' (Bearer TOKEN)
  const token = req.header("authorization")?.split(" ")[1];
  // 2. Se não houver token, retorna erro 401 (Não Autorizado)
  // 3. Verifica o token com jwt.verify()
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Adiciona o payload do user ao objeto de requisição
    next(); // Passa para a próxima função (o controller)
  } catch (err) {
    res.status(401).json({ msg: "Token não é válido" });
  }
};
