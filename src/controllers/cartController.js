const cartService = require("../services/cartService");

const cartController = {
    cart: (req, res, next) => {
        try {
            const cartProducts = cartService.getDetailedCart(req.session);
            const total = cartService.calculateTotal(req.session);
            const totalItems = cartService.getTotalItems(req.session);

            res.render("cart", {
                title: 'Cart - Ecommerce',
                cartProducts,
                total,
                loggedIn: 1,
                totalItems,
                styles: [
                    "/css/components/userDropdown.css",
                    "/css/layouts/header.css",
                    "/css/components/searchBar.css",
                    "/css/components/cartAndProfile.css",
                    "/css/views/cart.css",
                    "/css/components/breadCrumb.css",
                    "/css/components/productCart.css",
                    "/css/layouts/footer.css"
                ]
            });
        }
        catch(error){
            next(error);
        }
    },

    addToCart: (req, res) => {
        cartService.addProduct(req.session, Number(req.params.id));
        res.redirect("/cart");
    },

    incrementQuantity: (req, res) => {
        cartService.incrementQuantity(req.session, Number(req.params.id));
        res.redirect("/cart");
    },

    decrementQuantity: (req, res) => {
        cartService.decrementQuantity(req.session, Number(req.params.id));
        res.redirect("/cart");
    },

    removeFromCart: (req, res) => {
        cartService.removeProduct(req.session, Number(req.params.id));
        res.redirect("/cart");
    },

    clearCart: (req, res) => {
        cartService.clearCart(req.session);
        res.redirect("/cart");
    }
};

module.exports = cartController;