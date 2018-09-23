const express = require('express');
const ProductModel = require("../models/product_model");
const router = express.Router();



router.post('/', function (req, res) {
    res.send('POST request to the homepage');
});

/*товар по id*/
router.post('/get', async (req, res, next) => {
    /* формируем ответ */
    let resp = {
        product: false
    };
    if (req.body.id == null) {
        res.json(resp);
    } else {
        try {
            resp.product = await ProductModel.get(req.body.id);
            res.json(resp);
        } catch (e) {
            resp.e = e;
            res.json(resp);
        }
    }
});

module.exports = router;