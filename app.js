const express = require("express");
const app = express();
const UserRoute = require('./routes/UserRoute')
const ItemRoute = require('./routes/ItemRoute')
const CartRoute = require('./routes/CartRoute')
const OrderRoute = require('./routes/OrderRoute')

//get data in JSON format
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//import routes
app.use(UserRoute)
app.use(ItemRoute)
app.use(CartRoute)
app.use(OrderRoute)


module.exports = app