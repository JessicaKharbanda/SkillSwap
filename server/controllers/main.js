const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError, UnauthenticatedError} = require('../errors');



  const register = async(req, res) =>{
    // const {name, email, password} = req.body;
    // validation of incoming post data through controller although I have done validation via mongoDB too.
    // if(!name || !email || !password){
    //     throw new BadRequestError('Please Provide name, email and password');
    // }

    // Using mongoose  "pre" middleware we have hashed our password
    // using Mongoose "instance methods" to sign jwt token for clean code.

    const user = await User.create({...req.body});
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({user: {name: user.name}, token}); // depends on what we want to show on our front end
}

const login = async(req, res) =>{
    const {email, password} = req.body;

    if(!email || !password){
        throw new BadRequestError('Please Provide email and password');
    }
    const user = await User.findOne({email});
    // checking whether email is correct or not
    if(!user){
        throw new UnauthenticatedError("Invalid Credentials");
    }
    // compare password
    const isPasswordMatch = await user.comparePassword(password);
    if(!isPasswordMatch){
        throw new UnauthenticatedError("Invalid Credentials");
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({user, token});  // this will be send to front end
}

module.exports = {
    register, login
}