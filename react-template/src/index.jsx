import React from 'react';
import {render} from 'react-dom';

// redux

import MenuTop from './menu-top/MenuTop';

import CategoryPage from './category-page/CategoryPage';


render(<div>

  <MenuTop/>

  <CategoryPage/>

</div>, document.getElementById('root'));
