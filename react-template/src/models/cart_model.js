import {rest_server} from './settings';
// выдает содержимое корзины по серверу
export function getCartRest() {
  // формируем массив из localStorage
  let data = window.localStorage.getItem('cart');
  if (data == null) {
    data = [];
  } else {
      data = JSON.parse(data);
  }

    return new Promise(function (resolve, reject) {
      $.ajax({
        type: "POST", url: rest_server + "cart/get",
        // The key needs to match your method's input parameter (case-sensitive).
        data: JSON.stringify({cart: data}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
          resolve(data);
        },
        failure: function(errMsg) {
          reject(errMsg);
        }
      });
    });
}
