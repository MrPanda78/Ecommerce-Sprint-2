const productsCart = [
    { name: 'Coca Cola Lata 220ml - Pack original x8', image: '/images/coca_cola_lata.webp', points: '760' },
    { name: 'Whiskey Blenders Pride 750ml', image: '/images/whisky.webp', points: '19900' },
];

const cartController = {
    cart: (req, res) => {
        res.render('cart', { loggedIn: 1, productsCart });
    }
};

module.exports = cartController;