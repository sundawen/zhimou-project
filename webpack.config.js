const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ProxyConfig = {
  target: 'http://localhost:5555',
  changeOrigin: true,
  secure: false,
}

module.exports = {
  entry: {
    vendor: ['babel-polyfill',
      // path.resolve(__dirname, './src/fonts/iconfont/iconfont.js'),
    ],
    bundle: [path.resolve(__dirname, './src/main.jsx')],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    filename: '[name].[Hash:8].js',
    chunkFilename: '[name].[Hash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.(ico|png|jpg|jpeg|mp4|gif|mov)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
          },
        }],
      },
      { test: /\.(obj|glb|eot|woff|woff2|svg|ttf|otf)$/, use: 'file-loader' },
      {
        test: /\.js|jsx$/,
        exclude: [/node_module/, /third-party/, /\.json$/],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react', 'stage-0'],
            plugins: [['import', { libraryName: 'antd', style: 'css' }]],
          },
        }],
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'postcss-loader' }],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]_[local]__[hash:base64:5]',
            },
          },
          { loader: 'postcss-loader' },
          {
            loader: 'sass-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]_[local]__[hash:base64:5]',
            },
          },
        ],
      },
      { test: /\.html$/, use: 'html-loader' },
    ],
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
    proxy: {
      '/start': ProxyConfig,
      '/stream': ProxyConfig,
      '/HistoryError': ProxyConfig,
      '/HistoryErrorDetails': ProxyConfig,
      '/img': ProxyConfig,
    },
  },
}
