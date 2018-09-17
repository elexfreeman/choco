let conn = require('../db');
let urlGen = require('../libs/urlGen');

function get(products) {
  return new Promise(function(resolve, reject) {

    let sql = "select * from products p where (p.id in (" + products + ") ) and (p.deleted = 0) order by p.caption";
    conn.query(sql, [], function(data, err) {
      if (!err) {
        data = JSON.parse(JSON.stringify(data));
        if (data.length > 0) {
          resolve(data);
        } else {
          resolve(false);
        }

      } else {
        reject(err);
      }
    });
  });
}

if (module.parent) {
  module.exports = {
    get: get
  }
} else {

  get([1,2,3,4,5]).then((products)=>{
    console.log(products);
  })

}
