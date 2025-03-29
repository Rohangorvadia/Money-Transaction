const express = require("express")
const userRouter = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken")
const { User, Account } = require("../db");
const JWT_SECRET = require("../config");
const { authMiddleware } = require("../middlewares");


const signupSchema = zod.object({
    userName: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})

const signinSchema = zod.object({
    userName: zod.string().email(),
    password: zod.string()
})

const updateSchema = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})


userRouter.post("/signup", async (req,res)=>{
    const body = req.body;
    const {success} = signupSchema.safeParse(body);

    if(!success){
        return res.status(400).json({
            message: "Invalid input"
        })
    }

    const existingUser = await User.findOne({
        userName: body.userName
    })

    if(existingUser){
        return res.status(400).json({
            message: "User already exist"
        })
    }
    
//  this user veriable contains firstName , lastName , userName, password and _id of the current user
    const user = await User.create(body);
    const userId = user._id;

    // this adds random amount of money in user's account 
    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000 
    })

    const token = jwt.sign({
        userId: user._id
    },JWT_SECRET)

    console.log("Token when signing up for first time")
    console.log(token);
    
    res.json({
        message: "User created successfully",
        token: token
    })
})
    
userRouter.post("/signin", async (req,res)=>{
    const {success} = signinSchema.safeParse(req.body);

    if(!(success)){
        return res.status(401).json({
            message: "Email already taken / Invalid input"
        })
    }

    const existingUser = await User.findOne({
        userName: req.body.userName,
        password: req.body.password
    });

    if(existingUser){
        const token = jwt.sign({
            userId: existingUser._id
        },JWT_SECRET)

        return res.json({
            token: token
        })
    }

    res.status(401).json({
        message:"Error while logging in"
    })

})


// We use this route to update password , firstName , lastName or any of these of the user
userRouter.put("/", authMiddleware ,async (req,res)=>{

    const {success} = updateSchema.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            message: "Error while updating information"
        })
    }

    const updatedUser = await User.updateOne(
        { id: req.userId },
        {
            $set: {
                firstName: req.body.firstName,
                password: req.body.password,
                lastName: req.body.lastName 
            }
        }
    );

    console.log(updatedUser)
    res.json({
        message: "Updated successfully.."
    })
})

userRouter.get("/bulk", authMiddleware ,async (req,res)=>{
    const filter = req.query.filter || "";
    const users = await User.find({
        $or:[{
            firstName:{
                "$regex": filter
            }
        },{
            lastName:{
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user=>({
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = userRouter;
    