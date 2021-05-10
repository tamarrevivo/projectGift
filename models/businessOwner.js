const mongoose = require("mongoose");
const businessOwnerSchema = new mongoose.Schema({

    //שם 
    nameBusinessOwner: {
        type: String,
        minLength: 2,
        required: true
    },
    // טלפון של בעל החנות
    sellsman: {
        type: String,
        required: true
    },
    //כתובת
    address: {
        type: String,
        required: true
    },
    //תשלומים
    payments: [{
        date: Date,
        uiId: String,
        sum: Number
    }],
    // תמונות של פרסומות
    photoAdvertising: [{
        imageUrl: String,
        countShow: Number
    }],
    //רשימת קטגוריות 
    categories: { type: [String], required: true },
    //משתמש
    // user: {
    //     type: mongoose.SchemaTypes.ObjectId,
    //     ref: "users"
    // }

});
const BusinessOwner = mongoose.model("businessOwners", businessOwnerSchema);
module.exports = BusinessOwner;
//60994129278a75128c40cf65