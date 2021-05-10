const GreetingCard = require("../models/greetingCard");
const Category = require("../models/category");
const User = require("../models/user");
const mongoose = require("mongoose");

//הוספת מתנה  חדשה  
const post = async (req, res) => {
    let greetingCard = req.body;
    let newGreetingCard = new GreetingCard(greetingCard);
    let user = await User.findById(greetingCard.user);
    if (!greetingCard)
        return res.status(404).send(" מצטערים אתם צריכים להכניס שם משתמש וסיסמה ");
    try {
        await newGreetingCard.save();
        return res.send(newGreetingCard);
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
    const greetingCard = await GreetingCard.findOneAndDelete(id)
    if (!greetingCard)
        return res.status(400).send("סליחה זה לא נימצא");
    return res.send(greetingCard);
}

// עידכון מתנה  
let put = async (req, res) => {
    let greetingCardtBody = req.body;
    let { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("המזההה שהתקבל אינו תקין");
     if (!greetingCard)
       return res.status(404).send("המזהה שהתקבל אינו תקין");
       greetingCard.nameGift = greetingCardtBody.nameGift || greetingCard.nameGift;
       greetingCard.category = greetingCardtBody.category || greetingCard.category;
       greetingCard.textGreeting = greetingCardtBody.textGreeting || greetingCard.textGreeting;
       greetingCard.photo = greetingCardtBody.photo || greetingCard.photo;
       greetingCard.status = greetingCardtBody.status || greetingCard.status;
       greetingCard.remark = greetingCardtBody.remark || greetingCard.remark;
    await greetingCard.save();
   return res.send(greetingCard);


}
//  קבלת כל המתנות  
const get=async (req,res)=>{
    let greetingCard=await GreetingCard.find().populate("user","category");
    return res.send(greetingCard);
}

//   קבלת  מתנה עפ"י מזהה  
const getById=async (req,res)=>{
    let { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).send("המזההה שהתקבל אינו תקין");
    let greetingCard = await GreetingCard.findById(id);   
     if (!greetingCard)
         return res.status(404).send("מצטערים לא נמצאה מכתב עם המזהה שהתקבל");
     return res.send(greetingCard);
}
module.exports = {
    post, deleteById, put, get, getById
}