//structure of the data in database



const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "please add name"]
    },
    email: {
        type: String,
        required: [true, "please add email"],
        unique: [true, "mail id already taken"]
    },
    password: {
        type: String,
        required: [true, "please add user password"]
    }

}, {
    timestamps: true,

});
module.exports = mongoose.model("User", userSchema);