const mongoose = require("mongoose");
const userSchematask = new mongoose.Schema(
    {
      name:String,
      task:String,
      description:String,
      status:String,
      duration:String,
      notification:Number,
      rannumber:Number,
      comments:String
     },
     { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
  );
  module.exports = mongoose.model("tasks", userSchematask);