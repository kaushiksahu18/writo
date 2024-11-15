import mongoose from "mongoose"

const serviceSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        index : true
    },
    description : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    discount : {
        type : Number,
        default : 0
    }
})

const Service = mongoose.model("Service", serviceSchema)

export default Service