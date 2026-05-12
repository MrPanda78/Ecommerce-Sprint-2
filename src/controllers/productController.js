const products = require("../data/products.json");

const interests = [
    { name: 'Whiskey Blenders Pride 750ml', image: '/images/whisky.webp', points: '19.900' },
    { name: 'Nombre del producto o servicio', image: '/images/fondo_blanco_negro.webp', points: 'XX.XXX' },
    { name: 'Nombre del producto o servicio', image: '/images/fondo_blanco_negro.webp', points: 'XX.XXX' },
    { name: 'Nombre del producto o servicio', image: '/images/fondo_blanco_negro.webp', points: 'XX.XXX' }
];

const productController = {
    product: (req, res) => {
        const product = products[0];
        res.render('product', { loggedIn: 1, interests, product });
    }
};

module.exports = productController;