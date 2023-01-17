const mongoose = require("mongoose");




const wlSchema = new mongoose.Schema(
  {
   
    wallet: { type: String, required: true },
    discord: { type: String},


  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);



module.exports = mongoose.model("Wl", wlSchema);

