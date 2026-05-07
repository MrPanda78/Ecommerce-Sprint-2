const loginController = {
    login: (req, res) => {
        res.render('login', { loggedIn: 0 });
    }
};

module.exports = loginController;