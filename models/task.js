const mongoose = require("mongoose");




const taskSchema = new mongoose.Schema(
  {
    twitter: { type: String , required: true, unique: true},
    retweet: { type: String, required: true, unique: true },
    wallet: { type: String, required: true },
    wl: { type: Boolean, default:false},


  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);



module.exports = mongoose.model("Task", taskSchema);

