import React, {Component} from 'react';

// кнопка оформить заказ
class CartComplete extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        /*     this.onChangeB = this.onChangeB.bind(this);
             console.log(props);*/

    }


    render() {
        return (
            <div>
                {window.localStorage.getItem('cart') != null && (
                    <div className='cart-complete'>
                        <div className="container">
                            <div className="columns">
                                <div className="column col-8 col-sm-12">
                                    Нажимая кнопку Оформить заказ
                                    вы соглашаетесь с <a href='/agreement' target='_blank'>условиями
                                    соглашения</a>
                                </div>
                                <div className="column col-xs-4 text-right">
                                    <button disabled={!this.props.isRegistered} onClick={this.props.checkout} className="btn btn-success">Оформить заказ</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}


export default CartComplete;