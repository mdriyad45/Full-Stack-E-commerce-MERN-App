const userModel = require("../../models/userModel");

const updatedUser = async(req, res)=>{
    try {
        const sessionUser = req.userId;
        

        const { userId, name, email, role } = req.body;
        
        const payload = {
            ... (email && { email: email}),
            ...(name && { name: name}),
            ...(role && { role: role})
        }

        const user = await userModel.findById(sessionUser);

        
        const updatedUser = await userModel.findByIdAndUpdate(userId, payload);
        

        res.json({
            data: updatedUser,
            message: "User updated",
            success: true,
            error: false
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = updatedUser;