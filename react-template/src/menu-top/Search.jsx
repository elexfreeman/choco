import React, {Component} from 'react';

class SearchTop extends Component {
  render() {
    return (
      <div className="input-group search">
        <input type="text" className="form-input input-lg" placeholder="Ваш поиск начинается здесь..." />
          <button className="btn btn-primary input-group-btn btn-lg"><i className="icon icon-search"></i></button>
      </div>
    )
  }
}
export default SearchTop;
