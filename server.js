const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const User = require("./models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
require("dotenv").config();
connectDb();
const port = process.env.PORT || 5000;
// app.get('/api/contacts', (req, res) => {
//     res.send("get all contacts");
// })

//res in json format
// app.get('/api/contacts', (req, res) => {
//     res.json({ message: "get all contacts" });
// })

//middleware for parsing the data
app.use(express.json());

app.use(express.urlencoded({ extended: true }));


// using the middleware that is "use"
app.use("/api/contacts", require('./routes/contactRoutes'))
app.use("/api/users", require('./routes/userRoutes'))

//custom middleware
app.use(errorHandler);


var contacts = require('./routes/contactRoutes');
var users = require('./routes/userRoutes');

//Use the Router on the sub route /contacts
app.use('/contacts', contacts);
app.use('/userlist', users);

app.set('view engine', 'pug');
app.set('views', './views');

app.get("/login", (req, res) => {
    res.render("login");
});

app.post('/login', async(req, res) => {
    try {
        let email = req.body.email
        let password = req.body.password
        let userEmail = await User.find({ email: email })
        const user = userEmail[0];
        // console.log("userpassword", user.password);
        // console.log("enteredpassword", password);

        //match hash password
        const isMatch = await bcrypt.compare(password, user.password)
            // console.log("matched or not", isMatch);
        if (isMatch) {
            // //token
            let token = await user.generateAuthToken()
            console.log("token", token)
                //cookies
            res.cookie('jwt', token, { expires: new Date(Date.now() + 60000), httpOnly: true })
            res.redirect("/userlist");
        } else {
            res.send('ERROR');
            console.log("error");
        }
    } catch (error) {
        res.status(401).send(error)
        console.log(error);
    }
})


// app.get('/userlist', function(req, res) {
//     res.render('userView', {
//         Users: [
//             users
//         ]
//     });
// });


app.listen(port, () => {
    console.log(`server running on ${port}`)
})