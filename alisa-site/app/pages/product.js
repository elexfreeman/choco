const express = require('express');
const router = express.Router();

const left_menu = require('../../models/left_menu');
const Products = require('../../models/products');
const SeoModel = require('../models/seo_model');
const ver = require("../../ver");
/* GET home page. */
router.get('/', async function (req, res, next) {

    let Url = req.baseUrl.replace('\\', '');
    Url = Url.replace('/', '');
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
    let product = {};

    try {
        categories = await left_menu();
        products_popular = await Products.getPopular();
        products_new = await Products.getByCategoryId(11, 10);
        discont = await Products.getDiscont(5);
        seo_call = await SeoModel.Get('main');
        product = await Products.getByUrl(Url);

        if (typeof product.description === 'string') {
            product.description = product.description.replace(/\r\n|\r|\n/g, "<br />");
        }

    } catch (e) {
        console.log(e);
    } finally {

        res.render('product_page/index', {
            seo: seo_call
            , base: '/'
            , originalUrl: req.originalUrl
            ,ver: ver
            , product: product
            , categories: categories
            , products_new: products_new
            , products_popular: products_popular
            , discont: discont
            , Url: Url
            , manufacturer: manufacturer
        });
    }

});

module.exports = router;
