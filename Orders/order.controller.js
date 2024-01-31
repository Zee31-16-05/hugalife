const User = require('../Users/users.model')
const Product = require('../Products/product.model')
const Addtocart = require('../AddToCart/addtocart.model')

exports.palceOrder = async(req,res)=>{
    try{
        const { userId } = req.body;
        
        const findUserscart = await Addtocart.findOne({ user: userId }).populate('products')
        console.log("findUserscart....",findUserscart.products);

        if (!findUserscart || findUserscart.products.length === 0) {
            return res.status(404).json({ success: false, message: 'No products in the cart' });
          }

         // Calculate the total price
        const totalPrice = findUserscart.products.reduce((acc, product) => acc + product.price, 0);
        console.log("Total price: ", totalPrice);

          // Clear the user's cart after placing the order
        const clearUsersCart = await Addtocart.findOneAndDelete({ user: userId });
        console.log("Clear users cart: ", clearUsersCart);

        res.json({
            success: true,
            message: 'Order placed successfully',
            orderSummary: {
              products: findUserscart.products.map(product => ({ name: product.name, price: product.price })),
              totalPrice,
            }
          });

          // sasidhar.venkatesan@pratechbrands.com

    }
    catch(err){
        console.log("Error came from placeOrder API...",err.stack);
        res.status(503).json("Internal Server Error")
    }
}