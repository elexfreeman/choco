const express = require('express');
const router = express.Router();

const left_menu = require('../../models/left_menu');
const Products = require('../../models/products');
const SeoModel = require('../models/seo_model');
const ver = require("../../ver");
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
        discont = await Products.getDiscont(5);
        seo_call = await SeoModel.Get('user');
    } catch (e) {
        console.log(e);
    } finally {
        res.render('user/user.ejs', {
            seo: seo_call
            , base: '/user/'
            ,ver: ver
            , categories: categories
            , discont: discont
            , manufacturer: manufacturer
        });
    }
});


module.exports = router;