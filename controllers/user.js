const User = require("../models/user");
const mongoose = require("mongoose");

//הוספת משתמש  חדשה  
const post = async (req, res) => {
    let user = req.body;
    let newUser = new User(user);
    if (!user)
        return res.status(404).send(" מצטערים אתם צריכים להכניס שם משתמש וסיסמה ");
    try {
        await newUser.save();
        return res.send(newUser);
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
}

// מחיקת משתמש    
const deleteById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("המזהה שהתקבל אינו תקין")
    const user = await User.findOneAndDelete(id)
    if (!user)
        return res.status(400).send("סליחה זה לא נימצא");
    return res.send(user);
}

// עידכון משתמש  
let put = async (req, res) => {
    let userBody = req.body;
    let {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("המזההה שהתקבל אינו תקין");
    let user = await User.findById(id);
    if (!user)
        return res.send("אין משתמש עם מזהה כזה");
    user.username = userBody.username || user.username;
    user.lastName = userBody.lastName || user.lastName;
    user.password = userBody.password || user.password;
    user.image = userBody.image || user.image;
    user.email = userBody.email || user.email;
    user.phone = userBody.phone || user.phone;
    user.role = userBody.role || user.role;
    await user.save();
    return res.send(user);
}

//  קבלת כל המתנות  
const get = async (req, res) => {
    let user = await User.find();
    return res.send(user);
}

//   קבלת  מתנה עפ"י מזהה  
const getById = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("המזההה שהתקבל אינו תקין");
    let user = await User.findById(id);
    if (!user)
        return res.status(404).send("מצטערים לא נמצאה משתמש עם המזהה שהתקבל");
    return res.send(user);
}
module.exports = {
    post, deleteById, put, get, getById
}