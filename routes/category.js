const express = require("express");
const route=express.Router();
const categoryController=require("../controllers/category");

route.post("/",categoryController.post)
route.delete("/:id",categoryController.deleteById)
route.put("/:id",categoryController.put)
route.get("/",categoryController.get)
route.get("/:id",categoryController.getById)
module.exports=route;