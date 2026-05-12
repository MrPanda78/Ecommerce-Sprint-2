const products = require("../data/products.json")

const cartController = {
    cart: (req, res) => {
        const cart = req.session.cart || [];

        // Combinar sesión + productos reales
        const cartProducts = cart.map(cartItem => {

            const realProduct = products.find(product => product.id === cartItem.productId);

            return {
                ...realProduct,
                quantity: cartItem.quantity,
                subtotal: realProduct.price * cartItem.quantity
            };
        });

        // Total general
        const total = cartProducts.reduce((acc, product) => acc + product.subtotal, 0);

        res.render("cart", {
            cartProducts,
            total,
            loggedIn: 1
        });
    },

    addToCart: (req, res) => {
        const productId = Number(req.params.id);

        // Crear carrito si no existe
        if (!req.session.cart)
        {
            req.session.cart = [];
        }

        // Buscar producto existente
        const existingProduct = req.session.cart.find(item => item.productId === productId);

        // Verifica existencia
        if (existingProduct)
        {
            existingProduct.quantity += 1;
        } 
        else //Crea producto
        {
            req.session.cart.push({ // Agrega al array
                productId,
                quantity: 1
            });
        }
        res.redirect("/cart");
    },

    incrementQuantity: (req, res) => {
        const productId = Number(req.params.id);

        const product = req.session.cart.find(item => item.productId === productId);

        if (product)
        {
            product.quantity += 1;
        }
        res.redirect("/cart");
    },

    decrementQuantity: (req, res) => {
        const productId = Number(req.params.id);

        const product = req.session.cart.find(item => item.productId === productId);

        if (product)
        {
            product.quantity -= 1;

            // Eliminar si llega a 0
            if (product.quantity <= 0)
            {
                req.session.cart = req.session.cart.filter(item => item.productId !== productId);
            }
        }
        res.redirect("/cart");
    },

    clearCart: (req, res) => {
        req.session.cart = [];
        res.redirect("/cart");
    }
};

module.exports = cartController;