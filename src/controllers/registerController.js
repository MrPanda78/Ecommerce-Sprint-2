const registerController = {
    register: (req, res) => {
        res.render('register', { loggedIn: 0 });
    }
};

module.exports = registerController;