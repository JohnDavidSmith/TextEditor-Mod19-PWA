
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
     // Add and configure workbox plugins for a service worker and manifest file.
     new InjectManifest({
      swSrc: './src-sw.js',
      swDest: 'src-sw.js',
    }),
    new WebpackPwaManifest({
      // filename: 'manifest.json',
      inject: true,
      fingerprints: false,
      name: 'Your App Name',
      short_name: 'App Name',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      start_url: '/',
      display: 'standalone',
      publicPath: './',

      icons: [
        {
          src: path.resolve('src/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          purpose: 'any maskable',
          destination: path.join('assets', 'icons'),
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunks: ['main'],
    }), 
    ],

    module: {
      rules: [
        // Add CSS loaders and babel to webpack.
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        }, 
      ],
    },
  };
};

