const express =  require('express');
const handleContact = require('../controllers/contactController')

const router = express.Router();

router.post("/", handleContact);

module.exports = router;