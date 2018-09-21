let express = require('express');
let router = express.Router();
let Categories = require('../../models/categories');
let left_menu = require('../../models/left_menu');
let Products = require('../../models/products');
const ver = require("../../ver");
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
        /* seo */
        let title = 'Rouse.One - ' + category.caption;
        let description = 'Rouse.One - Интернет магазин экологичекий косметики';
        let keywords = '';
        category.products = resp;

        res.render('category_page/index', {
            title: title,
            description: description
            ,ver: ver,
            keywords: keywords,
            category: category,
            categories: categories
            , products_new: products_new
            , products_popular: products_popular
            , discont: discont
            , Url: Url
            , manufacturer: manufacturer
        });
    });

});

module.exports = router;
