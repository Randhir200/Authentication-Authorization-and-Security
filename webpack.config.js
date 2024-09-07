const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './index.js', // your main file
  target: 'node', // for Node.js apps
  externals: [nodeExternals()], // ignore node_modules
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // output bundled file
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Optional, if you're using Babel
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
};
