import mongoose from "mongoose"

const Schema = mongoose.Schema

const categorySchema = new Schema({
    catname: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('category', categorySchema);

