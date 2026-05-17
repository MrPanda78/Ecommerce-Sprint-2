const products = require("../data/products.json");

const productsService = {
    getAllProducts() {
        return products;
    },

    getProductById(id) {
        return products.find(product => product.id === id);
    },

    getProductsByCategory(category) {
        return products.filter(product => product.category === category);
    },

    getRandomProducts(limit) {
        const shuffledProducts = [...products];

        for (let i = shuffledProducts.length - 1; i > 0; i--) {

            const j = Math.floor(Math.random() * (i + 1));

            [shuffledProducts[i], shuffledProducts[j]] = [
                shuffledProducts[j],
                shuffledProducts[i]
            ];
        }
        return shuffledProducts.slice(0, limit);
    },

    getRelatedProducts(product, limit) {
        const filteredProducts = products.filter(p =>
            p.category === product.category &&
            p.id !== product.id
        );

        for (let i = filteredProducts.length - 1; i > 0; i--) {

            const j = Math.floor(Math.random() * (i + 1));

            [filteredProducts[i], filteredProducts[j]] = [
                filteredProducts[j],
                filteredProducts[i]
            ];
        }
        return filteredProducts.slice(0, limit);
    },

    formatProducts(productsArray) {
        return productsArray.map(product => ({
            ...product,
            points: product.points.toLocaleString("es-AR"),
            image: product.image
                ? `/images/products/${product.category}/${product.image}`
                : "/images/fondo_blanco_negro.webp"
        }));
    }
};

module.exports = productsService;