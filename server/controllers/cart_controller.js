const swag = require('../models/swag');


module.exports = {
    add: (req, res, next) => {
        let index = cart.findIndex(swag => {
            swag.id === req.query.id
        })
        
        if (index === -1){
            const selectSwag = swag.find( (swag) => swag.id === id)
            cart.push(selectSwag);
            req.session.user.total += selectSwag.price
        }
        res.status(200).send(req.session.user);
    },

    delete: (req, res, next) => {
        const selectedSwag = swag.find( (swag) => swag.id === id )

        if (selectedSwag){
            const index = cart.findIndex( (swag) => swag.id === id)
            cart.splice(index, 1);
            req.session.user.total -= selectedSwag.price
        }
        res.status(200).send(req.session.user);
    },

    checkout: (req, res, next) => {
        const { user } = req.session;

        user.cart = [],
        user.total = 0

        res.status(200).send(req.session.user)
        
    },
}

// Let's break down the file, method by method. We'll start with add. This method is responsible for making sure the swag isn't already in the cart. If it isn't, add it to the cart and increase the total by the price of the swag. If it is, just return the request session's user object with a status of 200. This method will use the request query to get an id. We can then use this id to see if it is already in the cart and preform the required logic.

// add:
// Should check the request query for an id.
// Should use the id to see if it is already in the user's cart on session.
// If it is, just send a status 200 with the request session's user object.
// If it isn't, find the swag object from models/swag using the id and add it to the cart on session.
// Add the price of the swag to the total on the session.
// Send a status 200 with the request session's user object.
// remove:
// Should check the request query for an id.
// Should use the id to remove the swag from cart and subtract it's price from the total.
// Should send status 200 with the request session's user object.
// checkout:
// Should set the cart back to an empty array on session.
// Should set the total back to 0 on session.
// Should send status 200 with the request session's user object.