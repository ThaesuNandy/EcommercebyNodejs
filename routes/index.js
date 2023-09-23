const route = require('express').Router();
route.get('/', (req, res) => {
    res.send("Ecommerce");
});



module.exports = route;