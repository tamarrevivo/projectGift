const BusinessOwner = require("../models/businessOwner");
const Category = require("../models/category");
const User = require("../models/user");
const mongoose = require("mongoose");

//הוספת בעל עסק חדש  
const post = async (req, res) => {
    let businessOwner = req.body;
    let newBusinessOwner = new BusinessOwner(businessOwner);
    let user = await User.findById(businessOwner.user);
    if (!user)
        return res.status(404).send(" מצטערים אתם צריכים להכניס שם משתמש וסיסמה ");
    try {
        await newBusinessOwner.save();
        return res.send(newBusinessOwner);
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
}

// מחיקת בעל עסק  
const deleteById = async (req, res) => {
    const { id } = req.params;
    if (mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("המזהה שהתקבל אינו תקין")
    const businessOwner = await BusinessOwner.findOneAndDelete(id)
    if (!businessOwner)
        return res.status(400).send("סליחה זה לא נימצא");
    return res.send(businessOwner);
}

// עידכון בעל עסק  
let put = async (req, res) => {
    let businessOwnerBody = req.body;
    let { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("המזההה שהתקבל אינו תקין");
    let businessOwner = await BusinessOwner.findById(id);
    if (!businessOwner)
        return res.send("אין בעל עסק עם מזהה כזה");
        businessOwner.nameBusinessOwner = businessOwnerBody.nameBusinessOwner || businessOwner.nameBusinessOwner;
        businessOwner.sellsman = businessOwnerBody.sellsman || businessOwner.sellsman;
        businessOwner.address = businessOwnerBody.address || businessOwner.address;
        businessOwner.payments = businessOwnerBody.payments || businessOwner.payments;
        businessOwner.photoAdvertising = businessOwnerBody.photoAdvertising || businessOwner.photoAdvertising;
        businessOwner.categories = businessOwnerBody.categories || businessOwner.categories;

        await businessOwner.save();
    return res.send(businessOwner);
}

//  קבלת כל בעל עסק  
const get=async (req,res)=>{
    let businessOwner=await BusinessOwner.find().populate("user","category");
    return res.send(businessOwner);
}

//   קבלת  בעל עסק עפ"י מזהה  
const getById=async (req,res)=>{
    let { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).send("המזההה שהתקבל אינו תקין");
    let businessOwner = await BusinessOwner.findById(id);   
     if (!businessOwner)
         return res.status(404).send("מצטערים לא נמצאה בעל עסק עם המזהה שהתקבל");
     return res.send(businessOwner);
}
module.exports = {
    post, deleteById, put, get, getById
}