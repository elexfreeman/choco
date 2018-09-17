import React from 'react';
import BlogItem from './BlogItem';

const BlogRows = ({}) => {

  return (<div className="columns blog-rows">

    <BlogItem caption={'О важности ухода за кожей в народной медицине'}
      img = {'http://static.livedemo00.template-help.com/magento_53918/media/wysiwyg/blog_img/small_1.jpg'} date={'02.02.2018'}/>

    <BlogItem caption={'О важности ухода за кожей в народной медицине'}
      img = {
        'http://static.livedemo00.template-help.com/magento_53918/media/wysiwyg/blog_img/small_1.jpg'
      } date={'02.02.2018'}/>

  </div>)
}

export default BlogRows;
