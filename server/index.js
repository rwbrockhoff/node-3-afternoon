const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session')
require('dotenv').config();
const checkForSession = require('../server/middlewares/checkForSession');
const swagController = require('../server/controllers/swag_controller');
const authController = require('../server/controllers/auth_controller');
const cartController = require('../server/controllers/cart_controller');
const searchController = require('../server/controllers/search_controller');

const port = process.env.SERVER_PORT;
const app = express();

app.use(bodyParser.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, 
    saveUninitialized: true
}))

app.use( checkForSession );
app.use( express.static( `${__dirname}/build` ) );

app.listen(port, () => {
    console.log(`Listening on Port: ${port}`)
})

app.get('/api/swag', swagController.read);

app.post('/api/login', authController.login);
app.post('/api/register', authController.register);
app.post('/api/signout', authController.signout);
app.get('/api/user', authController.getUser);


app.post('/api/cart', cartController.add);
app.post('/api/cart/checkout', cartController.checkout);
app.delete('/api/cart', cartController.delete);

app.get('./api/search', searchController.search);
