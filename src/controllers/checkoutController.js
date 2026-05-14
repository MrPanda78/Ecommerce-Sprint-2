const checkoutController = {
    checkout: (req, res) => {
        const cart = req.session.cart || [];
        
        const totalItems = cart.reduce((acc, item) => acc + item.quantity,0);

        res.render('checkout', { loggedIn: 1, totalItems });
    }
};

module.exports = checkoutController;