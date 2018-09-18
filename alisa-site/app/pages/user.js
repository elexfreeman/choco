const express = require('express');
const router = express.Router();

let left_menu = require('../../models/left_menu');

const SeoModel = require('../models/seo_model');

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
    let seo_call = {};


    left_menu().then((c) => {
        categories = c;       
        return Products.getDiscont(5);
    }).then(resp => {
        discont = resp;
        return SeoModel.Get('main');

    }).then(seo => {
        seo_call = seo;
        res.render('main_page/index.ejs', {
            seo: seo_call
            , categories: categories          
            , discont: discont
            , manufacturer: manufacturer
        });
    }).catch(e => {
        res.render('user/user.ejs', {
            seo: seo_call
            , categories: categories           
            , discont: discont
            , manufacturer: manufacturer
        });
    });

});


module.exports = router;