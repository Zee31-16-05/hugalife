const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 3004

const userRoute = require('./Users/users.route')
const productRoute = require('./Products/product.route')
const addtocartRoute = require('./AddToCart/addtocart.route')
const placeOrderRoute = require('./Orders/order.route')

app.use(express.json())


app.use('/user/',userRoute)
app.use('/products/',productRoute)
app.use('/addtocart/',addtocartRoute)
app.use('/placeorder/',placeOrderRoute)


mongoose.connect("mongodb://0.0.0.0:27017/hugalife", {
    // useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>console.log("successfully connected to the database"))
.catch((err)=>console.log("Database Connection Failed",err.stack))

app.listen(PORT,()=>{
    console.log(`listening on PORT : ${PORT}`)
});