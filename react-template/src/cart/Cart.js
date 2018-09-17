/*молудь массива корзины*/
let cart = [];

/*[{"productId":1,"count":2},{"productId":2,"count":2},{"productId":3,"count":2},{"productId":4,"count":2}]*/

function init() {
    let tmp = window.localStorage.getItem('cart');
    if (tmp == null) return {};
    cart = JSON.parse(tmp);
}

// сохранет в localStorage
function saveState() {
    window.localStorage.setItem('cart', JSON.stringify(cart))
}


/*выдает элемент по номеру корзины*/
export function cartGet(productId) {
    init();
    /*null по умолчанию*/
    let res = null;

    for (let key in cart) {
        /*сравниеваем offerNum*/
        if (parseInt(cart[key].productId) === parseInt(productId)) {
            /*если совпадают то присваиваем*/
            res = {
                item: cart[key],
                item_id: key
            }
        }
    }
    return res;
}


function cartUpdateAdd(item) {
    init();
    let tItem = cartGet(item.productId);
    if (tItem == null) return false;
    cart[tItem.item_id] = {
        productId: parseInt(item.productId)
        , count: cart[tItem.item_id].count + parseInt(item.count)
    };
    saveState();
    return true;
}

export function cartUpdate(item) {
    init();
    let tItem = cartGet(item.productId);
    if (tItem == null) return false;
    cart[tItem.item_id] = {
        productId: parseInt(item.productId)
        , count: parseInt(item.count)
    };
    saveState();
    return true;
}

/*добовляет элемент в корзину*/
export function cartAdd(item) {
    init();
    if (!cartInsert(item)) {
        cartUpdateAdd(item);
    }
}


function cartInsert(item) {
    init();
    let tItem = cartGet(item.productId);
    if (tItem == null) {
        cart.push({
            productId: parseInt(item.productId)
            , count: parseInt(item.count)
        });
        saveState();
        return true;
    } else {
        return false;
    }
}

/*удаляет*/
export function cartRemove(productId) {
    init();
    let tItem = cartGet(productId);
    if (tItem == null) {
        return false
    } else {
        cart.splice(tItem, 1);
        saveState();
        return true;
    }
}

/*выдает все*/
export function cartGetAll() {
    init();
    return cart;
}

/*стирает все*/
export function cartClear() {
    init();
    cart = [];
    saveState();
}

/*выдает итоговую цену*/
export function cartGetTotalPrice() {
    init();
    let price = 0;
    for (let key in cart) {
        price += parseInt(cart[key].price) * parseInt(cart[key].count);
    }
    return price;
}


/*--- tests ---*/
