import React from 'react';
import {Route, Switch} from 'react-router-dom'

import CartComponent from "./CartComponent";
import DeliveryComponent from "./DeliveryComponent";

const CartApp = () => {

    /*проверяем url*/
    let url_prifix = '/cart/';
    let url_main = '/cart';
    if(window.location.host == 'localhost:8080') {
        url_prifix = '/';
        url_main = '/'
    }
    return (

        <div>
            <Switch>
                <Route exact path={url_main} component={CartComponent}/>
                <Route path={url_prifix + 'delivery'} component={DeliveryComponent}/>
            </Switch>
        </div>
    )
};

export default CartApp;