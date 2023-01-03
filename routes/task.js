const express = require("express");
const router = express.Router();
const Task = require("../models/task");






router.get("/", async (req, res) => {
  try {
    res.send("task")
 
  } catch (error) {
    
  }

})
router.post("/", async (req, res) => {
  try {

    // console.log('req1233', req.body)
   const {twitter, retweet, discord, account} = req.body
    const task = new Task({
      twitter: req.body.twitter,
      retweet: req.body.retweet,
      discord: req.body.discord,
      wallet: req.body.account,
      
    
    });

    const existingUser = await Task.findOne({ wallet: account });

    if (existingUser) {
      return res.status(201).json({
        message: "This Wallet is already registered",
        error: true,
      });
    }


    if (!twitter || !retweet || !discord || !account) {
      return res.status(200).json({
        error: true,
        message: "Enter All Fields",
      })} else {

      
    console.log('task', task)

    const newTask = await task.save();

    return res.status(200).json({
      success: true,
      message:'Submitted Successfully',
    task:newTask
    })};
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
});

module.exports = router;
