const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
    //שם קטגוריה 
    nameCategory: {
        type: String,
        required: true
    },
    parentCategories: [{
        nameCategory: {
            type: String,
            required: true
        }
    }]
    //אב הקטגוריה
    //parentCategory: { type: mongoose.SchemaTypes.ObjectId, ref: 'categories' },
});
const Category = mongoose.model("categories", categorySchema);
module.exports = Category;

