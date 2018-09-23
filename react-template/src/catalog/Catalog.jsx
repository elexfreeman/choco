import React, {Component} from 'react';
import {connect} from 'react-redux';

import {bindActionCreators} from "redux";
import {ProductsModel} from "../models/products_model";
import ProductOrderCategory from "../cart/ProductOrderCategory";
import {pricePipe} from "../base/pipes/price_pipe";
import {rest_server} from "../models/settings";

const products_limit = 12;

// кнопка корзины в главном меню
class Catalog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: []
            , limit: products_limit
            , offset: 0
            , total: false
        };

        this.load = this.load.bind(this);
    }

    load() {
        ProductsModel.Get(this.state.offset, this.state.limit, new XMLHttpRequest()).then(resp => {
            let total = true;

            if (resp.products.length < products_limit) {
                total = false;
            }
            this.setState({
                products: this.state.products.concat(resp.products)
                , total: total
                , offset: this.state.offset + products_limit
            })
        });
    }

    componentDidMount() {
        this.load();
    }

    render() {
        return (<div className="columns products">
            {this.state.products.map((item, key) =>

                <div key={item.id} className="column col-sm-6 col-4">
                    <div className="product">
                        <a href={'/' + item.url}>
                            <img className="img-responsive"
                                 src={rest_server + 'img/w512/' + item.main_img.split('/')[item.main_img.split('/').length - 1]}/>
                        </a>

                        <div className="product-wraper">

                            <div className="price">{pricePipe(item.price)} руб.</div>
                            <div className="caption">{item.caption}</div>

                            <div className="description text-right">
                                <div><b>Масса:</b> {item.massa} гр.</div>
                                <div><b>Какао:</b> {item.cacao_percent} %</div>
                                {item.filling && (
                                    <div><b>Наполнитель:</b> {item.filling}</div>
                                )}
                            </div>
                        </div>

                        <div className="button-container product_order_category" product_id="1">
                            <ProductOrderCategory productId={item.id}/>
                        </div>
                    </div>
                </div>
            )}

            <div className="column col-12 text-center cursor-pointer">
                {this.state.total && (
                    <div onClick={this.load} className={'show-more'}>
                        Показать еще 10
                    </div>
                )}
            </div>

        </div>)
    }
}


/*props from redux*/
function mapStateToProps(state) {
    return {
        cart: state.cart
    }
}

/*actions from redux*/
function matchDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Catalog);
