const mongoose = require("mongoose");
const greetingCardSchema = new mongoose.Schema({

    //שם המכתב
    nameGift: {
        type: String,
        required: true
    },
    //אירוע
    category: { type: [String], required: true},
    //???טקסט המכתב
    //או ניתוב לקובץ המכתב
    textGreeting: {
        type: String,
        minLength: 20,
        required: true
    },
    //תמונת מתנה
    photo: {
        type: String,
        required: true
    },
    //סטטוס
    status: {
        type:String,
        enum:['NEW',"DELEY",'APPROVE','WAITDELETE'],
        default:["NEW"]
    },
    //הערה
    remark:String,
});
const GreetingCard = mongoose.model("greetingCards", greetingCardSchema);
module.exports = GreetingCard;