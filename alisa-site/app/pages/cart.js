const express = require('express');
const router = express.Router();

const CartModel = require('../models/cart_model');
const left_menu = require('../../models/left_menu');
const SeoModel = require("../models/seo_model");

const ver = require("../../ver");

/* GET home page. */
router.post('/get', function (req, res, next) {

    if (req.body.cart == null) {
        res.json({'error': 1, 'products': {}});
    } else {
        // перебераем cart
        let to_model = req.body.cart.map((item, key) => {

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
                    req.body.cart.map((item_b, key) => {
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

/* GET home page. */
router.get('/', async function (req, res, next) {

    /*категории*/
    let categories = [];
    /*популярные*/
    let products_popular = [];
    /*новые*/
    let products_new = [];
    /*акции*/
    let discont = [];
    let manufacturer = [];
    let seo_call = {};

    try {
        categories = await left_menu();
        products_popular = await Products.getPopular();
        products_new = await Products.getByCategoryId(11, 10);
        discont = await Products.getDiscont(5);
        seo_call = await SeoModel.Get('main');
    } catch (e) {
        console.log(e);
    } finally {
        res.render('cart_page/index.ejs', {
            seo: seo_call
            , base: '/'
            ,ver: ver
            , categories: categories
            , products_new: products_new
            , products_popular: products_popular
            , discont: discont
            , manufacturer: manufacturer
        });
    }



});

module.exports = router;
