let express = require('express');
let router = express.Router();

let Products = require('../../models/products');
let left_menu = require('../../models/left_menu');

const SeoModel = require('../models/seo_model');

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
        res.render('main_page/index.ejs', {
            seo: seo_call
            , categories: categories
            , products_new: products_new
            , products_popular: products_popular
            , discont: discont
            , manufacturer: manufacturer
        });
    }


});

module.exports = router;
