//logic of the req res


const asyncHandler = require("express-async-handler"); //we wrap all the functions inside the asyncHandler
const Contact = require("../models/contactModels");

//@desc Get contact
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler(async(req, res) => {
    const contacts = await Contact.find();
    res.json(contacts);
});



//@desc create contact
//@route POST /api/contacts
//@access public
const createContacts = asyncHandler(async(req, res) => {
    console.log("the rquest body is", req.body);
    //if the body is empty still it shows blank json so we are using condition
    const { name, email } = req.body; //name and email from body
    if (!name || !email) {
        res.status(400); //show this status 
        throw new Error("all fields required");
    }
    const contact = await Contact.create({
        name,
        email
    });
    res.json(contact);
});

//@desc Get contact
//@route GET /api/contacts/:id
//@access public
const getContact = asyncHandler(async(req, res) => {
    const contacts = await Contact.findById(req.params.id);
    if (!contacts) {
        res.status(404);
        throw new Error("contact not found")
    }
    res.json(contacts);
});



//@desc update contact
//@route PUT /api/contacts/:id
//@access public
const updateContacts = asyncHandler(async(req, res) => {
    const contacts = await Contact.findById(req.params.id);
    if (!contacts) {
        res.status(404);
        throw new Error("contact not found")
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body, { new: true }
    );
    res.json(updatedContact);
});


//@desc delete contact
//@route DELETE /api/contacts:id
//@access public
const deleteContacts = asyncHandler((req, res) => {
    res.json({ message: `delete contacts for $(res.params.id)` })
});

module.exports = { getContacts, createContacts, getContact, updateContacts, deleteContacts };