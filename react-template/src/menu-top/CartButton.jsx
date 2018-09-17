import React, {Component} from 'react';

class CartButton extends Component {
  render() {
    return (<span>
      <button className="btn-cart btn input-group-btn btn-lg badge" data-badge="8">
        <i className="fa fa-shopping-cart" aria-hidden="true"></i>
      </button>
    </span>)
  }
}
export default CartButton;
