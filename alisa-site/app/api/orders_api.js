const express = require('express');
const router = express.Router();
const UserModel = require('../models/user_model');
const OrdersModel = require('../models/orders_model');
let Orders = new OrdersModel;

router.post('/', function (req, res) {
    res.send('POST request to the homepage');
});

/*списокзаказов*/
router.post('/get', (req, res, next) => {   
    /* формируем ответ */
    let resp = {
        user: false
        , orders: []
    };    
    console.log(req.body);
    if (req.body.apiKey !== undefined) {
        /* получаем ину о юзере */
        UserModel.getUserInfoByApiKey(req.body.apiKey).then(user => {
            /* user_id в ответ */
            resp.user = user;
            /* выбираем заказ */
            return Orders.Get(user.id, req.body.offset, req.body.limit);
        })
            .then(o => {
                /* вслучае если все ок */
                resp.orders = o;
                res.json(resp)
            })
            .catch(e => res.json(resp));

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
            }).then(user => res.json({ user: user }));

        }).catch(e => res.json({ user: false }));

    } else {
        res.json({ user: false });
    }
});


module.exports = router;