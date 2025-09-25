const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

//@desc View all user 
//@route GET /api/users
//@access public
const allUser = asyncHandler(async(req, res) => {
    const Users = await User.find();
    console.log("Fetched users:", Users.length);
    // res.json(Users);
    res.render("userView", { Users });
});

//@desc Register a user 
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400); //show this status 
        throw new Error("all fields required");
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400); //show this status 
        throw new Error("Email already exists");
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        name,
        email,
        password: hashpassword
    });
    console.log('Created user:', user);
    if (user) {
        res.json({ _id: user.id, email: user.email })
    } else {
        res.status(400); //show this status 
        throw new Error("user data not valid");
    }

});


//@desc Login user 
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async(req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400); //show this status 
        throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
                user: {
                    username: user.name,
                    email: user.email,
                    id: user.id
                },
            },
            process.env.ACCESS_TOKEN_SECRET
        );
        res.status(200).json(accessToken)
    } else {

        res.status(401); //show this status 
        throw new Error(`Email and password are not valid  ${user}`);
    }

});


//@desc Get current user 
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async(req, res) => {
    res.json({ message: "current user" })
});

module.exports = { allUser, registerUser, loginUser, currentUser };