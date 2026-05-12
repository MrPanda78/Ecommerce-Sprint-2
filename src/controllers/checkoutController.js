const checkoutController = {
    checkout: (req, res) => {
        res.render('checkout', { loggedIn: 1 });
    }
};

module.exports = checkoutController;