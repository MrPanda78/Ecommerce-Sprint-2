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
        res.render("categories", {
            products,
            categorySelected: "all",
            translateCategory,
            loggedIn: 1
        });
    },

    category: (req, res) => {
        const category = req.params.category;
        const categoryProducts = products.filter(product => product.category === category);
        res.render("categories", {
            products: categoryProducts,
            categorySelected: category,
            translateCategory,
            loggedIn: 1
        });
    }
}

module.exports = categoriesController;