const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.FRONTEND_PORT || 3000;

module.exports = () => {
  const plugins = [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      favicon: 'public/img/favicon.ico',
    }),
    // We are only using Webpack for local development, so we need to inject the
    // environment variables since we aren't using Serverless framework to do it
    new webpack.DefinePlugin({
      'process.env': {
        REACT_APP_API_URL: JSON.stringify(process.env.REACT_APP_API_URL),
        REACT_APP_TOKEN_SECRET: JSON.stringify(
          process.env.REACT_APP_TOKEN_SECRET
        ),
      },
    }),
  ];

  const rules = [
    // transpile vanilla js
    {
      test: /\.(js)$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    },
    // create source maps
    {
      test: /\.css$/,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
          options: {
            modules: true,
            sourceMap: true,
          },
        },
      ],
    },
  ];

  return {
    mode: process.env.NODE_ENV,
    module: { rules },
    plugins,
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      publicPath: '/',
      filename: '[name].js',
    },
    devtool: 'inline-source-map',
    devServer: {
      host: 'localhost',
      port: port,
      historyApiFallback: true,
      open: true,
    },
  };
};
