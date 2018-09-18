let express = require('express');
let router = express.Router();
let Categories = require('../../models/categories');
let left_menu = require('../../models/left_menu');
let Products = require('../../models/products');
const SeoModel = require("../models/seo_model");
/* GET home page. */
router.get('/', function (req, res, next) {

    let Url = req.baseUrl.replace('\\', '');
    Url = Url.replace('/', '');
    Url = Url.split('/');
    Url = Url[1];


    let category = {};
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
        return Categories.getCategoryByUrl(Url);
        //
    }).then(resp => {
        category = resp;
        return Categories.getProducts(Url);

    }).then(resp => {

        category.products = resp;
        return SeoModel.Get('category');


    }).then(seo => {
        seo_call = seo;
        res.render('category_page/index', {
            seo: seo_call
            , categories: categories
            , category : category
            , products_new: products_new
            , products_popular: products_popular
            , discont: discont
            , Url: Url
            , manufacturer: manufacturer
        });
    }).catch(e => {
        res.render('category_page/index', {
            seo: seo_call
            , categories: categories
            , category : category
            , products_new: products_new
            , products_popular: products_popular
            , discont: discont
            , Url: Url
            , manufacturer: manufacturer
            , e: e
        });
    });

});

module.exports = router;
