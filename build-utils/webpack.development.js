const webpack = require("webpack");
const path = require("path");
const apiMocker = require("mocker-api");
module.exports = () => ({
  devServer: {
    openPage: "common/homepage.html",
    open: true,
    // hot: true,
      host: '192.168.50.38',
    port: 9001,
    watchOptions: {
      aggregateTimeout: 2000,
    },
    before(app) {
      apiMocker(app, path.resolve("./mocker/index.js"), {
        // proxy: {
        //   '/repos/(.*)': 'https://api.github.com/',
        // },
        // changeHost: true,
      });
    },
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      // {
      //     test: /\.js$/,
      //     include: [
      //         path.resolve(__dirname, '../src/assets2/js/plugins/'),
      //
      //     ],
      //     use: [
      //         {
      //             loader: 'file-loader',
      //             options: {
      //                 name: 'assets2/js/plugins/[folder]/[name].[hash].[ext]',
      //                 publicPath: '../',
      //                 esModule: false,
      //             },
      //         },
      //
      //     ]
      // },

      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          // Translates CSS into CommonJS

          "css-loader",
          // Compiles Sass to CSS
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [
                require("postcss-preset-env")(),
                // require('cssnano')()
              ],
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.css$/i,
        exclude: [path.resolve(__dirname, "../src/assets2/plugins/")],
        use: [
          "style-loader",
          // Translates CSS into CommonJS

          "css-loader",
          // Compiles Sass to CSS
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [
                require("postcss-preset-env")(),
                // require('cssnano')()
              ],
            },
          },
        ],
      },
    ],
  },
  devtool: "eval-cheap-module-source-map",
  // devtool: "source-map",
});
