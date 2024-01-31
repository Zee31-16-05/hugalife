const Product = require('./product.model')

exports.createProduct = async(req, res, next) => {
    try{
        const productData = new Product({
            name : req.body.name,
            description : req.body.description,
            price : req.body.price
        })

        const result = await productData.save()
        console.log("Product saved successfully",result);
        res.status(201).json({result})
    }
    catch(err){
        console.log("Error came from createProduct API",err.stack);
        res.status(503).json("Internal Server Error")
    }
}