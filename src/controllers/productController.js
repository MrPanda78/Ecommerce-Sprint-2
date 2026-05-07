const interests = [
    { name: 'Whiskey Blenders Pride 750ml', image: '/images/whisky.webp', points: '19.900' },
    { name: 'Nombre del producto o servicio', image: '/images/fondo_blanco_negro.webp', points: 'XX.XXX' },
    { name: 'Nombre del producto o servicio', image: '/images/fondo_blanco_negro.webp', points: 'XX.XXX' },
    { name: 'Nombre del producto o servicio', image: '/images/fondo_blanco_negro.webp', points: 'XX.XXX' }
];

const product = {
    name: "Whiskey Jack Daniels Honey 750ml",
    price: "19.900",
    images: [
        "/images/whisky.webp",
        "/images/whisky.webp",
        "/images/whisky.webp"
    ],
    description: `Un verdaderamente fabuloso licor de whisky Blenders Pride. Está hecho con una mezcla de ricas especias y suave, miel tersa y el resultado es delicioso sobre hielo o café.

    Aroma de caramelo y roble carbonizado, un poco de flor naranja, miel de manuka y vainilla.

    Boca: grueso y cremoso, con notas de vainilla, roble tostado, miel de nuevo, un poco de albaricoque también.

    Acabado: De buena longitud - redondeado y rico.

    No incluye vasos, la foto es sólo ilustrativa.`
};

const productController = {
    product: (req, res) => {
        res.render('product', { loggedIn: 1, interests, product });
    }
};

module.exports = productController;