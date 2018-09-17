import React, {Component} from 'react';

class SpecialProduct extends Component {
  render() {
    return (<div className='special-product'>
      <div className="columns">
        <div className="column col-5">
          <img className='img-responsive' src='http://rouse.one/images/uploadimg/NggyDkAkrem_dlya_lica_ayva.jpg'/>
        </div>
        <div className="column col-7">
          <div className='price-wrap'>
            <div className='old-price'>{this.props.oldPrice} руб.</div>
            <div className='new-price'>{this.props.newPrice} руб.</div>
          </div>
          <div className='caption'>{this.props.caption}</div>
          <div className='description'>{this.props.description}</div>
        </div>
      </div>

    </div>)
  }
}
export default SpecialProduct;
