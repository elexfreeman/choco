/*в store нужно держать все*/
let tmp = window.localStorage.getItem('cart');
if (tmp == null) {
    tmp = [];
} else {
    tmp = JSON.parse(tmp)
}

const initialState = [tmp];

export default function cart(state = [], action) {
    if (action.type === 'ADD_CART') {
        return action.payload;
    } else if (action.type === 'CART_DELETE') {
        return [
            action.payload
        ];
    } else if (action.type === 'CART_GET') {
        return action.payload;
    } else if (action.type === 'CART_CHANGE_COUNT') {
        return  action.payload;
    }
    return state;
}
