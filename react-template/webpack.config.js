const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');

module.exports = {
  context: __dirname + "/src",
  entry: {
    bundle: './index.jsx'
    ,product: './product.jsx'
    ,category: './category.jsx'
    ,catalog: './catalog.jsx'
    ,cart: './cart.jsx'
    ,manufacturer: './manufacturer.jsx'
    ,category_page: './category_page.jsx'
    ,login: './login.jsx'
    ,user: './user.jsx'
    //styles: './main.scss'
  },
  output: {
    path: __dirname + '/public',
    filename: '[name].js',
  },

  watchOptions: {
    aggregateTimeout: 100
  },

  resolve: {
    extensions: ['*', '.js', '.jsx']
  },

  devtool: '#cheap-module-source-map',

  module: {
    loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"]
      }
    ],
    rules: [{
        test: /\.js?$/,
        use: ['babel-loader', ],
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        use: ['babel-loader', ],
        exclude: /node_modules/
      },


    ]
  },

  plugins: [
    new ExtractTextPlugin({
      filename: 'styles.css',
      allChunks: true
       /*закментить при билде*/
      //,disable: true
    }),
      new webpack.optimize.CommonsChunkPlugin({
       name: "common"
     }),
    new webpack.ProvidePlugin({
     /* $: "jquery/dist/jquery.min.js",
      jQuery: "jquery/dist/jquery.min.js",
      "window.jQuery": "jquery/dist/jquery.min.js"*/
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true,
    contentBase: './public'
  }
};
