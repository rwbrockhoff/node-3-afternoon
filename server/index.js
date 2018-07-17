const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session')
require('dotenv').config();
const checkForSession = require('../server/middlewares/checkForSession');
const swagController = require('../server/controllers/swag_controller');
const authController = require('../server/controllers/swag_controller');

const port = process.env.SERVER_PORT;
const app = express();

app.use(bodyParser.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, 
    saveUninitialized: true
}))

app.use( checkForSession );

app.listen(port, () => {
    console.log(`Listening on Port: ${port}`)
})

app.get('/api/swag', swagController.read);

app.post('/api/login', authController.login);
app.post('/api/register', authController.register);
app.post('/api/signout', authController.signout);
app.get('/api/user', authController.getUser);





// Create the following endpoints: ( request method, url, controller method )
// POST - /api/login - auth_controller.login.
// POST - /api/register - auth_controller.register.
// POST - /api/signout - auth_controller.signout.
// GET - /api/user - auth_controller.getUser.