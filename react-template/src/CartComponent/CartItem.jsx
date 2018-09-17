import React, {Component} from 'react';
import PriceFormatter from '../formatters/PriceFormater'

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {onChangeCount, onDelete, onGetCart } from '../redux/actions/cart';
import CartItemDeleteModal from "./CartItemDeleteModal";
import {rest_server} from "../models/settings";

class CartItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: this.props.item.count
            , modalDeleteVisible: ''
        };
        /*событие измениения ко-ва*/
        this.handlCountChange = this.handlCountChange.bind(this);
        /*событие на подтверждене удаления*/
        this.handlDelete = this.handlDelete.bind(this);
        /*событие удаления*/
        this.onDeleteProductItem = this.onDeleteProductItem.bind(this);
        /*событие отмены удаления*/
        this.onModalClose = this.onModalClose.bind(this);
    }


    handlCountChange(event) {
        event.preventDefault();

        let count = 0;

        if (event.target.value <= 0) {
            count = 1;
        } else {
            count = event.target.value;
        }
        this.setState({count: count});
        /*вызываем событие измениния в redux*/
        this.props.onChangeCount({
            productId: this.props.item.id
            , count: parseInt(count)
            ,cart: this.props.products
        });

        //this.props.onGetCart();
    }

    handlDelete() {
        // event.preventDefault();
        console.log('del');
        this.setState({modalDeleteVisible: 'active'});
    }

    onModalClose() {
        this.setState({modalDeleteVisible: ''})
    }

    onDeleteProductItem(){
        this.props.onDelete(this.props.item.id);
        this.setState({modalDeleteVisible: ''});
        this.props.onGetCart();
    }

    render() {
        return (<tr>

            <td>
                <img className='product-img' src={rest_server + this.props.item.main_img}/>
            </td>
            <td>{this.props.item.caption}</td>

            <td><PriceFormatter price={this.props.item.price} /></td>

            <td className='count'>
                <input type='number' value={this.state.count} onChange={this.handlCountChange} className="form-input"/>
            </td>

            <td><PriceFormatter price={this.props.item.price * this.state.count} /></td>

            <td>
                <button onClick={this.handlDelete} className="btn">
                    <i className="icon icon-delete"/>
                </button>
                <CartItemDeleteModal
                    item={this.props.item} onDelete={this.onDeleteProductItem}
                    onClose={this.onModalClose}
                    visible={this.state.modalDeleteVisible}/>
            </td>

        </tr>)
    }

};

/*props from redux*/
function mapStateToProps(state) {
    return {
        cart: state.cart
    }
}

/*actions from redux*/
function matchDispatchToProps(dispatch) {
    return bindActionCreators({onChangeCount: onChangeCount, onDelete: onDelete, onGetCart: onGetCart}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(CartItem);
