const mongoose = require("mongoose");
const giftSchema = new mongoose.Schema({

    //שם המתנה
    nameGift: {
        type: String,
        minLength: 2,
        required: true
    },
    //מחיר משוער
    price: {
        type: Number,
        required: true
    },
   
    //קטוריה
    category: [String],

    //תמונת מתנה
    gifPhoto: {
        type: String,
        required: true
    },
    //ניקוד מדורג   
    ratedScore: {
        type: Number
    },
    //טווח גילאים - נמוך
    fromAgeRange: {
        type: Number,
        required: true
    },
    //טווח גילאיים - גבוה
    toAgeRange: {
        type: Number,
        required: true
    },
    //סטטוס
    status: {
        type:String,
        enum:['NEW',"DELEY",'APPROVE','WAITDELETE'],
        default:["NEW"]
    },
    //משתמש
    // user: {
    //     type: mongoose.SchemaTypes.ObjectId,
    //     ref: "users"
    // },
    //הערה
    remark:String,
});
const Gift = mongoose.model("gifts", giftSchema);
module.exports = Gift;

