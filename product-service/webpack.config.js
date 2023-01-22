const serverlessWebpack = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: serverlessWebpack.lib.entries,
  target: 'node',
  // external modules will be included by "includeModules" in serverless.yml
  externals: [nodeExternals()],
  mode: serverlessWebpack.lib.webpack.isLocal ? 'development' : 'production',
  optimization: {
    minimize: false,
    concatenateModules: false,
  },
  performance: {
    hints: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: __dirname,
        exclude: /node_modules/,
      },
    ],
  },
};
