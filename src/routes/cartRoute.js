const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get("/", cartController.cart); // Ver carrito
router.post("/add/:id", cartController.addToCart); // Agregar producto
router.post("/increment/:id", cartController.incrementQuantity); // Incrementar
router.post("/decrement/:id", cartController.decrementQuantity); // Disminuir
router.post("/clear", cartController.clearCart); // Vaciar carrito

module.exports = router;