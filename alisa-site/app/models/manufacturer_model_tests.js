const ManufacturerModel = require('./manufacturer_model');

ManufacturerModel.getAll().then(resp=>{
    console.log(resp);
});