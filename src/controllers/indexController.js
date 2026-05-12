const products = require('../data/products.json');

const mostRequested = [
    { name: 'Coca Cola Lata 220ml - Pack original x8', image: '/images/products/beverages/coca_cola_lata_220ml_pack_original_x8.webp', points: '760' },
    { name: 'Nombre del producto o servicio', image: '/images/fondo_blanco_negro.webp', points: 'XX.XXX' },
    { name: 'Nombre del producto o servicio', image: '/images/fondo_blanco_negro.webp', points: 'XX.XXX' },
    { name: 'Nombre del producto o servicio', image: '/images/fondo_blanco_negro.webp', points: 'XX.XXX' },
    { name: 'Nombre del producto o servicio', image: '/images/fondo_blanco_negro.webp', points: 'XX.XXX' },
    { name: 'Nombre del producto o servicio', image: '/images/fondo_blanco_negro.webp', points: 'XX.XXX' },
    { name: 'Nombre del producto o servicio', image: '/images/fondo_blanco_negro.webp', points: 'XX.XXX' },
    { name: 'Nombre del producto o servicio', image: '/images/fondo_blanco_negro.webp', points: 'XX.XXX' }
];

const indexController = {
    index: (req, res) => {
        const shuffledProducts = [...products]; // Crea una copia de los productos

        // Recorre el array desde el último elemento hacia el primero
        for (let i = shuffledProducts.length - 1; i > 0; i--) {

            // Genera una posición aleatoria entre 0 e i
            const j = Math.floor(Math.random() * (i + 1));

            // Intercambia el elemento actual con el elemento aleatorio
            [shuffledProducts[i], shuffledProducts[j]] = [
                shuffledProducts[j],
                shuffledProducts[i]
            ];
        }

        const interests = shuffledProducts.slice(0, 5).map(product => ({
            ...product,
            points: product.points.toLocaleString("es-AR"), // toLocaleString() sirve para formatear números según una configuración regional
            image: product.image ? `/images/products/${product.category}/${product.image}` : "/images/fondo_blanco_negro.webp"
        }));

        res.render('index', { loggedIn: 1, interests, mostRequested });
    },

    error404: (req, res) => {
        res.status(404).render("error404");
    }
};

module.exports = indexController;
