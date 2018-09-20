const express = require('express');
const router = express.Router();

const CartModel = require('../models/cart_model');

/* GET home page. */
router.post('/get', function (req, res, next) {

    if (req.body.cart == null) {
        res.json({'error': 1, 'products': {}});
    } else {
        // перебераем cart
        let cart = JSON.parse(req.body.cart);
        let to_model = cart.map((item, key) => {

            if (typeof item.productId == 'string') {
                return parseInt(item.productId);
            } else if (typeof item.productId == 'number') {
                return item.productId;
            } else {
                return 0;
            }
        });

        let cart_resp_products = [];
        /*если есть продукты в корзине*/
        if (to_model.length > 0) {
            CartModel.Get(to_model).then((products) => {
                // собираем продукты
                cart_resp_products = products.map((product, key) => {

                    // проставляем кол-во
                    cart.map((item_b, key) => {
                        if (parseInt(item_b.productId) == product.id) {
                            product.count = item_b.count;
                        }
                    });

                    return product;
                });
                res.json({'error': 0, 'products': cart_resp_products});
            }).catch(e => {
                res.json({'error': 1, 'e': e});
            });
        } else {
            res.json({'error': 0, 'products': cart_resp_products});
        }

    }

});


module.exports = router;
