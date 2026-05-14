const checkoutController = {
    checkout: (req, res, next) => {
        try{
            const cart = req.session.cart || [];
        
            const totalItems = cart.reduce((acc, item) => acc + item.quantity,0);

            res.render('checkout', { loggedIn: 1, totalItems });
        }
        catch(error){
            next(error);
        }
    }
};

module.exports = checkoutController;