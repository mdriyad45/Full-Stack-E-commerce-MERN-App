const userModel = require("../../models/userModel");
const bcrypt = require('bcrypt');

const userSignUpController = async (req, res)=>{
    try {
        const {name, email, password} = req.body;

        const user = await userModel.findOne({email});

        if(user){
            throw new Error("Already user exists.")
        }
        if(!name){
            throw new Error('please provide name');
        }
        if(!email){
            throw new Error('please provide email');
        }
        if(!password){
            throw new Error('please provide password');
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        if(!hashPassword){
            throw Error('hashPassword not found something wrong!');
        }

        const payload = {
            ...req.body,
            role: 'GENERAL',
            password: hashPassword
        }

        const userData = new userModel(payload);
        const saveUser = await userData.save();

        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User created Successfully!"
        })
    } catch (error) {
        res.json({
            message:  error.message || error,
            error: true,
            success: false,
        })
    }
}

module.exports = userSignUpController;