import React from 'react';

const BlogItem = ({caption, img, date}) => {

  return (<div className="column col-6 col-xs-12 col-sm-12 col-md-12 blog-item">
    <div className="columns">
      <div className="column col-6 col-xs-4">
        <a href="#">
          <img className='img-responsive' src={img}/>
        </a>
      </div>
      <div className="column col-6 col-xs-8">
        <a href="#">
          <div className='date'><i className="fa fa-clock-o" aria-hidden="true"></i> {date}</div>
          <div className='caption'>{caption}</div>
        </a>
      </div>
    </div>
  </div>)

}

export default BlogItem;
