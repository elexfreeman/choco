import React, {Component} from 'react';
require('imports-loader?window.jQuery=jquery!../jquery/jquery.elevatezoom.min.js');

class ProductControler extends Component {
  constructor(props) {
    super(props);
    // берем картинку из рута
    let product_img = document.getElementById('product_img');
    console.log(product_img.getAttribute('img'))
    this.state = {
      img: product_img.getAttribute('img')
    };
  }

  // после рендеринго
  componentDidMount() {
    // проверяем ширину
    if (document.documentElement.clientWidth >= 768) {
      //если это десктоп
      $('#zoom_01').elevateZoom({
        tint: true,
        tintOpacity: 0.5
      });
    }
  }

  render() {
    return ( <div>
      <img className="img-responsive" id="zoom_01"   data-zoom-image={this.state.img} src={this.state.img} />

      </div>)
    }
  }

  export default ProductControler;
