//to handle all the routes

const express = require("express");
const router = express.Router();
//using the controller
const { getContacts, createContacts, getContact, updateContacts, deleteContacts } = require("../controllers/contactControllers");
router.route("/").get(getContacts);
router.route("/").post(createContacts);
router.route("/:id").get(getContact);
router.route("/:id").put(updateContacts);
router.route("/:id").delete(deleteContacts);

//if the router are same then we can also group together to decrease line
// router.route("/").get(getContacts).post(createContacts);
// router.route("/:id").put(updateContacts).delete(deleteContacts);



//using without controller
// router.route("/").get((req, res) => {
//     res.json({ message: "get all contacts" })
// })
// router.route("/").post((req, res) => {
//     res.json({ message: "create contacts" })
// })
// router.route("/:id").put((req, res) => {
//     res.json({ message: `update contacts for $(res.params.id)` })
// })
// router.route("/:id").delete((req, res) => {
//     res.json({ message: `delete contacts for $(res.params.id)` })
// })

module.exports = router;