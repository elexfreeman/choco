import React, {Component} from 'react';
import {connect} from 'react-redux';


// кнопка корзины в главном меню
class DeliveryComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: localStorage.getItem('delivery_address')
        };

        this.onChangeAddress = this.onChangeAddress.bind(this);
    }

    componentDidMount() {
        document.getElementById('delivery_address').value = this.state.address;
    }

    onChangeAddress(e){
        this.setState({address: e.target.value});
        localStorage.setItem('delivery_address',e.target.value);
        this.props.onChange(e.target.value);
    }




    render() {

        return (<div className='delivery'>
          <h4>Доставка</h4>
            <div className="form-group">
                <label className="form-label" >Адрес доставки</label>
                <input onChange={this.onChangeAddress}
                       placeholder='индекс, город, улица, дом'
                       id='delivery_address' className="form-input" type="text"  />
            </div>
            <div className='delivery_description'>
                Доставка осуществляется "Почтой России".
            </div>

        </div>)
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart
    }
}

export default connect(mapStateToProps, dispatch => ({}))(DeliveryComponent);
