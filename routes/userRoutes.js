const express = require("express");
const { allUser, registerUser, loginUser, currentUser } = require("../controllers/userControllers");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();
router.get("/", allUser);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateToken, currentUser);


module.exports = router;