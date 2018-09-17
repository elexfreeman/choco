import {cartUpdate, cartGetAll, cartRemove, cartAdd} from '../../cart/Cart';

import {getCartRest} from '../../models/cart_model';

/*событие добавления в корзину*/
export const onAddCart = (args) => dispatch => {
    /*превращаем все в int*/
    cartAdd({
        productId: args.productId,
        count: args.count
    });

    getCartRest().then((data) => {
        dispatch({type: 'ADD_CART', payload: data.products})
    });
};

/*ифа о корзине*/
export const onGetCart = () => dispatch => {
    getCartRest().then((data) => {
        dispatch({type: 'CART_GET', payload: data.products})
    });
};


/*изменение кол-ва тавара в корзине*/
export const onChangeCount = (args) => {
    /*обновляем localStorage*/
    cartUpdate({productId: args.productId, count: args.count});
    /*обновляем store*/
    return {
        type: 'CART_CHANGE_COUNT'
        /*переписываем store*/
        , payload: args.cart.map((item) => {
            /*если id овпадают то меняем кол-во*/
            /*это важно прии обновлении*/
            if (item.id === args.productId) {
                item.count = args.count
            }
            return item;
        })
    }
};

/*удаление*/
export const onDelete = (productId) => {
    cartRemove(productId);

    return {
        type: 'CART_DELETE'
        , payload: cartGetAll()
    }
};

