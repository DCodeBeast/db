const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const Wl = require("../models/wl");






// router.get("/", async (req, res) => {
//   try {
//     res.send("task")
 
//   } catch (error) {
    
//   }

// })

router.get("/wl/:id", async (req, res) => {
  try {

    const {id} = req.params
    console.log('reqforwl',req.body, id)
 

    if (!id) {
      return res.status(400).json({
        error: true,
        message: "Cannot Find Wallet.",
      });
    }

    //1. Find if any account with that email exists in DB
    const wl = await Wl.findOne({ wallet: id });
    console.log('wlnew',wl, id)

    // NOT FOUND - Throw error
    if (!wl) {
      return res.status(404).json({
        error: true,
        message: "Not Etherlisted",
      });
    }

    const updatedTask = await Task.findOneAndUpdate({wallet:id},{wl:true}, {
      new: true,
    });

    //Success
    return res.send({
      success: true,
      message: "Wallet is Etherlisted",
      activeTask: updatedTask,
    });
  } catch (err) {
    console.error("Login error", err);
    return res.status(500).json({
      error: true,
      message: "Couldn't login. Please try again later.",
    });
  }
});
router.get("/:id", async (req, res) => {
  try {

    const {id} = req.params
    console.log('req',req.body, id)
 

    if (!id) {
      return res.status(400).json({
        error: true,
        message: "Cannot Find Wallet.",
      });
    }

    //1. Find if any account with that email exists in DB
    const task = await Task.findOne({ wallet: id });

    // NOT FOUND - Throw error
    if (!task) {
      return res.status(404).json({
        error: true,
        message: "Not Registered Yet",
      });
    }



    //Success
    return res.send({
      success: true,
      message: "Task",
      activeTask: task,
    });
  } catch (err) {
    console.error("Login error", err);
    return res.status(500).json({
      error: true,
      message: "Couldn't login. Please try again later.",
    });
  }
});
router.post("/", async (req, res) => {
  try {

    // console.log('req1233', req.body)
   const {twitter, retweet, discord, account} = req.body
    const task = new Task({
      twitter: req.body.twitter,
      retweet: req.body.retweet,
      wallet: req.body.account,
      
    
    });

    const existingUser = await Task.findOne({ wallet: account });

    if (existingUser) {
      return res.status(201).json({
        message: "This Wallet is already registered",
        error: true,
      });
    }


    if (!twitter || !retweet || !account) {
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
