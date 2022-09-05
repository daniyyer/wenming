const webpack = require("webpack");
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const template = require("lodash.template");
const defaults = require("lodash.defaults");
const postcssPresetEnv = require("postcss-preset-env");
const htmlPluginArray = [];
const path = require("path");
const webpackMerge = require("webpack-merge");
const CopyPlugin = require("copy-webpack-plugin");
// const ImageminPlugin = require("imagemin-webpack-plugin").default;
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");

const modeConfig = (env, setHash) => require(`./build-utils/webpack.${env}.js`)(env, setHash);
const fs = require("fs");
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackInjector = require("html-webpack-injector");

const chokidar = require("chokidar");

// One-liner for current directory
const log = console.log.bind(console);
chokidar.watch("testadd2").on("ready", () => log("Initial scan complete. Ready for changes"));

function getEntry(mode) {
  const entry = {};

  // entry.inline = ["./src/assets2/js/index.js"];
  //读取src目录所有page入口
  entry.main = [
    "core-js/modules/es.promise",
    "core-js/modules/es.array.iterator",
    "./src/assets2/js/index.js",
  ];
  // entry.index_head= "./src/assets2/js/index_head.js";
  // entry.jquery_head="./src/assets2/js/jquery.js"
  // if (mode === "development") {
  //   entry.main.push("./src/assets2/js/dev.js");
  // }
  // glob.sync("./src/pages/*/index.js").forEach(function (filePath) {
  //   let name = filePath.match(/\/pages\/(.+)\/index.js/);
  //   name = name[1];
  //   entry[name] = [filePath];
  //   htmlPluginArray.push(
  //     new HtmlWebpackPlugin({
  //       filename: "./common/" + name + ".html",
  //       template: "./src/pages/" + name + "/index.ejs",
  //       chunks: ["manifest", "commons", name, "main"],
  //       minify: {
  //         // collapseWhitespace: true,
  //         removeComments: true,
  //         removeRedundantAttributes: true,
  //         removeScriptTypeAttributes: true,
  //         removeStyleLinkTypeAttributes: true,
  //         useShortDoctype: true,
  //       },
  //     }),
  //   );
  // });

  glob.sync("./src/layouts/*/layout.ejs").forEach(function (filePath) {
    let name = filePath.match(/\/layouts\/(.+)\/layout.ejs/);
    let indexJs = path.resolve(path.dirname(filePath), "index.js");
    if (fs.existsSync(indexJs)) {
      name = name[1];
      entry[name] = indexJs;
    }
  });
  // console.log(glob.sync("./src/layouts/*/pages/*/index.ejs"));
  glob.sync("./src/layouts/*/pages/*/index.ejs").forEach(function (filePath) {
    let layoutArr = filePath.match(/layouts\/(.+)\/pages\/(.+)\/index.ejs/);
    // console.log(layout);
    let layout = layoutArr[1];
    let name = layoutArr[2];
    let indexJs = path.resolve(path.dirname(filePath), "index.js");
    let chunks = [];
    if (fs.existsSync(indexJs)) {
      entry[layout + "-" + name] = indexJs;
      chunks = [layout + "-" + name, "main", layout];
    } else {
      chunks = ["main", layout];
    }
    // chunks.push('jquery_head','index_head');
    // chunks.push('jquery_head');

    let options = {
      filename: layout + "/" + name + ".html",
      template: "./src/layouts/" + layout + "/pages/" + name + "/index.ejs",
      chunks: chunks,
      minify: {
        // collapseWhitespace: true,
        // conservativeCollapse:true,
        // preserveLineBreaks:true,
        // removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    };
    try {
      //添加inline的script
      let inlinePath = path.resolve(path.dirname(filePath), "inline.js");
      if (fs.existsSync(inlinePath)) {
        entry[name + "-inline"] = inlinePath;
        options.chunks.push(name + "-inline");
      }
    } catch (err) {
      console.error(err);
    }

    htmlPluginArray.push(new HtmlWebpackPlugin(options));
  });
  // if(mode==='development'){
  //   console.log(entry)
  //   for(key in entry){
  //     console.log(key)
  //     entry[key].push('webpack-hot-middleware/client')
  //   }
  // }
  return entry;
}
const commonOptions = {
  chunks: "all",
  reuseExistingChunk: true,
};
module.exports = (
  { mode, presets, isHash } = { mode: "production", presets: [], isHash: true },
) => {
  let setHash = isHash === "false" ? false : true;
  return webpackMerge(
    // {
    //     entry: {
    //
    //         index_head: "./src/assets2/js/index_head.js"
    //     },
    //     output: {
    //         libraryTarget: 'var',
    //         library: 'publicUtil',
    //         filename: "assets2/js/"+"index_head.[contenthash:8].js",
    //         publicPath: "/",
    //     }
    // },
    {
      mode: mode,
      // 多入口
      entry: getEntry(mode),
      output: {
        filename: setHash
          ? "assets2/js/" + "[name].[contenthash:8].js"
          : "assets2/js/" + "[name].js",
        // chunkFilename: "assets2/js/" + "[name]_[contenthash:8].min.js",
        publicPath: "/",
      },
      externals: {
        jquery: "jQuery",
      },
      plugins: [
        ...htmlPluginArray,
        // new CopyPlugin({
        //     patterns: [
        //         { from: path.resolve(__dirname,'src/assets2/plugins'), to: path.resolve(__dirname,'dist/assets2/plugins') },
        //      ],
        //     options: {
        //         concurrency: 100,
        //     },
        // }),
        // new HtmlWebpackInjector(), // Initialize plugin

        new webpack.DefinePlugin({
          "process.env.MODE": JSON.stringify(mode),
        }),
        // new SpriteLoaderPlugin()
        //   new webpack.ProvidePlugin({
        //       $: 'jquery',
        //       jQuery: 'jquery'
        //   })

        new CopyWebpackPlugin({
          patterns: [
            {
              from: "./src/assets2/plugins/ueditor-utf8-net",
              to: "assets2/plugins/ueditor-utf8-net",
            },
            {
              from: "./src/assets2/js/plugins/jquery-qqface/gif",
              to: "assets2/images/qqFace-gif",
            },

          ],
        }),
      ],
      module: {
        rules: [
          {
            test: /\.html$/i,
            loader: "html-loader",
            options: {
              attributes: {
                list: [
                  {
                    tag: "use",
                    attribute: "xlink:href",
                    type: "src",
                  },
                ],
              },
            },
          },

          {
            test: /\.ejs$/,
            use: "ejs-loader",
          },
          // html中 引入assets2/plugins第三方插件，js中无法用babel转换array.includes的实例方法

          {
            test: /\.js$/,
            include: [path.resolve(__dirname, "src/assets2/plugins/")],
            use: [
              {
                loader: "file-loader",
                options: {
                  name: setHash
                    ? "assets2/plugins/[folder]/[name].[hash].[ext]"
                    : "assets2/plugins/[folder]/[name].[ext]",
                  publicPath: "/",
                  esModule: false,
                },
              },
              // {
              //   loader: "babel-loader",
              //   options: {
              //     presets: [["@babel/preset-env"]],
              //   },
              // },
            ],
          },
          {
            test: /\.css$/,
            include: [path.resolve(__dirname, "src/assets2/plugins/")],
            use: [
              {
                loader: "file-loader",
                options: {
                  name: setHash
                    ? "assets2/plugins/[folder]/[name].[hash].[ext]"
                    : "assets2/plugins/[folder]/[name].[ext]",
                  publicPath: "/",
                  esModule: false,
                },
              },

              "extract-loader",
              "css-loader",
              // {
              //   loader: "postcss-loader",
              //   options: {
              //     ident: "postcss",
              //     plugins: [
              //       require("postcss-preset-env")(),
              //       // require('cssnano')()
              //     ],
              //   },
              // },
            ],
          },
          {
            enforce: "pre",
            test: /\.js$/,
            exclude: [
              path.resolve(__dirname, "src/assets2/plugins"),
              path.resolve(__dirname, "src/assets2/js/plugins"),
              /(node_modules|bower_components)/,
            ],
            loader: "eslint-loader",
            options: {
              // cache: true,
              fix: true,
            },
          },
          {
            test: /\.m?js$/,
            exclude: [
              path.resolve(__dirname, "src/assets2/plugins"),
              path.resolve(__dirname, "src/assets2/js/plugins"),
              /(node_modules|bower_components)/,
            ],

            use: [
              {
                loader: "babel-loader",
                options: {
                  // sourceType: "unambiguous",

                  presets: [
                    [
                      "@babel/preset-env",
                      {
                        modules: false,
                      },
                    ],
                  ],
                  plugins: [
                    [
                      "@babel/plugin-transform-runtime",
                      {
                        corejs: {
                          version: 3,
                          proposals: true,
                        },
                        useESModules: true,
                      },
                    ],
                    ["@babel/plugin-syntax-dynamic-import"],
                  ],
                },
              },
            ],
          },

          {
            test: /\.(png|svg|jpg|gif)$/,
            exclude: path.resolve(__dirname, "src/assets2/images/svgicon"), // 不带icon 玩
            use: [
              {
                loader: "url-loader",
                options: {
                  limit: 8192,
                  name: setHash
                    ? "assets2/images/[folder]/[name].[contenthash:8].[ext]"
                    : "assets2/images/[folder]/[name].[ext]",
                  publicPath: "../../",
                  esModule: false,
                },
              },
            ],
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            include: [path.resolve(__dirname, "src/assets2/plugins/element-ui/fonts")],
            use: [
              {
                loader: "url-loader",
                options: {
                  limit: false,
                  name: setHash
                    ? "assets2/fonts/[name].[contenthash:8].[ext]"
                    : "assets2/fonts/[name].[ext]",
                  publicPath: "../../../",
                  esModule: false,
                },
              },
            ],
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            exclude: [path.resolve(__dirname, "src/assets2/plugins/element-ui/fonts")],

            use: [
              {
                loader: "url-loader",
                options: {
                  limit: false,
                  name: setHash
                    ? "assets2/fonts/[name].[contenthash:8].[ext]"
                    : "assets2/fonts/[name].[ext]",
                  publicPath: "../../",
                  esModule: false,
                },
              },
            ],
          },
          // {
          //   test: /\.svg$/,
          //   loader: 'svg-sprite-loader',
          //   include: path.resolve(__dirname, 'src/assets2/images/svgicon'), // 只带自己人玩
          //   options: {
          //     extract: true,
          //     spriteFilename: 'assets2/images/'+'sprite-[hash:6].svg',
          //     outputPath:'../' ,
          //     // publicPath: '../'
          //   }
          // },
          // {
          //   test: require.resolve("jquery"),
          //   use: [
          //     {
          //       loader: "expose-loader",
          //       options: "jQuery",
          //     },
          //     {
          //       loader: "expose-loader",
          //       options: "$",
          //     },
          //   ],
          // },
        ],
      },

      optimization: {
        runtimeChunk: {
          name: "manifest",
        },
        splitChunks: {
          maxInitialRequests: 5,
          cacheGroups: {
            polyfill: {
              test: /[\\/]node_modules[\\/](core-js|raf|@babel|babel)[\\/]/,
              name: "polyfill",
              priority: 2,
              ...commonOptions,
            },
            dll: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              name: "dll",
              priority: 1,
              ...commonOptions,
            },
            commonsUse: {
              name: "commonsUse",
              minChunks: 2, // 至少被1/3页面的引入才打入common包
              ...commonOptions,
            },
          },
        },
        // minimizer: [
        //   new UglifyJsPlugin({
        //     chunkFilter: (chunk) => {
        //       // Exclude uglification for the `vendor` chunk
        //       if (chunk.name.includes('inline')) {
        //         return false;
        //       }
        //
        //       return true;
        //     },
        //   }),
        // ],
      },
      resolve: {
        /**
         * alias: 别名的配置
         *
         * extensions: 自动解析确定的扩展,
         *    比如 import 'xxx/theme.css' 可以在extensions 中添加 '.css'， 引入方式则为 import 'xxx/theme'
         *    @default ['.wasm', '.mjs', '.js', '.json']
         *
         * modules 告诉 webpack 解析模块时应该搜索的目录
         *   如果你想要添加一个目录到模块搜索目录，此目录优先于 node_modules/ 搜索
         *   这样配置在某种程度上可以简化模块的查找，提升构建速度 @default node_modules 优先
         */
        alias: {
          "@": path.resolve(__dirname, "src"),
          // tool$: path.resolve(__dirname, 'src/utils/tool.js') // 给定对象的键后的末尾添加 $，以表示精准匹配
          images: path.resolve(__dirname, "src/assets2/images"),
          api: path.resolve(__dirname, "src/assets2/api"),
          js: path.resolve(__dirname, "src/assets2/js"),
          css: path.resolve(__dirname, "src/assets2/css"),
          components: path.resolve(__dirname, "src/components"),
          layouts: path.resolve(__dirname, "src/layouts"),
          assets2: path.resolve(__dirname, "src/assets2"),
          "load-image": "blueimp-load-image/js/load-image.js",
          "load-image-meta": "blueimp-load-image/js/load-image-meta.js",
          "load-image-scale": "blueimp-load-image/js/load-image-scale.js",
          "load-image-orientation": "blueimp-load-image/js/load-image-orientation.js",
          "load-image-exif": "blueimp-load-image/js/load-image-exif.js",
          "canvas-to-blob": "blueimp-canvas-to-blob/js/canvas-to-blob.js",
          "jquery-ui/widget": "blueimp-file-upload/js/vendor/jquery.ui.widget.js",
        },
        // extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx'],
        // modules: [path.resolve(__dirname, 'src'), 'node_modules']
      },
    },

    modeConfig(mode, setHash),
  );
};
