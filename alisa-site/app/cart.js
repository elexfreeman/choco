let express = require('express');
let router = express.Router();

let cart_model = require('../models/cart');
let left_menu = require('../models/left_menu');
let Products = require('../models/products');

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
            cart_model.get(to_model).then((products) => {
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
            });
        } else {
            res.json({'error': 0, 'products': cart_resp_products});
        }

    }

});

/* GET home page. */
router.get('/', function (req, res, next) {


    let Url = req.baseUrl.replace('\\', '');
    Url = Url.replace('/', '');
    let categories = [];
    let product = {};

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

    }).then(resp=>{

        product = resp;
        /*seo*/
        let title = 'Rouse.One - ' + product.caption;
        let description = 'Rouse.One - Интернет магазин экологичекий косметики';
        let keywords = '';


        if (typeof product.description === 'string')
            product.description = product.description.replace(/\r\n|\r|\n/g, "<br />");

        res.render('cart_page/index', {
            title: title
            , description: description
            , keywords: keywords
            , product: product
            , categories: categories
            , Url: Url
            , base_href: 'cart'
            , products_new: products_new
            , products_popular: products_popular
            , discont: discont
            , manufacturer: manufacturer
        });


    });


});

module.exports = router;
