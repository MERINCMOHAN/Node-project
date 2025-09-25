//structure of the data in database



const mongoose = require("mongoose");
const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "please add name"]
    },
    email: {
        type: String,
        required: [true, "please add email"]
    }

}, {
    timestamps: true,

});
module.exports = mongoose.model("contacts", contactSchema);