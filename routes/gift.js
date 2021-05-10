const express = require("express");
const route=express.Router();
const giftController=require("../controllers/gift");

route.post("/",giftController.post)
route.delete("/:id",giftController.deleteById)
route.put("/:id",giftController.put)
route.get("/",giftController.get)
route.get("/:id",giftController.getById)
module.exports=route;