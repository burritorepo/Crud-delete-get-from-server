/* const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: ["babel-loader", "eslint-loader"]
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: 'style-loader'
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader'
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('autoprefixer')
                ];
              }
            }
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          { loader: 'url-loader' }
        ]
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'Babel + Webpack, Loaders, Plugins + ESLint',
    template: 'index.html'
  })]
}; */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    home: path.resolve(__dirname,'./pruebas/home.js'),
    portfolio: path.resolve(__dirname,'./pruebas/portfolio.js')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname,'./pruebas/dist'),
  },
  devServer: {
    contentBase: path.resolve(__dirname, './pruebas/dist'),
    compress: true,
    port: 9000,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['home'],
      template: './pruebas/home.html',
      filename: 'home.html'
    }),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['portfolio'],
      filename: 'portfolio.html'
    })
  ]
}
