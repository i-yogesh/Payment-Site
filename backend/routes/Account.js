const express = require("express"); 
const {default: mongoose} = require("mongoose");
const {authMiddleWare} = require("../middleware")
const {Account} = require("../db")
const router = express.Router();
router.use(express.json());
router.get("/Balance", authMiddleWare, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        Balance: account.Balance,
        userId:req.userId
    })
});
router.post("/transfer", authMiddleWare, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { amount, to } = req.body;

        // Fetch the accounts within the transaction
        console.log(req.userId);
        const account = await Account.findOne({ userId: req.userId }).session(session);
        console.log(1);

        if (!account || account.Balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient Balance"
            });
        }

        const toAccount = await Account.findOne({ userId: to }).session(session);

        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid account"
            });
        }

        // Perform the transfer
        await Account.updateOne({ userId: req.userId }, { $inc: { Balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { Balance: amount } }).session(session);

        // Commit the transaction
        await session.commitTransaction();
        res.json({
            message: "Transfer successful"
        });
    } catch (err) {
        console.error(err);
        await session.abortTransaction();
        res.status(500).json({
            message: "Transfer failed"
        });
    } finally {
        session.endSession();
    }
});
module.exports = router;