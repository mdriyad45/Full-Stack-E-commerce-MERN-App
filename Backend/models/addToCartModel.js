import mongoose from "mongoose";

const AddToCartSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    quantity:{
        type: Number,
        
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }

},{
    Timestamp: true
});

export const AddToCart = mongoose.model('addToCart', AddToCartSchema);