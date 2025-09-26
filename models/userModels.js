//structure of the data in database



const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]

}, {
    timestamps: true,

});

//generate tokens
userSchema.methods.generateAuthToken = (async function() {
    try {
        const token = await jwt.sign({ _id: this._id.toString() }, process.env.ACCESS_TOKEN_SECRET)
        this.tokens = this.tokens.concat({ token: token })
        await this.save()
        return token;
    } catch (error) {
        throw new Error("Token generation failed: " + error.message);
    }
})

module.exports = mongoose.model("User", userSchema);