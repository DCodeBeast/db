const mongoose = require("mongoose");




const taskSchema = new mongoose.Schema(
  {
    twitter: { type: String },
    retweet: { type: String, required: true, unique: true },
    discord: { type: String, required: true },
    wallet: { type: String, required: true },
    wl: { type: Boolean, default:false},


  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);



module.exports = mongoose.model("Task", taskSchema);

