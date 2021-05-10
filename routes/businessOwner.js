const express = require("express");
const route=express.Router();
const businessOwnerController=require("../controllers/businessOwner");
route.post("/",businessOwnerController.post)
route.delete("/:id",businessOwnerController.deleteById)
route.put("/:id",businessOwnerController.put)
route.get("/",businessOwnerController.get)
route.get("/:id",businessOwnerController.getById)
module.exports=route;