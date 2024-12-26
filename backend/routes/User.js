const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config")
const router = express.Router();
const {User,Account} = require("../db");
const { authMiddleWare } = require("../middleware");
router.use(express.json());
const SignupZod = zod.object({
    username: zod.string(),
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string()
}
)
//SignUp
router.post("/signup",async function(req,res){
    console.log(req.body);
    const isSuccess = SignupZod.safeParse(req.body);
    console.log("Validation Result:", isSuccess.success);
    if(!isSuccess.success){
        return res.status(403).json({msg:"error in this"});
    }
    const user = await User.findOne({
        username:req.body.username
    })
    console.log(user);
    console.log(req.body.username);
    if(user){
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }
    const dbUser = await User.create(
        {
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
        }
    )
    const userId = dbUser._id;
    await Account.create({
        userId,
        Balance: 1+Math.random()*1000
    })
    const token = jwt.sign({userId},JWT_SECRET);
    console.log("index ka "+token);
    res.status(200).json({
        userId:userId,
        token: token
    })
})
const SigninZod = zod.object({
    username:zod.string(),
    password:zod.string()
})
router.post("/signin", async function(req,res){
    // const body = req.body;
    const isSuccess = SigninZod.safeParse(req.body);
    if(!isSuccess.success){
        return res.status(403).json({msg:"error"});
    }
    const user = await User.findOne({
        username:req.body.username,
        password: req.body.password
    })
    if(user){
        const token = jwt.sign({userId:user._id},JWT_SECRET);
        res.json({token:token});
        return ;
    }
    res.status(411).json({
        message: "User Account doesn't exsist"
    })
})

const UpdateZod = zod.object({
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional()
})
router.put("/",authMiddleWare,async (req,res)=>{
    const isSuccess = UpdateZod.safeParse(req.body);
    if(!isSuccess.success){
        return res.status(411).json({msg:"not entered any details or invalid user"});
    }
    console.log(req.userId);
    await User.updateOne({
        _id:req.userId
    },{ $set: req.body })
    res.status(200).json({msg:"done"});
})
router.get("/bulk", async (req, res) => {
    const filter = req.query.filter ? req.query.filter.trim() : "";
    console.log("filter = "+filter)
    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": "^.*" + filter + ".*$",
                "$options": "i"
            }
        }, {
            lastName: {
                "$regex": "^.*" + filter + ".*$",
                "$options": "i"
            }
        }]
    })
    console.log(users);
    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})
router.get("/name",authMiddleWare,async (req,res)=>{
    console.log(req.userId);
    let resp = await User.findOne({
        _id:req.userId
    })
    console.log(resp)
    res.status(200).json({name:resp.firstName,userId:req.userId});
})
module.exports = router;
