const express = require('express');
const connection = require('../../middleware/database.js');
const upload = require('../../middleware/upload.js');
const router = express.Router();

// oltonyok lekérdezése route
router.get('/oltony', function (req, res) {
    connection.query('SELECT * FROM oltonyok', (err, result) => {
        res.json(result);
    });
});

// egy konkrét oltony lekérdezése productid alapján route
router.get('/oltony/:id', function (req, res) {
    const id = req.params.id;

    connection.query('SELECT * FROM oltonyok WHERE productid=?', [id], (err, result) => {
        res.json(result);
    });
});

// oltony létrehozása route
router.post('/ujOltony', upload.single('image'), function (req, res) {
    const { brand, model, ar, db } = req.body; // destruktálás = szétbontás
    const imageName = req.file ? req.file.filename : 'no_image.png';
    //console.log(brand, model, ar, db, imageName);
    connection.query('INSERT INTO oltonyok(productid, brand, model, image, price, stock) VALUES (NULL, ?, ?, ?, ?, ?)', [brand, model, imageName, ar, db], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.json("Sikeres felvétel!");
    });
});

// oltony törlése route
router.delete('/oltony/:id', function (req, res) {
    const id = req.params.id;

    connection.query('DELETE FROM oltonyok WHERE productid=?', [id], (err, result) => {
        res.json("Sikeres törlés!");
    });
});

// oltony szerkesztése route
router.put('/oltony/:id', upload.single('image'), function (req, res) {
    const id = req.params.id;
    const { brand, model, price, stock } = req.body;
    const imageName = req.file ? req.file.filename : null;

    connection.query('UPDATE oltonyok SET brand = ?, model = ?, image = COALESCE(?, image), price = ?, stock = ? WHERE productid = ?;', [brand, model, imageName, price, stock, id], (err, result) => {
        res.json("Sikeres módosítás!");
    });
});

// oltonyok közti keresés
router.post('/searching', function (req, res) {
    const searching = req.body.searching;

    connection.query('SELECT * FROM oltonyok WHERE brand LIKE CONCAT("%", ?, "%") OR model LIKE CONCAT("%", ?, "%")', [searching, searching], (err, result) => {
        res.json(result);
    });
});

// oltonyok közti keresés userid alapján
router.post('/searchingUser/:id', function (req, res) {
    const id = req.params.id;
    const searching = req.body.searching;

    connection.query('SELECT * FROM oltony WHERE name LIKE CONCAT("%", ?, "%") OR model LIKE CONCAT("%", ?, "%");', [searching, searching], (err, result) => {
        if (err) {
            console.log(err);
        }
        //console.log(result);
        res.json(result);
    });
});

// az ár kiszámítása és az elérhető darabszám csökkentése
router.post('/ordering/:id', function (req, res) {
    const id = req.params.id;
    const stock = req.body.stock;
    console.log(id, stock);
    connection.query('SELECT stock, price FROM oltonyok WHERE productid = ?', [id], (err, result) => {
        if (result[0].stock >= stock) {
            const buy = result[0].stock - stock;
            const price = result[0].price * stock;
            console.log(buy, price);

            connection.query('UPDATE oltonyok SET stock = ? WHERE productid = ?', [buy, id], (err, result2) => {
                res.send({ success: true, price: price });
            })
        } else {
            res.send({ success: false, available: result[0].stock });
        }
    });
});

// a rendelés leadása
router.post('/payment', function (req, res) {
    const { price, productid, userid } = req.body;

    const date = new Date();
    const order_date = date.toISOString().slice(0, 19).replace('T', ' ');

    connection.query('INSERT INTO ordering(orderid, userid, productid, order_date, price) VALUES (NULL, ?, ?, ?, ?)', [userid, productid, order_date, price], (err, result) => {
        res.json({ success: true })
    })
});

module.exports = router;