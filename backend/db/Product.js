const mongoose=require("mongoose");
const ObjectId=mongoose.Types.ObjectId

const productSchema=new mongoose.Schema({
    _id:{
         type:String,
         default:()=>{
            return new ObjectId().toString()
         }
    },
     name:
    {
        type: String,
        required: [true, "Please add the product name"],
    },

    price:{
        type: String,
        required: [true, "Please add the product price"],
    },
    category: {
        type: String,
        required: [true, "Please add the product category"],
    },
    userId: {
        type: String,
        required: [true, "Please add the userId"],
    },
    company: {
        type: String,
        required: [true, "Please add the company name"],
    },
} ,{
    timeStamps:true,
}
)


module.exports=mongoose.model("products",productSchema)