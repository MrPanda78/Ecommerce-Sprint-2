const loginController = {
    login: (req, res, next) => {
        try{
            res.render('login', { loggedIn: 0 });
        }
        catch(error){
            next(error);
        }
    }
};

module.exports = loginController;