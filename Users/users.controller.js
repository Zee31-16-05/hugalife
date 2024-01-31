const User = require('./users.model')
var jwt = require('jsonwebtoken');
const secretKey = 'zeeshan123';

exports.createUser = async(req,res)=>{
    try{
        const {email} = req.body

        const userData = new User({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            address : req.body.address,
            phone : req.body.phone
            })

        const userExistOrNot = await User.findOne({email})
        console.log("userExistOrNot", userExistOrNot);

        if(userExistOrNot){

            res.status(201).json("User Already Exists")
        }
        else{
            // let token = jwt.sign({ email: "result.email" }, "privateKey");
            // console.log("token", token);

            const result = await userData.save()

            console.log("result", result);
            // let token = jwt.sign({ email: result.email }, "privateKey");
            // console.log("token", token);
            // res.status(201).json({result})
            
        }

    }
    catch(err){
        console.log("Error came from creating USER",err.stack);
        res.status(503).json("Internal Server Error")
    }
}

exports.loginUser = async(req,res)=>{
    try{
        const { email, password } = req.body;

        // Find the user in the database (replace with actual database query)
        const user = await User.findOne({ email, password });
        console.log("User found", user);

        if(user){
            const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, { expiresIn: '1h' });
            res.json({ token });
        }
        else{
            return res.status(401).json({ message: 'Invalid credentials' })
        }



    }
    catch(err){
        console.log("Error came from creating USER",err.stack);
        res.status(503).json("Internal Server Error")
    }
}

