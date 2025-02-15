const userModel = require("../models/userModel");

const allUsers = async (req, res)=>{
    try {
        const allUsers =await userModel.find();

        res.json({
            message: 'all users',
            data: allUsers,
            success: true,
            error: false
        })
    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}

module.exports = allUsers;