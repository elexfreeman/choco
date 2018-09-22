const express = require('express');
const fs = require('fs');
const router = express.Router();
const ImageResize = require('../models/image_resize_model');

/*создает заказ*/
router.get('/', async (req, res, next) => {
    console.log(__dirname);
    let img = req.baseUrl.replace('\\', '');
    img = img.replace('/', '');
    img = img.split('/');
    img = img[img.length - 1];


    try {
        let image = await ImageResize.Rx128w(img);
        let f = await fs.readFileSync(__dirname + "../../../public/" + image);
        res.writeHead(200, {'Content-Type': 'image/jpeg' });
        res.end(f, 'binary');
    } catch (e) {
        console.log(e);
        res.statusMessage = "File not found";
        res.status(400).end();
    }

});


module.exports = router;