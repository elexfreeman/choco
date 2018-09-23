const express = require('express');
const ProductsModel = require("../models/products_model");
const router = express.Router();


router.post('/', function (req, res) {
    res.send('POST request to the homepage');
});

/*Спсок товаров*/
router.post('/get', async (req, res, next) => {
    /* формируем ответ */
    let resp = {
        products: false
        ,total: 0
    };

    if ((req.body.limit == null) || (req.body.offset == null)) {
        res.json(resp);
    } else {
        try {
            resp.products = await ProductsModel.get(parseInt(req.body.offset), parseInt(req.body.limit));
            resp.total = await ProductsModel.getTotal();
            res.json(resp);
        } catch (e) {
            resp.e = e;
            res.json(resp);
        }
    }
});

module.exports = router;