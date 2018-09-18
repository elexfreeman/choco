const express = require('express');
const router = express.Router();

const left_menu = require('../../models/left_menu');
const Products = require('../../models/products');
const SeoModel = require('../models/seo_model');

/* GET home page. */
router.get('/', function (req, res, next) {

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

    left_menu().then((c) => {
        categories = c;
        return Products.getPopular();

    }).then((popProducts) => {
        products_popular = popProducts;
        return Products.getByCategoryId(11, 10);
    }).then(resp => {
        products_new = resp;
        return Products.getDiscont(5);
    }).then(resp => {
        discont = resp;
        return SeoModel.Get('product');
    }).then(seo => {
        seo_call = seo;
        return Products.getByUrl(Url);
    }).then(product => {

        if (typeof product.description === 'string')
            product.description = product.description.replace(/\r\n|\r|\n/g, "<br />");

        res.render('product_page/index', {
            seo_call: seo_call
            , product: product
            , categories: categories
            , products_new: products_new
            , products_popular: products_popular
            , discont: discont
            , Url: Url
            , manufacturer: manufacturer
        });

    }).catch(e => {
        res.render('product_page/index', {
            seo_call: seo_call
            , product: product
            , categories: categories
            , products_new: products_new
            , products_popular: products_popular
            , discont: discont
            , Url: Url
            , manufacturer: manufacturer
        });
    });

});

module.exports = router;
