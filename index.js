const express = require("express");
const UserRoute = require('./routes/UserRoute')
const ItemRoute = require('./routes/ItemRoute')
const CartRoute = require('./routes/CartRoute')
const OrderRoute = require('./routes/OrderRoute')

const app = express();

//get data in JSON format
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


//import routes
app.use(UserRoute)
app.use(ItemRoute)
app.use(CartRoute)
app.use(OrderRoute)
//connect to server
app.listen(3000, () => console.log("Server Connected"));
