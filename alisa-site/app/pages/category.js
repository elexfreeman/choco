const express = require('express');
const router = express.Router();
const Categories = require('../../models/categories');
const left_menu = require('../../models/left_menu');
const Products = require('../../models/products');
const SeoModel = require("../models/seo_model");
const ver = require("../../ver");
/* GET home page. */
router.get('/', async function (req, res, next) {

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


    try {

        categories = await left_menu();
        products_popular = await Products.getPopular();
        products_new = await Products.getDiscont(5);
        discont = await Products.getDiscont(5);
        category = await Categories.getCategoryByUrl(Url);
        category.products = await Categories.getProducts(Url);
        seo_call = await SeoModel.Get('category');
    } catch (e) {
        console.log(e);
    } finally {
        res.render('category_page/index', {
            seo: seo_call
            , base: '/'
            ,ver: ver
            , categories: categories
            , category: category
            , products_new: products_new
            , products_popular: products_popular
            , discont: discont
            , Url: Url
            , manufacturer: manufacturer

        });
    }

});

module.exports = router;
