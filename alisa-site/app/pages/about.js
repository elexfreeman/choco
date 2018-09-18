let express = require('express');
let router = express.Router();

let left_menu = require('../../models/left_menu');

const SeoModel = require('../models/seo_model');
/* GET home page. */
router.get('/', function (req, res, next) {

    let categories = [];

    left_menu().then((c) => {
        categories = c;
        return SeoModel.Get('');

    }).then(seo => {
        res.render('about', {
            seo: seo
            , categories: categories
        });
    });

});

module.exports = router;
