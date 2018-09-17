const express = require('express');
const Login = require('./login');
const router = express.Router();
const url = require('url');

/*генерирует одноразовый пароль по телефону*/
/*если юзера не существ заводит его*/
router.post('/generateSmsPass', (req, res) => {
    Login.generateSmsPass(req.body.phone).then(pass => {
        res.json({error: false, pass: pass});
    }).catch(e => {
        res.json({error: true, e: e});
    })
});

/*логинит юзера по паролю*/
router.post('/login', (req, res) => {
    Login.getUserLastSmsPass(req.body.phone).then(pass => {
        if (pass == req.body.pass) {
            Login.getInfoByPhone(req.body.phone)
                .then(user => res.json({error: false, user: user}))
                .catch(e => res.json({error: true, e: e}));
        } else {
            /*тут нужно отправлять новый пароль*/
            res.json({error: true, apiKey: apiKey});
        }

    }).catch(e => {
        res.json({error: true, e: e});
    })
});

router.post('/', (req, res) => {
    res.send('POST request to the homepage');
});

router.get('/', (req, res) => {
    res.send('POST request to the homepage');
});


module.exports = router;