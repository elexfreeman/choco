/*молудь массива корзины*/
let cart = [];

function init() {
    let tmp = window.localStorage.getItem('cart');
    if (tmp == null) return {};
    cart = JSON.parse(tmp);
    console.log('Cart class');
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
        if (cart[key].productId === productId) {
            /*если совпадают то присваиваем*/
            res = {
                item: cart[key],
                item_id: key
            }
        }
    }
    return res;
}


export function cartUpdate(item) {
    init();
    let tItem = cartGet(item.productId);
    if (tItem == null) return false;
    cart[tItem.item_id] = item;
    saveState();
    return true;
}

/*добовляет элемент в корзину*/
export function cartAdd(item) {
    init();
    if(!cartInsert(item)){
        cartUpdate(item);
    }
}


function cartInsert(item) {
    init();
    let tItem = cartGet(item.productId);
    if (tItem == null) {
        cart.push(item);
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
        cart.splice(tItem.productId, 1);
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
