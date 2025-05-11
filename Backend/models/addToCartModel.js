import mongoose from "mongoose";

const AddToCartSchema = mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }

},{
    Timestamp: true
});

export const AddToCart = mongoose.model('addToCart', AddToCartSchema);