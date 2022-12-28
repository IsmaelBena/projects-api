const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const dotenv = require('dotenv');

// ==============================================================================================================================================================================

dotenv.config();

const isAuth = (req, res, next) => {
    console.log(req)
    const token = req.headers.token;
    if (token === process.env.AUTH_TOKEN) {
        next();
    }
    else {
        res.status(401).json({ validToken: false, message: 'Access forbidden: Incorrect authentication token'});
    }
}

// Check Authorization Token
router.get('/', isAuth, async (req, res) => {
    try {
        console.log(`Comparing recived token [${req.headers.token}] to server token [${process.env.AUTH_TOKEN}]`)
        res.status(200).json({ validToken: true, message: 'Valid token recieved'});
    }
    catch {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router