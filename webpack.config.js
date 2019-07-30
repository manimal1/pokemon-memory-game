const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.wav'],
    alias: {
      actions: path.resolve(__dirname, 'src/actions/'),
      appConstants: path.resolve(__dirname, 'src/appConstants/'),
      components: path.resolve(__dirname, 'src/components/'),
      containers: path.resolve(__dirname, 'src/containers/'),
      reducers: path.resolve(__dirname, 'src/reducers/'),
      utils: path.resolve(__dirname, 'src/utils/'),
      content: path.resolve(__dirname, 'content/audio')
    }
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    })
  ]
}
