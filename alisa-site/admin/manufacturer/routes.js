const express = require('express');
const router = express.Router();

const ManufacturerModel = require('../../app/models/manufacturer_model');


router.get('/getAll', (req, res, next) => {
    ManufacturerModel.getAll().then(resp => {
        res.json(resp);
    });
});


module.exports = router;
