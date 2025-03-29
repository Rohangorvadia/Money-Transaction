const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://rohangorvadia:*************@cluster0.fe754.mongodb.net/transaction")

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30,
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    lastName: {
        type: String,
        require: true,
        maxLength: 30
    },
    firstName: {
        type: String,
        require: true,
        maxLength: 30
    },

})

// here userId type is ObjectId and ref is User table that means userId will refer to the _id of User table due to ref is User
const accountSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true        
    },
    balance: {
        type: Number,
        required: true
    }
})

const User = mongoose.model('user',userSchema);
const Account = mongoose.model('account',accountSchema);

module.exports = {
    User,
    Account
}
