const products = require('../data/products.json');

const indexController = {
    index: (req, res, next) => {
        try{
            const shuffledProducts = [...products]; // Crea una copia de los productos para "interests"
            const shuffledProducts2 = [...products]; // Crea una copia de los productos para "mostRequested"

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

            // Recorre el array desde el último elemento hacia el primero para "mostRequested"
            for (let i = shuffledProducts2.length - 1; i > 0; i--) {

                // Genera una posición aleatoria entre 0 e i
                const j = Math.floor(Math.random() * (i + 1));

                // Intercambia el elemento actual con el elemento aleatorio
                [shuffledProducts2[i], shuffledProducts2[j]] = [
                    shuffledProducts2[j],
                    shuffledProducts2[i]
                ];
            }
            const interests = shuffledProducts.slice(0, 5).map(product => ({
                ...product,
                points: product.points.toLocaleString("es-AR"), // toLocaleString() sirve para formatear números según una configuración regional
                image: product.image ? `/images/products/${product.category}/${product.image}` : "/images/fondo_blanco_negro.webp"
            }));
            const mostRequested = shuffledProducts2.slice(0, 10).map(product => ({
                ...product,
                points: product.points.toLocaleString("es-AR"), // toLocaleString() sirve para formatear números según una configuración regional
                image: product.image ? `/images/products/${product.category}/${product.image}` : "/images/fondo_blanco_negro.webp"
            }));

            const cart = req.session.cart || [];
            
            const totalItems = cart.reduce((acc, item) => acc + item.quantity,0);

            res.render('index', { loggedIn: 1, interests, mostRequested, totalItems });
        }
        catch(error){
            next(error);
        }
    },

    //Middleware404
    error404: (req, res) => {
        res.status(404).render("error404");
    },

    //Middleware 500 //función que se ejecuta entre la petición del usuario y la respuesta del servidor.
    error500:((err, req, res, next) => {
        console.error(err);
        res.status(500).render("error500");
    })
};

module.exports = indexController;
