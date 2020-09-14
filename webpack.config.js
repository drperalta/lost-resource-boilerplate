const { resolve } = require('path');

const Dotenv = require('dotenv-webpack');
const nodeExternals = require('webpack-node-externals');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const { DefinePlugin } = require('webpack');

const buildPath = resolve(__dirname, 'dist');

// SERVER
const server = {

  devServer: {
    contentBase: resolve(__dirname, 'dist'),
  },

  entry: {
    server: resolve(__dirname, 'src/server/main.js'),
  },

  output: {
    path: resolve(buildPath, 'server'),
  },

  resolve: {
    alias: {
      lost: resolve(__dirname, 'TLCFramework'),
      '@server': resolve(__dirname, 'src/server'),
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-transform-runtime',
            ],
          },
        },
      },
    ],
  },

  plugins: [
    new DefinePlugin({
      'global.GENTLY': false,
    }),
    new Dotenv(),
    new CleanWebpackPlugin(),
  ],

  optimization: {
    minimize: true,
  },

  target: 'node',

  externals: [nodeExternals()],

};

// CLIENT
const client = {

  devServer: {
    contentBase: resolve(__dirname, 'dist'),
  },

  entry: {
    client: resolve(__dirname, 'src/client/main.js'),
  },

  output: {
    path: resolve(buildPath, 'client'),
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-transform-runtime',
            ],
          },
        },
      },
    ],
  },

  resolve: {
    alias: {
      lost: resolve(__dirname, 'TLCFramework'),
      '@client': resolve(__dirname, 'src/client'),
    },
  },

  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin(),
  ],

  optimization: {
    minimize: true,
  },
};

module.exports = [client, server];
