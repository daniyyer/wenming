const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const ImageminPlugin = require("imagemin-webpack-plugin").default;
// const imageminMozjpeg = require("imagemin-mozjpeg");
const CopyPlugin = require("copy-webpack-plugin");
var HtmlReplaceWebpackPlugin = require("html-replace-webpack-plugin");
// var PrettierPlugin = require("prettier-webpack-plugin");
const exec = require("child_process").exec;
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const CssnanoPlugin = require("cssnano-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env, setHash) => {
  return {
    // output: {
    //   filename: "bundle.js"
    // },

    plugins: [
      // new ImageminPlugin({
      //      pngquant: {
      //         quality: '95-100'
      //     }
      // }),
      // new MiniCssExtractPlugin({
      //   // Options similar to the same options in webpackOptions.output
      //   // both options are optional
      //
      //   filename: "assets2/css/" + "[name].[hash:8].css",
      //   chunkFilename: "assets2/css/" + "[name].[contenthash:8].css",
      // }),
      // new ImageminPlugin({
      //   test: /\.(jpe?g|png|gif)$/i,
      //   pngquant: {
      //     quality: "95-100",
      //   },
      //   plugins: [
      //     imageminMozjpeg({
      //       quality: 85,
      //       progressive: true,
      //     }),
      //   ],
      // }),
      new CleanWebpackPlugin(),
      new CopyPlugin({
        patterns: [
          {
            from: "pagelist/*.json",
            to: "../dist/",
          },
          {
            from: "src/assets2/js/mobile-detection.js",
            to: "../dist/",
          },
        ],
      }),
      new HtmlReplaceWebpackPlugin([
        {
          pattern: "/assets2",
          replacement: "../assets2",
        },
        {
          pattern: "../..../assets2",
          replacement: "../assets2",
        },
      ]),
      // new PrettierPlugin({
      //   printWidth: 80,               // Specify the length of line that the printer will wrap on.
      //   tabWidth: 2,                  // Specify the number of spaces per indentation-level.
      //   useTabs: false,               // Indent lines with tabs instead of spaces.
      //   semi: true,                   // Print semicolons at the ends of statements.
      //   encoding: 'utf-8',            // Which encoding scheme to use on files
      //   extensions: [ ".html" ]  // Which file extensions to process
      // })
      new ScriptExtHtmlWebpackPlugin({
        inline: /inline/,
      }),
      {
        apply: (compiler) => {
          compiler.hooks.afterEmit.tap("AfterEmitPlugin", (compilation) => {
            exec('prettier  --write "dist/**/*.html"', (err, stdout, stderr) => {
              if (stdout) process.stdout.write(stdout);
              if (stderr) process.stderr.write(stderr);
            });
          });
        },
      },
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional

        filename: setHash ? "assets2/css/" + "[name].[hash:8].css" : "assets2/css/" + "[name].css",
        chunkFilename: setHash
          ? "assets2/css/" + "[name].[contenthash:8].css"
          : "assets2/css/" + "[name].css",
      }),
    ],
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
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
            MiniCssExtractPlugin.loader,
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
    optimization: {
      minimizer: [
        new CssnanoPlugin(),
        new TerserPlugin({
          // sourceMap: true, // Must be set to true if using source-maps in production
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
      ],
    },
  };
};
