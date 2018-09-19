const express = require('express');
const router = express.Router();
const UserModel = require('../models/user_model');
const OrderModel = require('../models/order_model');
const Order = new OrderModel;

router.post('/', function (req, res) {
    res.send('POST request to the homepage');
});

/*создает заказ*/
router.post('/get', (req, res, next) => {
    /* формируем ответ */
    let resp = {
        user: false
        , order: false
        , e: false
    };

    if (req.body.apiKey !== undefined) {
        /* получаем ину о юзере */
        UserModel.getUserInfoByApiKey(req.body.apiKey).then(user => {
            /* user_id в ответ */
            resp.user = user;
            /* выбираем заказ */
            return Order.Get(req.body.order_id, user.id);
        })
            .then(o => {
                /* вслучае если все ок */
                resp.order = o;
                return Order.GetOrderProducts(o.id);
            }).then(products => {
            resp.order.products = products;
            res.json(resp)
        })
            .catch(e => {
                resp.e = e;
                res.json(resp)
            });

    } else {
        res.json(resp);
    }
});

/*создает заказ*/
router.post('/create', (req, res, next) => {
    /* формируем ответ */
    let resp = {
        user: false
        , order_id: 0
    };
    if (req.body.apiKey !== undefined) {
        /* получаем ину о юзере */
        UserModel.getUserInfoByApiKey(req.body.apiKey).then(user => {
            resp.user = user;
            /* собираем заказ */
            let o = JSON.parse(req.body.order);
            o.user_id = resp.user.id;
            o.status = Order.ORDER_NEW;
            /* создаем заказ */
            return Order.Create(o);
        })
            .then(order_id => {
                /* вслучае если все ок */
                resp.order_id = order_id;
                res.json(resp)
            })
            .catch(e => res.json(resp));

    } else {
        res.json(resp);
    }
});


/*инфа об юзере по api_key*/
router.post('/update', (req, res, next) => {
    /*проверяем вх параментры*/
    if (req.body.apiKey !== undefined) {
        UserModel.getUserInfoByApiKey(req.body.apiKey).then(user => {
            UserModel.update(user.id, req.body).then(resp => {
                return UserModel.getUserInfoByApiKey(req.body.apiKey);
            }).then(user => res.json({user: user}));

        }).catch(e => res.json({user: false}));

    } else {
        res.json({user: false});
    }
});


module.exports = router;