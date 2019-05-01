const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: __dirname+'/src/main.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.jsx'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: [/node_module/],
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
      {
        test: /\.(ico|png|jpg|jpeg|mp4|gif|mov)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
          },
        }],
      },
      {
        test: /\.js|jsx$/,
        exclude: [/node_module/, /third-party/, /\.json$/],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react', 'stage-0'],
          },
        }],
      },

    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: './favicon.ico',
      filename: './index.html',
      template: './index.html',
      inject: true,
      hash: false,
    }),
  ],
  devServer: {
    port: 3000,
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    https: false,
    hot: true,
    inline: true,
    compress: false,
    open: true,
  },
}
