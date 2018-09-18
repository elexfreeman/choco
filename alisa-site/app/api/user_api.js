const express = require('express');
const router = express.Router();
const UserModel = require('../../models/user_model');


router.post('/', function (req, res) {
    res.send('POST request to the homepage');
});


/*инфа об юзере по api_key*/
router.post('/getUserInfo', (req, res, next) => {
    /*проверяем вх параментры*/
    if (req.body.apiKey !== undefined) {
        UserModel.getUserInfoByApiKey(req.body.apiKey).then(user => {
            res.json({ user: user });
        }).catch(e => res.json({ user: false }));

    } else {
        res.json({ user: false });
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