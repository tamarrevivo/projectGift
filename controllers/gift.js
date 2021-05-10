const BusinessOwner = require("../models/businessOwner");
const Gift = require("../models/gift");
const Category = require("../models/category");
const User = require("../models/user");
const mongoose = require("mongoose");

//הוספת מתנה  חדשה  
const post = async (req, res) => {
    let gift = req.body;
    let newGift = new Gift(gift);
    let user = await User.findById(gift.user);
    if (!gift)
        return res.status(404).send(" מצטערים אתם צריכים להכניס שם משתמש וסיסמה ");
    try {
        await newGift.save();
        return res.send(newGift);
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
}

// מחיקת מתנה    
const deleteById = async (req, res) => {
    const { id } = req.params;
    if (mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("המזהה שהתקבל אינו תקין")
    const gift = await Gift.findOneAndDelete(id)
    if (!gift)
        return res.status(400).send("סליחה זה לא נימצא");
    return res.send(gift);
}

// עידכון מתנה  
let put = async (req, res) => {
    let giftBody = req.body;
    let { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("המזההה שהתקבל אינו תקין");
    let gift = await Gift.findById(id) ;  
    if (!gift)
    return res.send("אין מתנה עם מזהה כזה");
    gift.nameGift = giftBody.nameGift || gift.nameGift;
    gift.price = giftBody.price || gift.price;
    gift.category = giftBody.category || gift.category;
    gift.gifPhoto = giftBody.gifPhoto || gift.gifPhoto;
    gift.ratedScore = giftBody.ratedScore || gift.ratedScore;
    gift.fromAgeRange = giftBody.fromAgeRange || gift.fromAgeRange;
    gift.toAgeRange = giftBody.toAgeRange || gift.toAgeRange;
    gift.status = giftBody.status || gift.status;
    gift.remark = giftBody.remark || gift.remark;
    await gift.save();
    return res.send(gift);
 }






//  קבלת כל המתנות  
const get=async (req,res)=>{
    let gift=await Gift.find().populate("user","category");
    return res.send(gift);
}

//   קבלת  מתנה עפ"י מזהה  
const getById=async (req,res)=>{
    let { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).send("המזההה שהתקבל אינו תקין");
    let gift = await Gift.findById(id);   
     if (!gift)
         return res.status(404).send("מצטערים לא נמצאה בעל עסק עם המזהה שהתקבל");
     return res.send(gift);
}
module.exports = {
    post, deleteById, put, get, getById
}