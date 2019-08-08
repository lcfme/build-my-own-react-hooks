const path = require('path')
const resolve = path.resolve.bind(path, __dirname)
module.exports = {
  entry: resolve('__dev__'),
  output: {
    path: resolve('__dev__'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js/,
        loader: 'babel-loader',
      },
    ],
  },
}
