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
    home: (req, res, next) => {
        try{
            const cart = req.session.cart || [];

            const totalItems = cart.reduce((acc, item) => acc + item.quantity,0);

            res.render("categories", {
                products,
                categorySelected: "all",
                translateCategory,
                loggedIn: 1,
                totalItems
            });
        }
        catch(error){
            next(error);
        }
    },

    category: (req, res, next) => {
        try{
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
        catch(error){
            next(error);
        }
    }
}

module.exports = categoriesController;