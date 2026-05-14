const products = require("../data/products.json");

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

const productController = {
    product: (req, res) => {
        const id = Number(req.params.id);
        const product = products.find(p => p.id === id);

        // Validar si existe
        if (!product) 
        {
            return res.status(404).render("error404");
        }
        
        // Filtra productos de la misma categoría para "interests"
        const shuffledProducts = products.filter(p =>
            p.category === product.category &&
            p.id !== product.id // Evita incluir el mismo producto
        );

        // Recorre el array desde el último elemento hacia el primero para "interests"
        for (let i = shuffledProducts.length - 1; i > 0; i--) {

            // Genera una posición aleatoria entre 0 e i
            const j = Math.floor(Math.random() * (i + 1));

            // Intercambia el elemento actual con el elemento aleatorio
            [shuffledProducts[i], shuffledProducts[j]] = [
                shuffledProducts[j],
                shuffledProducts[i]
            ];
        }

        const interests = shuffledProducts.slice(0, 4).map(product => ({
            ...product,
            points: product.points.toLocaleString("es-AR"), // toLocaleString() sirve para formatear números según una configuración regional
            image: product.image ? `/images/products/${product.category}/${product.image}` : "/images/fondo_blanco_negro.webp"
        }));

        const cart = req.session.cart || [];
        
        const totalItems = cart.reduce((acc, item) => acc + item.quantity,0);

        res.render('product', { loggedIn: 1, interests, product, translateCategory, totalItems });
    }
};

module.exports = productController;