'use strict';

const CleanWebpackPlugin   = require('clean-webpack-plugin');
const HtmlWebpackPlugin    = require('html-webpack-plugin');
const path = require('path');

const isDev                = process.env.NODE_ENV !== 'production';


const _root = path.resolve(__dirname, '.');

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);

  return path.join.apply(path, [_root].concat(args));
}

module.exports = {
  entry: {
    main: './assets/main.ts'
  },
  output: {
    path: root( 'source/javascripts'),
    filename: 'bundle.js',
  },

  resolve: {
    extensions: ['.ts', '.js', '.scss']
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          { loader: 'style-loader', options: { sourceMap: isDev } },
          { loader: 'css-loader', options: { sourceMap: isDev } },
          { loader: 'sass-loader', options: { sourceMap: isDev } }
        ],
        include: root('src', 'assets')
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          'to-string-loader',
          { loader: 'css-loader', options: { sourceMap: isDev } },
          { loader: 'sass-loader', options: { sourceMap: isDev } }
        ],
        include: root('src', 'app')
      },
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'babel-loader',
          },
        ],
        exclude: [/node_modules/]
      }
    ]
  },

  // plugins: [
  //   new CleanWebpackPlugin(
  //     helpers.root('dist'), { root: helpers.root(), verbose: true }),
  //
  //   new HtmlWebpackPlugin({
  //     template: 'src/index.html'
  //   })
  // ]
};