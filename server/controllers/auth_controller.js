
const users = require('../models/users');
const id = 1;

module.exports = {
    login: (req, res, next) => {
        const {session} = req;
        const {username, password} = req.body;
        const user = users.find( (user) => { user.username === username && user.password === password })

        if ( user ) {
            session.user.username = user.username
            res.status(200).send(session.user)
        }
        else {
            res.status(500).send('Not Allowed Here. Go back!')
        }
        
    },

    // Finally, let's focus on the login method. This method should use username and password from the request body to find a user object in the users array with the same user/pass combination. If it finds a user with that combination, it should update the value of username on the request session's user object to value of username from the request body. It should then send a status of 200 with the updated user object. If it doesn't find a user it should send a status of 500.

    register: (req, res, next) => {
        const {session} = req;
        const {username, password} = req.body;

        users.push({id, username, password});
        
        id++
        session.user.username = username
        
        res.status(200).send(session.user)
    },

    signout: (req, res, next) => {
        const {session} = req;
        session.destroy();
        res.status(200).send(req.session);
    },

    getUser: (req, res, next) => {
        const {session} = req;
        res.status(200).send( session.user )
    }
}

