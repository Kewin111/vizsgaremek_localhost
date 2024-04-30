const express = require('express');
const connection = require('../../middleware/database.js');
const upload = require('../../middleware/upload.js');
const router = express.Router();

// egy felhasználó adatainak lekérdezése
router.get('/getUser/:emailFromCookie', (req, res) => {
    const email = req.params.emailFromCookie;

    connection.query('SELECT userid, email, nick_name, role, userImage, DATE_FORMAT(birthday, "%Y-%m-%d") AS formattedBirthday FROM user WHERE email=?', [email], (err, result) => {
        res.json(result);
    });
});

module.exports = router;