
const swag = require('../models/swag');



module.exports = {
    search: (req, res, next) => {
        if (req.query.category){
            const filterByCategory = swag.filter( (swag) => {
                swag.category === req.query.category
            })

            res.status(200).send(filterByCategory)
        }
        else {
            res.status(200).send(swag);
        }
    }

}



