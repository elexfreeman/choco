let express = require('express');
let router = express.Router();

let Products = require('../../models/products');
let left_menu = require('../../models/left_menu');

/*seo*/
let title = 'Rouse.One - Интернет магазин экологичекий косметики';
let description = 'Rouse.One - Интернет магазин экологичекий косметики';
let keywords = '';


/* GET home page. */
router.get('/', function (req, res, next) {

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
        res.render('main_page/index.ejs', {
            title: title
            , description: description
            , keywords: keywords
            , categories: categories
            , products_new: products_new
            , products_popular: products_popular
            , discont: discont
            , manufacturer: manufacturer
        });
    });

});

module.exports = router;
