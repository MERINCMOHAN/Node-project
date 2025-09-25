const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");

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

// using the middleware that is "use"
app.use("/api/contacts", require('./routes/contactRoutes'))
app.use("/api/users", require('./routes/userRoutes'))

//custom middleware
app.use(errorHandler);


var contacts = require('./routes/contactRoutes');
var users = require('./routes/userRoutes');

//Use the Router on the sub route /contacts
app.use('/contacts', contacts);
app.use('/users', users);

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/userlist', function(req, res) {
    res.render('userView', {
        Users: [{
            name: 'meruin',
            email: 'gg'
        }]
    });
});


app.listen(port, () => {
    console.log(`server running on ${port}`)
})