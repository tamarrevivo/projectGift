const express = require("express");
const route=express.Router();
const greetingCardController=require("../controllers/greetingCard");

route.post("/",greetingCardController.post)
route.delete("/:id",greetingCardController.deleteById)
route.put("/:id",greetingCardController.put)
route.get("/",greetingCardController.get)
route.get("/:id",greetingCardController.getById)
module.exports=route;