const products = require("../data/products.json")

const translateCategory = {
    "food": "Alimentos",
    "automotive": "Automotor",
    "beverages": "Bebidas",
    "electronic": "Electrónica",
    "home": "Hogar",
    "clothing": "Indumentaria",
    "games": "Juegos",
    "other": "Otros"
}

const categoriesController = {
    home: (req, res) => {
        const cart = req.session.cart || [];

        const totalItems = cart.reduce((acc, item) => acc + item.quantity,0);

        res.render("categories", {
            products,
            categorySelected: "all",
            translateCategory,
            loggedIn: 1,
            totalItems
        });
    },

    category: (req, res) => {
        const category = req.params.category;
        const categoryProducts = products.filter(product => product.category === category);

        const cart = req.session.cart || [];
        
        const totalItems = cart.reduce((acc, item) => acc + item.quantity,0);

        res.render("categories", {
            products: categoryProducts,
            categorySelected: category,
            translateCategory,
            loggedIn: 1,
            totalItems
        });
    }
}

module.exports = categoriesController;