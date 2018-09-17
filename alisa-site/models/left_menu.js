let conn = require('../db');


// выбирает только с пометкой 
function get() {
    return new Promise(function (resolve, reject) {

        let sql = "select * from categories c where (c.in_menu = 1) and (deleted = 0)";
        conn.query(sql, [], function (data, err) {
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
    module.exports = get
} else {

  get().then((data) => {
    console.log(data);
  })

}
