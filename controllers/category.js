const Category = require("../models/category");
const mongoose = require("mongoose");

const get = async (req, res) => {
    //check if what i Take off to select its good
    let categories = await Category.find().populate({ path: "parentCategory", select: "nameCategory parentCategory" });
    return res.send(categories);
}

const getById = async (req, res) => {
    let id = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("המזהה שהתקבל אינו תקין");
    let category = await Category.findById(id);
    if (!category)
        return res.status(404).send("מצטערים לא נמצאה קטגוריה עם המזהה שהתקבל");
    return res.send(category);
}
//מכיון בטבלה זו יש מצביע לאותה טבלה
//זאת אומרת שיש אובייקט בטבלה שיש לו שדה נוסף המוגדר אב הקטגוריה
//ואב הקטגוריה בעצם גם בטבלה הזו 
//לכן אני לא יודעת בדיוק איך לעבוד עם הקשר בין הטבלאות ואים יש צורך לעשות את הרפרנס
//אם כן --  לברר איך עושים את זה כי אני הסתבכתי ממש
const post = async (req, res) => {
    let newCategory = new Category(...req.body);
    try {
        await newCategory.save();
        return res.send(newCategory);
    } catch (err) {
        return res.status(400).send(err.message);
    }
}

const put = async (req, res) => {
    let categoryBody = req.body;
    let { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("המזהה שהתקבל אינו תקין");
    let category = await Category.findById(id);
    if (!category)
        return res.send("מצטערים לא נמצאה קטגוריה עם המזהה שהתקבל");
    category.nameCategory = categoryBody.nameCategory || category.nameCategory;
    category.parentCategory = categoryBody.parentCategory || category.parentCategory;
    await category.save();
    return res.send(category);
}


const deleteById = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("המזההה שהתקבל אינו תקין");
    let deleted = await Category.findByIdAndRemove(id);
    console.log(deleted);
    if (!deleted)
        return res.status(404).send("מצטערים לא נמצאה קטגוריה עם המזהה שהתקבל");
    return res.send(deleted);
}
module.exports = {
    post, deleteById, put, get, getById
}


