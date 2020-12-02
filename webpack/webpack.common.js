const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const srcDir = '../src/'

module.exports = {
  entry: {
    popup: path.join(__dirname, srcDir + 'popup.ts'),
    options: path.join(__dirname, srcDir + 'options.ts'),
    background: path.join(__dirname, srcDir + 'background.ts'),
    content_script: path.join(__dirname, srcDir + 'content_script.ts'),
    index: path.join(__dirname, srcDir + 'style/index.scss')
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'js/[name].js'
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'initial'
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['ts', 'tsx']
    }),
    new CopyPlugin({
      patterns: [{ from: '.', to: path.join(__dirname, '../dist'), context: 'public' }],
      options: {}
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css"
    })
  ]
}
