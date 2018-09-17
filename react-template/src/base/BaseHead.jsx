import React, {Component} from 'react';

class BaseHead extends Component {
  render() {
    return (<div className='base-head'>
        {this.props.caption}
    </div>)
  }
}
export default BaseHead;
