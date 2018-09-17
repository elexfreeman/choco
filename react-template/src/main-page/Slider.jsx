import React, {Component} from 'react';

class Slider extends Component {
  render() {
    return (<div className="carousel">
      <input type="radio" id="slide-1" name="carousel-radio" hidden="" className="carousel-locator" checked=""/>
      <input type="radio" id="slide-2" name="carousel-radio" hidden="" className="carousel-locator"/>
      <input type="radio" id="slide-3" name="carousel-radio" hidden="" className="carousel-locator"/>
      <input type="radio" id="slide-4" name="carousel-radio" hidden="" className="carousel-locator"/>
      <div className="carousel-container">
        <figure className="carousel-item">
          <label className="item-prev btn btn-action btn-lg" for="slide-4">
            <i className="icon icon-arrow-left"></i>
          </label>
          <label className="item-next btn btn-action btn-lg" for="slide-2">
            <i className="icon icon-arrow-right"></i>
          </label>
          <img src="https://picturepan2.github.io/spectre/img/osx-el-capitan-2.jpg" className="img-responsive rounded" alt="macOS Yosemite Wallpaper" />
        </figure>

          <figure className="carousel-item">
            <label className="item-prev btn btn-action btn-lg" for="slide-1">
              <i className="icon icon-arrow-left"></i>
            </label>
            <label className="item-next btn btn-action btn-lg" for="slide-3">
              <i className="icon icon-arrow-right"></i>
            </label>
            <img src="https://picturepan2.github.io/spectre/img/osx-el-capitan-2.jpg" className="img-responsive rounded" alt="macOS Yosemite Wallpaper" />
          </figure>

            <figure className="carousel-item">
              <label className="item-prev btn btn-action btn-lg" for="slide-2">
                <i className="icon icon-arrow-left"></i>
              </label>
              <label className="item-next btn btn-action btn-lg" for="slide-4">
                <i className="icon icon-arrow-right"></i>
              </label>
              <img src="https://picturepan2.github.io/spectre/img/osx-el-capitan-2.jpg" className="img-responsive rounded" alt="macOS Yosemite Wallpaper /" />
            </figure>

              <figure className="carousel-item">
                <label className="item-prev btn btn-action btn-lg" for="slide-3">
                  <i className="icon icon-arrow-left"></i>
                </label>
                <label className="item-next btn btn-action btn-lg" for="slide-1">
                  <i className="icon icon-arrow-right"></i>
                </label>
                <img src="https://picturepan2.github.io/spectre/img/osx-el-capitan-2.jpg" className="img-responsive rounded" alt="macOS Yosemite Wallpaper /" />
              </figure>
              </div>
              <div className="carousel-nav">
                <label className="nav-item text-hide c-hand" for="slide-1">1</label>
                <label className="nav-item text-hide c-hand" for="slide-2">2</label>
                <label className="nav-item text-hide c-hand" for="slide-3">3</label>
                <label className="nav-item text-hide c-hand" for="slide-4">4</label>
              </div>
            </div>
            )
  }
}
export default Slider;
