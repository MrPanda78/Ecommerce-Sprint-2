const express = require('express');
const path = require('path');

const indexRoutes = require('./src/routes/indexRoute');
const cartRoutes = require('./src/routes/cartRoute');
const loginRoutes = require('./src/routes/loginRoute');
const productRoutes = require('./src/routes/productRoute');
const registerRoutes = require('./src/routes/registerRoute');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.use(express.static('public'));

app.use('/', indexRoutes);
app.use('/cart', cartRoutes);
app.use('/login', loginRoutes);
app.use('/product', productRoutes);
app.use('/register', registerRoutes);

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});