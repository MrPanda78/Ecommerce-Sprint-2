const registerController = {
    register: (req, res, next) => {
        try{
            res.render('register', { loggedIn: 0 });
        }
        catch(error){
            next(error);
        }
    }
};
module.exports = registerController;