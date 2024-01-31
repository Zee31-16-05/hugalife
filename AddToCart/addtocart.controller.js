const User = require('../Users/users.model')
const Product = require('../Products/product.model')
const Addtocart = require('./addtocart.model')


exports.createAddtocart = async(req,res)=>{

    try{
        const { userId, productId } = req.body;
        
        const ifUserExists = await User.findById({_id : userId})
        console.log("if user exists",ifUserExists);

        const ifProductExists = await Product.findById({_id : productId})
        console.log("if product exists",ifProductExists);

        if (!ifUserExists && !ifProductExists) {
            return res.status(404).json({ success: false, message: 'User or product not found' });
          }
        
        let findCart = await Addtocart.findOne({ user: userId });
        console.log("Addtocart....", findCart);

        if (!findCart) {
            findCart = new Addtocart({ user: userId, products: [productId] });
          } else {
            findCart.products.push(productId);
          }
      
          await findCart.save();
          res.json({ success: true, message: 'Product added to cart successfully' });

    }
    catch(err){
        console.log("Error came from createAddtocart API",err.stack);
        res.status(503).json("Internal Server Error")
    }
}

exports.getCartByUserId = async(req,res)=>{

    try{
        const cartId = req.params.id;
        console.log("cartId: ",cartId);

        const result = await Addtocart.findById({_id : cartId})
        console.log("getCartById",result);

        res.status(201).json({result})
    }
    catch(err){
        console.log("Error came from createProduct API",err.stack);
        res.status(503).json("Internal Server Error")
    }
}

