const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// Rota para admin listar todos os usuários
// Primeiro verifica se está autenticado (auth), depois se é admin (admin)
router.get("/", auth, admin, userController.getAllUsers);
