import HtmlWebpackPlugin from "html-webpack-plugin";
import { join, resolve } from "path";
import { Configuration, HotModuleReplacementPlugin } from "webpack";

export default {
  target: "web",
  module: {
    rules: [
      {
        test: /.*\.tsx?$/,
        use: "ts-loader"
      },
      {
        test: /.*\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  },
  output: {
    pathinfo: true,
    path: join(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].bundle.js",
    sourceMapFilename: "[name].bundle.map.js"
  },
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    index: resolve(__dirname, "src", "index.tsx"),
    simple: resolve(__dirname, "src", "simple-table.tsx"),
    first: resolve(__dirname, "src", "first-example.tsx"),
    second: resolve(__dirname, "src", "second-example.tsx"),
    third: resolve(__dirname, "src", "third-example.tsx"),
    fourth: resolve(__dirname, "src", "fourth-example.tsx"),
    fifth: resolve(__dirname, "src", "fifth-example.tsx")
  },
  devServer: {
    host: "localhost",
    port: 1337,
    hot: true,
    quiet: false,
    historyApiFallback: true,
    contentBase: resolve(__dirname, "src"),
    publicPath: "/",
    disableHostCheck: true
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "public", "index.template.ejs"),
      chunks: ["index"],
      filename: "index.html"
    }),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "public", "index.template.ejs"),
      chunks: ["simple"],
      filename: "simple-table.html"
    }),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "public", "index.template.ejs"),
      chunks: ["first"],
      filename: "first-example.html"
    }),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "public", "index.template.ejs"),
      chunks: ["second"],
      filename: "second-example.html"
    }),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "public", "index.template.ejs"),
      chunks: ["third"],
      filename: "third-example.html"
    }),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "public", "index.template.ejs"),
      chunks: ["fourth"],
      filename: "fourth-example.html"
    }),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "public", "index.template.ejs"),
      chunks: ["fifth"],
      filename: "fifth-example.html"
    })
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".css"]
  }
} as Configuration;
