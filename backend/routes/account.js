const express = require("express");
const { authMiddleware } = require("../middlewares");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");
const accountRouter = express.Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    // i think here should be req.body.userId
    // This is right because in authMiddlewares we initialize req.userId to needed userId not req.body.userId
    userId: req.userId,
  });

  console.log(account);
  res.json({
    balance: account.balance,
  });
});

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;

  const account = await Account.findOne({ userId: req.userId }).session(
    session
  );

  if (amount < 0) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "You can't send minus amount buddy",
    });
  }

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient amount",
    });
  }

  const toAccount = await Account.findOne({ userId: to }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  );
  await Account.updateOne({ userId: to }, { $inc: { balance: amount } });

  await session.commitTransaction();
  console.log("done!");

  res.json({
    message: "Transfer successful",
  });
});

//  this solution is good but not great dut to concurrency problem
//  if the node server or the database shut down then the transaction could failed and it will be very hard to revert the transaction
//  the better way to do the transaction is to user the session in the database

// accountRouter.post("/transfer", authMiddleware, async(req,res)=>{
//     const {amount , to} = req.body;
//     const account = await Account.findOne({
//         userId: req.userId
//     })

//     if(account.balance < amount){
//         return res.status(400).json({
//             message: "Insufficient amount"
//         })
//     }

//     const toAccount = await Account.findOne({
//         userId: to
//     })

//     if(!toAccount){
//         return res.status(400).json({
//             message: "Invalid account"
//         })
//     }

//     await Account.updateOne({
//         userId: req.userId
//     },{
//         $inc: {
//         balance: -amount
//         }
//     })

//     await Account.updateOne({
//         userId: to
//     },{
//         $inc: {
//         balance: amount
//         }
//     })

//     res.json({
//         message: "Transfer successful"
//     })
// })

module.exports = {
  accountRouter,
};
