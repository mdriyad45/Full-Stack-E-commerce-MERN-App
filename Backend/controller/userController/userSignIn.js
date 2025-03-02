const userModel = require("../../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const userSignInController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error("Please provide email!");
    }
    if (!password) {
      throw new Error("Please provide password!");
    }

    const user = await userModel.findOne({email});

    if (!user) {
      throw new Error("User not found!");
    }

    const checkPassword = await bcrypt.compare(password, user.password);


    if (checkPassword) {
        const tokenData = {
            _id : user._id,
            email: user.email
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {expiresIn: '8h'});
        
        const tokenOption = {
            httpOnly: true,
            secure: true,
            sameSite: 'Lax',
        }
        res.cookie('token', token, tokenOption).status(200).json({
            message: "Login successfully",
            data: token,
            success: true,
            error: false,
        })

    } else {
      throw new Error("Please check password");
    }
  } catch (error) {
    console.error(error);
    res.json({
        message: error.message || error,
        error: true,
        success: false,
    })
  }
};

module.exports = userSignInController;
