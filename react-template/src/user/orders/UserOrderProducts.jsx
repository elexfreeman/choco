import React, { Component } from 'react';

import { OrderModel } from '../../models/order_model';
import {rest_server} from "../../models/settings";


// кнопка корзины в главном меню
class UserOrderProducts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            order: null
        };

    }

    componentDidMount() {
        OrderModel.Get(this.props.order_id, new XMLHttpRequest()).then(resp => {
            this.setState({ order: resp.order });
        }).catch(e => {
            console.log(e);
        });
    }

    render() {
        return (<div>
            {this.state.order && (
                <div>
                    {this.state.order.products.map((product, k) =>
                        <figure key={product.id} className="avatar avatar-lg badge" data-badge={product.count} data-initial="YZ">
                            <img src={rest_server+ product.main_img} alt="YZ" />
                        </figure>
                    )}
                </div>
            )}
        </div>)
    }
}


export default UserOrderProducts;
