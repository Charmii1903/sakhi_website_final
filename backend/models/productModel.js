import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {type:String , required: true},
    description: {type:String , required: true},
    price : { type: Number, required: true },
    image : { type: Array, required: true },
    category : { type: String, required: true },
    subcategory : { type: String, required: true },
    sizes : { type: Array, required: true },
    bestseller : { type: Boolean , default:false},
    date : { type: Number, required: true },
    ratings: {
        totalRating: { type: Number, default: 0 },
        ratingCount: { type: Number, default: 0 },
    },
      
})

const productModel = mongoose.models.product || mongoose.model("product",productSchema);

export default productModel;