if (process.env.NODE_ENV == "development") require("dotenv").config()

const { NODE_ENV, APP_KEY } = process.env

const Webpack = require("webpack")
const Path = require("path")
const AssetsPlugin = require("assets-webpack-plugin")
const BUILD_DIR = "../dist-client"
const ExtractTextPlugin = require("extract-text-webpack-plugin")
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
//   .BundleAnalyzerPlugin

module.exports = {
  entry: {
    style: ["./src/style/index.sass"],
    app: ["./src/client/index.js"],
    vendor: [
      "react",
      "react-router",
      "react-router-dom",
      "react-router-config",
      "react-helmet",
      "redux",
      "react-redux",
      "superagent",
      "react-transition-group"
    ]
  },

  output: {
    path: Path.resolve(__dirname, BUILD_DIR),
    filename: NODE_ENV == "production" ? "[name].[hash].js" : "[name].js",
    chunkFilename: NODE_ENV == "production" ? "[name].[hash].js" : "[name].js",
    publicPath: "/build/"
  },

  plugins: [
    // new BundleAnalyzerPlugin(),
    new AssetsPlugin({
      prettyPrint: true,
      path: Path.join(__dirname, "../src/config")
    }),
    new Webpack.NoEmitOnErrorsPlugin(),
    new Webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: NODE_ENV == "production" ? "vendor.[hash].js" : "vendor.js",
      minChunks: Infinity
    }),
    new Webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(NODE_ENV || "development"),
        APP_KEY: JSON.stringify(APP_KEY || "kompetisiid")
      }
    }),
    new ExtractTextPlugin(
      NODE_ENV == "production" ? "[name].[hash].css" : "[name].css"
    )
  ],

  resolve: {
    extensions: [".js", ".jsx", ".css", ".sass"]
    // alias: {
    //   react: 'preact-compat',
    //   'react-dom': 'preact-compat'
    // }
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              babelrc: false,
              presets: ["es2015", "react"],
              plugins: [
                "transform-class-properties",
                "syntax-dynamic-import",
                [
                  "babel-plugin-styled-components",
                  {
                    pure: true
                  }
                ]
              ],
              env: {
                production: {
                  presets: []
                }
              }
            }
          }
        ]
      },
      {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader"
              // options: { minimize: NODE_ENV === "production" }
            },
            { loader: "sass-loader" }
          ]
        })
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          }
        ]
      }
    ]
  }
}
