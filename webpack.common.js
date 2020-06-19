const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    "static/js/background/background": "./src/background/background.js",
    "static/js/devtools": "./src/devtools/devtools.js",
    "static/js/sidebar": "./src/sidebar/sidebar.js",
    "static/js/content_script": "./src/content_script/content_script.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new CopyPlugin({ patterns: [{ from: "public/" }] }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new HtmlWebpackPlugin({
      hash: true,
      inject: false,
      template: "./src/devtools/devtools.html",
      filename: "./devtools.html",
    }),
    new HtmlWebpackPlugin({
      hash: true,
      inject: false,
      template: "./src/sidebar/sidebar.html",
      filename: "./sidebar.html",
    }),
  ],
};
