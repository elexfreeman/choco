let express = require('express');
let router = express.Router();

let left_menu = require('../../models/left_menu');
let Products = require('../../models/products');


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

        return Products.getByUrl(Url);

    }).then(product => {
        /*seo*/
        let title = 'Rouse.One - ' + product.caption;
        let description = 'Rouse.One - Интернет магазин экологичекий косметики';
        let keywords = '';


        if (typeof product.description === 'string')
            product.description = product.description.replace(/\r\n|\r|\n/g, "<br />");

        res.render('product_page/index', {
            title: title
            , description: description
            , keywords: keywords
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
