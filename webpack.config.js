const path = require("path");
const webpack = require("webpack");
const DeclarationBundlerPlugin = require('types-webpack-bundler');

module.exports = (...args) => ({
  entry: path.join(__dirname, "/src/useReactPdf.tsx"),
  mode: args[1].mode,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  output: {
    filename: args[1].mode === "production"
      ? "react-pdfjs-dist.min.js": "react-pdfjs-dist.js",
    path: path.join(__dirname, "/lib"),
    library: "ReactPdfjsDist",
    libraryTarget: "umd"
  },
  resolve: {
    extensions: [
      ".ts",
      ".tsx"
    ]
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: "react-pdfjs-dist.js.map",
    }),
    new DeclarationBundlerPlugin({
      moduleName: "'react-pdfjs-dist'",
      out: "react-pdfjs-dist.d.ts",
    }),
  ],
  externals: {
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react"
    }
  }
});