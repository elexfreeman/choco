/*Модалка картинок*/
import React, {Component} from 'react';

class ProductImg extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: []
            ,showModal: false
        };
        this.getNextSlideNumber = this.getNextSlideNumber.bind(this);
        this.getPrevSlideNumber = this.getPrevSlideNumber.bind(this);
    }

    componentDidMount() {
        if (JSON.parse(this.props.img) != null) {
            this.setState({images: JSON.parse(this.props.img)});
        }

    }

    getNextSlideNumber(n){
        if(n===this.state.images.length){
            return 0
        } else {
            return n+1;
        }
    }

    getPrevSlideNumber(n){
        if(n===0){
            return this.state.images.length
        } else {
            return n-1;
        }
    }



    render() {
        return (
            <div id="product_img">
                <div className="columns">
                    <div className="column col-12">
                        <a className='cursor-pointer' onClick={(e)=>this.setState({showModal: !this.state.showModal})}>
                            <div className="parallax">
                                <div className="parallax-top-left" tabIndex="1"></div>
                                <div className="parallax-top-right" tabIndex="2"></div>
                                <div className="parallax-bottom-left" tabIndex="3"></div>
                                <div className="parallax-bottom-right" tabIndex="4"></div>
                                <div className="parallax-content">
                                    <div className="parallax-front">
                                    </div>
                                    <div className="parallax-back">
                                        <img src={this.props.main_img}
                                             className="img-responsive rounded"/>
                                    </div>
                                </div>
                            </div>

                        </a>
                    </div>
                    {this.state.images.map((item, key) =>
                        <div key={key} className="column col-4">
                            <img className="img-responsive"
                                 src={item}/>
                        </div>
                    )}
                </div>

                <div

                    className={this.state.showModal ? ("modal active modal-lg modal-product-img"):("modal modal-lg modal-product-img")}
                    id="product_modal">
                    <a className="modal-overlay" onClick={(e)=>this.setState({showModal: !this.state.showModal})} aria-label="Close"></a>
                    <div className="modal-container" role="document">
                        <div className="modal-header">
                            <a className="btn btn-clear float-right cursor-pointer"
                               onClick={(e)=>this.setState({showModal: !this.state.showModal})}
                               aria-label="Close"></a>
                            <div className="modal-title h5">{this.props.caption}</div>
                        </div>
                        <div className="modal-body">
                            <div className="content">
                                <img
                                    src={this.props.main_img}
                                    className="img-responsive rounded"/>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <a className="btn btn-link btn-lg cursor-pointer" onClick={(e)=>this.setState({showModal: !this.state.showModal})}>Закрыть</a>
                    </div>
                </div>
            </div>
        )
    }
}


export default ProductImg;
